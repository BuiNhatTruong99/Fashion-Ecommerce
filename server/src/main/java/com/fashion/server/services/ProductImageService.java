package com.fashion.server.services;

import com.fashion.server.dtos.ProductImageDTO;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.models.ProductImage;
import com.fashion.server.repositories.ProductImageRepository;
import com.fashion.server.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductImageService implements IProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductRepository productRepository;

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
    public ProductImage createProductImage(Integer productID, ProductImageDTO productImageDTO) {
        ProductImage newProductImage = ProductImage.builder()
                .imageUrl(productImageDTO.getImageUrl())
                .product(productRepository.findById(productID).orElseThrow(() -> new ResourceNotFoundException("Product [%s] not found".formatted(productID))))
                .build();
        return productImageRepository.save(newProductImage);
    }

    @Override
    public void deleteProductImage(Integer productImageID) {
        ProductImage existingProductImage = getProductImageById(productImageID);
        productImageRepository.delete(existingProductImage);
    }
    
}
