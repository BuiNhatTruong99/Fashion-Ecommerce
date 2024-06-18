package com.fashion.server.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ProductDTO {
    @NotBlank(message = "Product name cannot be empty")
    @Size(min = 3, max = 255, message = "Product name must be between 3 and 255 characters")
    private String name;

    @NotNull(message = "Old price cannot be null")
    @Min(value = 0, message = "Old price must be greater than or equal to 0")
    @JsonProperty("old_price")
    private Double oldPrice;

    @NotNull(message = "New price cannot be null")
    @Min(value = 0, message = "New price must be greater than or equal to 0")
    @JsonProperty("new_price")
    private Double newPrice;

    private String description;

    private String information;

    @NotNull(message = "Category cannot be empty")
    @JsonProperty("category_id")
    private Integer categoryId;

    @NotEmpty(message = "At least one image is required")
    private List<MultipartFile> images;
}
