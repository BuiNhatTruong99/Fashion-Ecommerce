package com.fashion.server.services;

import com.fashion.server.dtos.AuthenticationResponse;
import com.fashion.server.dtos.EmailRequest;
import com.fashion.server.dtos.UserLoginDTO;
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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;
    private final GenderUtil genderUtil;

    @Override
    @Transactional
    public String register(EmailRequest emailRequest) {
        Optional<User> userOptional = userRepository.findByEmail(emailRequest.getEmail());
        if (userOptional.isPresent()) {
            throw new DuplicateResourceException("email already exists");
        }

        String otp = genderUtil.generateOtp();
        emailService.sendOtp(emailRequest.getEmail(), otp);
        return otp;
    }

    @Override
    public AuthenticationResponse login(UserLoginDTO userLoginDTO) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        userLoginDTO.getEmail(),
                        userLoginDTO.getPassword()
                )
        );

        var user = userRepository.findByEmail(userLoginDTO.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("user not found"));
        var accessToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .build();
    }

}
