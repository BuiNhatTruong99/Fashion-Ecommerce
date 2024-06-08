package com.fashion.server.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fashion.server.dtos.ProductImageDTO;
import com.fashion.server.exception.ImageUploadException;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.models.ProductImage;
import com.fashion.server.repositories.ProductImageRepository;
import com.fashion.server.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductImageService implements IProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;
    private final Cloudinary cloudinary;

    @Override
    public List<ProductImage> getAllProductImagesByProductID(Integer productID) {
        return productImageRepository.findAllByProductId(productID);
    }

    @Override
    public ProductImage getProductImageById(Integer productImageID) {
        return productImageRepository.findById(productImageID)
                .orElseThrow(() -> new ResourceNotFoundException("ProductImage [%s] not found".formatted(productImageID)));
    }

    @Override
    public ProductImage createProductImage(Integer productID, MultipartFile images) {
        try {
            Map<?, ?> uploadResponse = cloudinary
                    .uploader()
                    .upload(images.getBytes(), ObjectUtils.asMap("folder", "fashion-products"));
            ProductImage newProductImage = ProductImage.builder()
                    .imageUrl(uploadResponse.get("url").toString())
                    .product(productRepository.findById(productID)
                            .orElseThrow(() -> new ResourceNotFoundException("Product [%s] not found".formatted(productID))))
                    .build();
            return productImageRepository.save(newProductImage);
        } catch (Exception e) {
            throw new ImageUploadException(e.getMessage());
        }
    }

    @Override
    public void deleteProductImage(Integer productImageID) {
        ProductImage existingProductImage = getProductImageById(productImageID);
        productImageRepository.delete(existingProductImage);
    }

}
