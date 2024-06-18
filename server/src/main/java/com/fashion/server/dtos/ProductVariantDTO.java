package com.fashion.server.dtos;

import com.fashion.server.models.Color;
import com.fashion.server.models.Size;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariantDTO {

    @NotNull(message = "Color cannot be blank")
    private Color color;

    @NotNull(message = "Size cannot be blank")
    private Size size;

    @NotNull(message = "Stock cannot be null")
    @Min(value = 0, message = "Stock must be greater than or equal to 0")
    private Integer stock;

    @NotNull(message = "Product id cannot be null")
    @JsonProperty("product_id")
    private Integer productId;
}
