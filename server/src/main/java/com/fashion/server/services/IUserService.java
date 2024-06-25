package com.fashion.server.services;

import com.fashion.server.dtos.*;

public interface IUserService {
    void register(EmailRequest email);

    SignInResponse login(UserLoginDTO userLoginDTO);

    SignInResponse verificationEmail(UserRegisterDTO userRegisterDTO);

}
