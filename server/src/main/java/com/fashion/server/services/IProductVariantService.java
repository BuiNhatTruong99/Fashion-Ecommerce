package com.fashion.server.services;

import com.fashion.server.dtos.ProductVariantDTO;
import com.fashion.server.models.Color;
import com.fashion.server.models.ProductVariant;
import com.fashion.server.models.Size;

import java.util.List;

public interface IProductVariantService {

    List<ProductVariant> getProductVariantsByProductId(Integer productID);

    List<ProductVariant> getProductVariant(Integer productId, Color color, Size size);

    ProductVariant createProductVariant(ProductVariantDTO productVariantDTO);
}
