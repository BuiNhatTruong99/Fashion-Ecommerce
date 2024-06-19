package com.fashion.server.services;

import com.fashion.server.dtos.ProductVariantDTO;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.models.Color;
import com.fashion.server.models.ProductVariant;
import com.fashion.server.models.Size;
import com.fashion.server.repositories.ProductRepository;
import com.fashion.server.repositories.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductVariantService implements IProductVariantService {

    private static final Logger logger = LoggerFactory.getLogger(ProductVariantService.class);

    private final ProductVariantRepository productVariantRepository;
    private final ProductRepository productRepository;

    @Override
    public List<ProductVariant> getProductVariantsByProductId(Integer productID) {
        return productVariantRepository.findAllByProductId(productID);
    }

    @Override
    public List<ProductVariant> getProductVariant(Integer productId, Color color, Size size) {

        if (productRepository.findById(productId).isEmpty()) {
            logger.error("Product {} not found", productId);
            throw new ResourceNotFoundException("Product [%s] not found".formatted(productId));
        }
        return productVariantRepository.searchProductVariant(productId, color, size);
    }

    @Override
    public ProductVariant createProductVariant(ProductVariantDTO productVariantDTO) {

        ProductVariant productVariant = ProductVariant.builder()
                .color(productVariantDTO.getColor())
                .size(productVariantDTO.getSize())
                .stock(productVariantDTO.getStock())
                .product(productRepository.findById(productVariantDTO.getProductId())
                        .orElseThrow(() -> {
                            logger.error("Product {} not found", productVariantDTO.getProductId());
                            return new ResourceNotFoundException("Product [%s] not found".formatted(productVariantDTO.getProductId()));
                        }))
                .build();

        return productVariantRepository.save(productVariant);
    }
}
