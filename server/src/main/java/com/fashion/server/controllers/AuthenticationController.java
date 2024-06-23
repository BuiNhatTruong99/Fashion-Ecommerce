package com.fashion.server.controllers;

import com.fashion.server.dtos.AuthenticationResponse;
import com.fashion.server.dtos.EmailRequest;
import com.fashion.server.dtos.UserLoginDTO;
import com.fashion.server.dtos.UserRegisterDTO;
import com.fashion.server.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/authentication")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> register(
            @Valid
            @RequestBody EmailRequest email,
            BindingResult result
    ) {

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        String response = userService.register(email);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> login(
            @Valid
            @RequestBody UserLoginDTO userLoginDTO,
            BindingResult result) {

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        AuthenticationResponse response = userService.login(userLoginDTO);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
