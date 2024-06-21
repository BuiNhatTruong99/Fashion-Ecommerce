package com.fashion.server.controllers;

import com.fashion.server.dtos.ProductVariantDTO;
import com.fashion.server.models.Color;
import com.fashion.server.models.ProductVariant;
import com.fashion.server.models.Size;
import com.fashion.server.services.ProductVariantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/product-variant")
@RequiredArgsConstructor
public class ProductVariantController {

    private final ProductVariantService productVariantService;

    @GetMapping
    public ResponseEntity<?> getProductVariant(
            @RequestParam(name = "product_id") Integer productId,
            @RequestParam(defaultValue = "") Color color,
            @RequestParam(defaultValue = "") Size size) {
        List<ProductVariant> productVariant = productVariantService.getProductVariant(productId, color, size);
        return ResponseEntity.ok(productVariant);
    }


    @PostMapping
    public ResponseEntity<?> createProductVariant(@Valid @RequestBody
                                                  ProductVariantDTO productVariantDTO,
                                                  BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }

        productVariantService.createProductVariant(productVariantDTO);
        return new ResponseEntity<>("Product variant created successfully", HttpStatus.CREATED);
    }
}
