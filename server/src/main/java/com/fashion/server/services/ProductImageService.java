package com.fashion.server.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fashion.server.exception.ImageUploadException;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.models.ProductImage;
import com.fashion.server.repositories.ProductImageRepository;
import com.fashion.server.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductImageService implements IProductImageService {

    private static final Logger logger = LoggerFactory.getLogger(ProductImageService.class);

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
                .orElseThrow(() -> {
                    logger.error("Product image {} not found", productImageID);
                    return new ResourceNotFoundException("Product image [%s] not found"
                            .formatted(productImageID));
                });
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
                            .orElseThrow(() -> {
                                logger.error("Product {} not found", productID);
                                return new ResourceNotFoundException("Product [%s] not found"
                                        .formatted(productID));
                            }))
                    .build();
            return productImageRepository.save(newProductImage);
        } catch (Exception e) {
            logger.info("Error uploading image: {}", e.getMessage());
            throw new ImageUploadException(e.getMessage());
        }
    }

    @Override
    public void deleteAllProductImageByProductId(Integer productImageID) {
        ProductImage existingProductImage = getProductImageById(productImageID);
        try {
            productImageRepository.delete(existingProductImage);
            String assertName = existingProductImage.getImageUrl()
                    .substring(existingProductImage.getImageUrl().lastIndexOf("/") + 1);
            String publicId = assertName.substring(0, assertName.lastIndexOf("."));
            cloudinary.uploader().destroy("fashion-products/" + publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            logger.info("Error deleting image: {}", e.getMessage());
            throw new ImageUploadException(e.getMessage());
        }

    }

}
