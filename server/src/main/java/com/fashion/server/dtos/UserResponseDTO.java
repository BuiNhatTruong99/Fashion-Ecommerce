package com.fashion.server.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDTO {
    private Integer userId;
    private String email;
    private String phone;
    private String fullName;
}
