package com.fashion.server.services;

import com.fashion.server.dtos.AuthenticationResponse;
import com.fashion.server.dtos.UserLoginDTO;
import com.fashion.server.dtos.UserRegisterDTO;
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

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public AuthenticationResponse register(UserRegisterDTO userRegisterDTO) {
        User newUser = User.builder()
                .firstName(userRegisterDTO.getFirstName())
                .lastName(userRegisterDTO.getLastName())
                .email(userRegisterDTO.getEmail())
                .phone(null)
                .password(passwordEncoder.encode(userRegisterDTO.getPassword()))
                .role(userRegisterDTO.getRole())
                .build();

        userRepository.save(newUser);
        var accessToken = jwtService.generateToken(newUser);

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .build();
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
