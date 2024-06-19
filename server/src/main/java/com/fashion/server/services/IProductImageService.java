package com.fashion.server.services;

import com.fashion.server.dtos.ProductImageDTO;
import com.fashion.server.models.ProductImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IProductImageService {

    List<ProductImage> getAllProductImagesByProductID(Integer productID);

    ProductImage getProductImageById(Integer productImageID);

    ProductImage createProductImage(Integer productID, MultipartFile images);

    void deleteAllProductImageByProductId(Integer productImageID);
}
