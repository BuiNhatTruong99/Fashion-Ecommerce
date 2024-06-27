package com.fashion.server.services;

import com.fashion.server.dtos.*;
import com.fashion.server.exception.TokenExpiredException;
import com.fashion.server.models.Cart;
import com.fashion.server.models.Role;
import com.fashion.server.models.VerificationUser;
import com.fashion.server.repositories.CartRepository;
import com.fashion.server.repositories.VerificationUserRepository;
import com.fashion.server.utils.GenderUtil;
import com.fashion.server.utils.email.EmailService;
import com.fashion.server.exception.DuplicateResourceException;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.models.User;
import com.fashion.server.repositories.UserRepository;
import com.fashion.server.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final GenderUtil genderUtil;
    private final VerificationUserRepository verificationUserRepository;
    private final PasswordEncoder passwordEncoder;

    private final CartRepository cartRepository;

    @Override
    public SignInResponse login(UserLoginDTO userLoginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginDTO.getEmail(),
                        userLoginDTO.getPassword()
                )
        );

        var user = userRepository.findByEmail(userLoginDTO.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        var accessToken = jwtService.generateToken(user);
        return SignInResponse.builder()
                .userInfo(
                        UserResponseDTO.builder()
                                .userId(user.getId())
                                .fullName(user.getFullName())
                                .email(user.getEmail())
                                .phone(user.getPhone())
                                .build()
                )
                .accessToken(accessToken)
                .build();
    }


    @Override
    @Transactional
    public void register(EmailRequest emailRequest) {
        Optional<User> userOptional = userRepository.findByEmail(emailRequest.getEmail());
        if (userOptional.isPresent()) {
            throw new DuplicateResourceException("Email already exists");
        }

        String otp = genderUtil.generateOtp();
        emailService.sendOtp(emailRequest.getEmail(), otp);
        verificationUserRepository.save(
                VerificationUser
                        .builder()
                        .email(emailRequest.getEmail())
                        .otp(otp)
                        .build()
        );
    }


    @Override
    @Transactional
    public SignInResponse verificationEmail(UserRegisterDTO userRegisterDTO) {
        Optional<List<VerificationUser>> verificationUserOptional = verificationUserRepository
                .findByEmail(
                        userRegisterDTO.getEmail()
                );

        if (verificationUserOptional.isEmpty()) {
            throw new ResourceNotFoundException("Invalid email");
        }

        VerificationUser verificationUser = verificationUserOptional.get().get(0);
        if (!verificationUser.getOtp().equals(userRegisterDTO.getOtp())) {
            throw new ResourceNotFoundException("Invalid otp");
        }

        LocalDateTime now = LocalDateTime.now();
        if (Duration.between(verificationUser.getUpdatedAt(), now).toMinutes() > 15) {
            throw new ResourceNotFoundException("Otp expired");
        }
        User newUser = User.builder()
                .email(userRegisterDTO.getEmail())
                .password(passwordEncoder.encode(userRegisterDTO.getPassword()))
                .fullName(userRegisterDTO.getFullName())
                .phone(null)
                .role(Role.USER)
                .build();
        User user = userRepository.save(newUser);
        Cart cart = Cart.builder()
                .user(user)
                .build();
        cartRepository.save(cart);
        verificationUserRepository.deleteAllByEmail(userRegisterDTO.getEmail());
        var accessToken = jwtService.generateToken(user);
        return SignInResponse.builder()
                .userInfo(
                        UserResponseDTO.builder()
                                .userId(user.getId())
                                .fullName(user.getFullName())
                                .email(user.getEmail())
                                .phone(user.getPhone())
                                .build()
                )
                .accessToken(accessToken)
                .build();
    }

    @Override
    public void resetPassword(EmailRequest emailRequest) {
        Optional<User> userOptional = userRepository.findByEmail(emailRequest.getEmail());
        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("Email not found");
        }

        String token = jwtService.generateToken(userOptional.get());
        emailService.sendResetPasswordLink(emailRequest.getEmail(), token);
    }

    @Override
    public void changePassword(ChangePasswordRequestDTO changePasswordRequest) {
        try {
            String userEmail = jwtService.extractUsername(changePasswordRequest.getToken());

            User user = userRepository
                    .findByEmail(userEmail)
                    .orElseThrow(() -> new ResourceNotFoundException("Email not found"));

            if (jwtService.isTokenValid(changePasswordRequest.getToken(), user)) {
                user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
                userRepository.save(user);
            }
        } catch (Exception e) {
            throw new TokenExpiredException("Invalid token");
        }
    }
}
