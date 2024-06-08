package com.fashion.server.services;

import com.fashion.server.dtos.ProductDTO;
import com.fashion.server.exception.DuplicateResourceException;
import com.fashion.server.exception.RequestValidationException;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.models.Product;
import com.fashion.server.models.ProductImage;
import com.fashion.server.repositories.CategoryRepository;
import com.fashion.server.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {

    private final ProductRepository productRepository;
    private final ProductImageService productImageService;
    private final CategoryRepository categoryRepository;

    @Override
    public Product getProductById(Integer productID) {
        return productRepository
                .findById(productID)
                .orElseThrow(() -> new ResourceNotFoundException("Product [%s] not found".formatted(productID)));
    }

    @Override
    public Page<Product> getAllProducts(PageRequest pageRequest) {
        return productRepository.findAll(pageRequest);
    }


    @Transactional
    @Override
    public Product createProduct(ProductDTO productDTO) {
        if (productRepository.existsByName(productDTO.getName())) {
            throw new DuplicateResourceException("Product [%s] already exists ".formatted(productDTO.getName()));
        }

        Product newProduct = Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .category(categoryRepository
                        .findById(productDTO.getCategoryId())
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Category [%s] not found"
                                        .formatted(productDTO.getCategoryId()))))
                .build();

        Product savedProduct = productRepository.save(newProduct);

        validateImage(productDTO.getImages());

        for (MultipartFile image : productDTO.getImages()) {
            productImageService.createProductImage(newProduct.getId(), image);
        }

        return savedProduct;
    }

    @Transactional
    @Override
    public Product updateProduct(Integer productID, ProductDTO productDTO) {
        Product existingProduct = getProductById(productID);

        boolean changes = false;

        if (productDTO.getName() != null && !productDTO.getName().equals(existingProduct.getName())) {
            if (productRepository.existsByName(productDTO.getName())) {
                throw new DuplicateResourceException("Product [%s] already exists ".formatted(productDTO.getName()));
            }
            existingProduct.setName(productDTO.getName());
            changes = true;
        }
        if (productDTO.getDescription() != null && !productDTO.getDescription().equals(existingProduct.getDescription())) {
            existingProduct.setDescription(productDTO.getDescription());
            changes = true;
        }
        if (productDTO.getCategoryId() != null && !productDTO.getCategoryId().equals(existingProduct.getCategory().getId())) {
            existingProduct.setCategory(categoryRepository
                    .findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category [%s] not found"
                                    .formatted(productDTO.getCategoryId()))));
            changes = true;
        }
        //productDTO.getImages() != null && !productDTO.getImages().isEmpty()
        if (!productDTO.getImages().get(0).isEmpty()) {
            validateImage(productDTO.getImages());
            List<ProductImage> productImages = productImageService.getAllProductImagesByProductID(existingProduct.getId());
            for (ProductImage productImage : productImages) {
                productImageService.deleteAllProductImageByProductId(productImage.getId());
            }
            for (MultipartFile image : productDTO.getImages()) {
                productImageService.createProductImage(existingProduct.getId(), image);
            }
            changes = true;
        }

        if (!changes) {
            throw new RequestValidationException("No changes to update");
        }

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Integer productID) {
        Product existingProduct = getProductById(productID);

        List<ProductImage> productImages = productImageService.getAllProductImagesByProductID(existingProduct.getId());
        for (ProductImage productImage : productImages) {
            productImageService.deleteAllProductImageByProductId(productImage.getId());
        }
        productRepository.delete(existingProduct);
    }

    private void validateImage(List<MultipartFile> images) {
        if (images.size() > 5) {
            throw new IllegalArgumentException("Cannot upload more than 5 images");
        }

        for (MultipartFile image : images) {
            String contentType = image.getContentType();
            if (contentType == null || !contentType.startsWith("image")) {
                throw new IllegalArgumentException("File must be an image");
            }
        }
    }

}
