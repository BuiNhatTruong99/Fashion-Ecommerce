package com.fashion.server.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SignInResponse {
    private String email;
    private String phone;
    private String fullName;
    private String token;
}
