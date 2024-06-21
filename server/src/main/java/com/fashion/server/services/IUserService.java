package com.fashion.server.services;

import com.fashion.server.dtos.AuthenticationResponse;
import com.fashion.server.dtos.UserLoginDTO;
import com.fashion.server.dtos.UserRegisterDTO;

public interface IUserService {
    AuthenticationResponse register(UserRegisterDTO userRegisterDTO);

    AuthenticationResponse login(UserLoginDTO userLoginDTO);
}
