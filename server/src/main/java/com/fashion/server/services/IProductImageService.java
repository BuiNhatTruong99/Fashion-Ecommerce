package com.fashion.server.services;

import com.fashion.server.dtos.ProductImageDTO;
import com.fashion.server.models.ProductImage;

import java.util.List;

public interface IProductImageService {

    List<ProductImage> getAllProductImagesByProductID(Integer productID);

    ProductImage getProductImageById(Integer productImageID);

    ProductImage createProductImage(Integer productID, ProductImageDTO productImageDTO);

    void deleteProductImage(Integer productImageID);
}
