package com.fashion.server.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductImageDTO {
    @JsonProperty("product_id")
    private Integer productId;

    @JsonProperty("image_url")
    private String imageUrl;
}
