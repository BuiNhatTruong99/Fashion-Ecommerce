package com.fashion.server.services;

import com.fashion.server.dtos.AuthenticationResponse;
import com.fashion.server.dtos.EmailRequest;
import com.fashion.server.dtos.UserLoginDTO;

public interface IUserService {
    String register(EmailRequest email);

    AuthenticationResponse login(UserLoginDTO userLoginDTO);

}
