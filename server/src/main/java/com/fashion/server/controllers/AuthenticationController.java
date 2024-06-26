package com.fashion.server.controllers;

import com.fashion.server.dtos.*;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.exception.TokenExpiredException;
import com.fashion.server.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

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
        userService.register(email);
        return new ResponseEntity<>("Otp sent", HttpStatus.CREATED);
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
        SignInResponse response = userService.login(userLoginDTO);
        ApiDataResponse apiDataResponse = ApiDataResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(response)
                .message("Login successful")
                .build();
        return new ResponseEntity<>(apiDataResponse, HttpStatus.OK);
    }

    @PostMapping("/email-verification")
    public ResponseEntity<?> verificationEmail(
            @Valid
            @RequestBody
            UserRegisterDTO userRegisterDTO,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        SignInResponse signUpResponse = userService.verificationEmail(userRegisterDTO);
        ApiDataResponse apiDataResponse = ApiDataResponse
                .builder()
                .status(HttpStatus.OK.value())
                .data(signUpResponse)
                .message("Email sent")
                .build();
        return new ResponseEntity<>(apiDataResponse, HttpStatus.OK);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> resetPassword(
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
        userService.resetPassword(email);
        return new ResponseEntity<>("Email sent", HttpStatus.CREATED);
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @Valid
            @RequestBody ChangePasswordRequestDTO changePasswordRequest,
            BindingResult result
    ) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        try {
            userService.changePassword(changePasswordRequest);
            return new ResponseEntity<>("Password changed", HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (TokenExpiredException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
