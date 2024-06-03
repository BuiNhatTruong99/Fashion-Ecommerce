package com.fashion.server.dtos;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CategoryDTO {
    @NotEmpty(message = "Category name cannot be empty")
    private String name;

    @NotEmpty(message = "Category thumbnail cannot be empty")
    private String thumbnail;
}
