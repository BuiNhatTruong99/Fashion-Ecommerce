package com.fashion.server.services;

import com.fashion.server.dtos.*;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;

public interface IUserService {
    void register(EmailRequest email) throws MessagingException, UnsupportedEncodingException;

    SignInResponse login(UserLoginDTO userLoginDTO);

    SignInResponse verificationEmail(UserRegisterDTO userRegisterDTO);

    void resetPassword(EmailRequest email);

    void changePassword(ChangePasswordRequestDTO changePasswordRequest);

}
