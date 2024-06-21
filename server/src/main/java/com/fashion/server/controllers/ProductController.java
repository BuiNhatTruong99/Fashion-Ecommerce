package com.fashion.server.controllers;

import com.fashion.server.dtos.ProductDTO;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.models.Product;
import com.fashion.server.services.ProductRedisService;
import com.fashion.server.services.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductRedisService productRedisService;

    @GetMapping("")
    public ResponseEntity<?> getAllProducts(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0", name = "category_id") Integer categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "0") Double minPrice,
            @RequestParam(defaultValue = "10000") Double maxPrice,
            @RequestParam(defaultValue = "updatedAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDirection
    ) throws JsonProcessingException {
        Sort.Direction direction = sortDirection
                .equalsIgnoreCase("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC;
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by(direction, sortBy));

        List<Product> redisProducts = productRedisService
                .getProducts(keyword, categoryId, minPrice, maxPrice, pageRequest);
        if (redisProducts == null || redisProducts.isEmpty()) {
            Page<Product> productPage = productService
                    .getAllProducts(keyword, categoryId, minPrice, maxPrice, pageRequest);
            List<Product> products = productPage.getContent();
            productRedisService.saveProducts(products, keyword, categoryId, minPrice, maxPrice, pageRequest);

            return ResponseEntity.ok(products);
        }

        return ResponseEntity.ok(redisProducts);
    }

    @GetMapping("/{productID}")
    public ResponseEntity<?> getProductById(@PathVariable Integer productID) {
        return ResponseEntity.ok(productService.getProductById(productID));
    }


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProduct(
            @Valid @ModelAttribute ProductDTO productDTO,
            BindingResult result) {

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        try {
            productService.createProduct(productDTO);
            return new ResponseEntity<>("Product created successfully", HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (MaxUploadSizeExceededException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.PAYLOAD_TOO_LARGE);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/{productID}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduct(
            @PathVariable Integer productID,
            @Valid @ModelAttribute ProductDTO productDTO,
            BindingResult result) {

        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        productService.updateProduct(productID, productDTO);
        return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/{productID}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer productID) {
        productService.deleteProduct(productID);
        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }
}
