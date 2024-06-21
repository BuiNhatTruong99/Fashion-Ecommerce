package com.fashion.server.controllers;

import com.fashion.server.dtos.CategoryDTO;
import com.fashion.server.models.Category;
import com.fashion.server.services.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping
    public ResponseEntity<?> createCategory(
            @Valid @RequestBody CategoryDTO categoryDTO, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        categoryService.createCategory(categoryDTO);
        return new ResponseEntity<>("Category created successfully", HttpStatus.CREATED);
    }

    @PutMapping("/{categoryID}")
    public ResponseEntity<?> updateCategory(
            @PathVariable Integer categoryID, @RequestBody CategoryDTO categoryDTO) {
        categoryService.updateCategory(categoryID, categoryDTO);
        return new ResponseEntity<>("Category updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/{categoryID}")
    public ResponseEntity<?> deleteCategory(@PathVariable Integer categoryID) {
        categoryService.deleteCategory(categoryID);
        return new ResponseEntity<>("Category deleted successfully", HttpStatus.OK);
    }
}
