package com.fashion.server.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CategoryDTO {
    @NotBlank(message = "Category name cannot be empty")
    @Size(min = 3, max = 255, message = "Category name must be between 3 and 255 characters")
    private String name;

    @NotBlank(message = "Category thumbnail cannot be empty")
    private String thumbnail;
}
