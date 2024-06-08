package com.fashion.server.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ProductDTO {
    @NotBlank(message = "Product name cannot be empty")
    @Size(min = 3, max = 255, message = "Product name must be between 3 and 255 characters")
    private String name;

    private String description;

    @NotNull(message = "Category cannot be empty")
    @JsonProperty("category_id")
    private Integer categoryId;

    @NotNull(message = "At least one image is required")
    private List<MultipartFile> images;
}
