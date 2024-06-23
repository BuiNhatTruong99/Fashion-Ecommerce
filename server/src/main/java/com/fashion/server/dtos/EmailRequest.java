package com.fashion.server.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EmailRequest {
    @Email(message = "Email is not valid")
    @NotBlank(message = "Email is required")
    private String email;
}
