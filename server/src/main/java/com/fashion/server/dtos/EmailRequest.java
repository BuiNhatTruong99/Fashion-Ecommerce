package com.fashion.server.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class EmailRequest {
    @Pattern(
            regexp = "^[a-zA-Z0-9._%+-]+@gmail\\.com$",
            message = "Email must be a valid Gmail address"
    )
    @NotBlank(message = "Email is required")
    private String email;
}
