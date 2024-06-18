package com.fashion.server.services;

import com.fashion.server.dtos.CategoryDTO;
import com.fashion.server.exception.DuplicateResourceException;
import com.fashion.server.exception.RequestValidationException;
import com.fashion.server.exception.ResourceNotFoundException;
import com.fashion.server.models.Category;
import com.fashion.server.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {

    private static final Logger logger = LoggerFactory.getLogger(CategoryService.class);

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Integer categoryID) {
        return categoryRepository
                .findById(categoryID)
                .orElseThrow(() -> {
                    logger.error("Category {} not found", categoryID);
                    return new ResourceNotFoundException("Category [%s] not found".formatted(categoryID));
                });
    }

    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        if (categoryRepository.existsByName(categoryDTO.getName())) {
            logger.error("Category {} already exists", categoryDTO.getName());
            throw new DuplicateResourceException("Category [%s] already exists"
                    .formatted(categoryDTO.getName()));
        }
        Category newCategory = Category.builder()
                .name(categoryDTO.getName())
                .thumbnail(categoryDTO.getThumbnail())
                .build();
        return categoryRepository.save(newCategory);
    }

    @Override
    public Category updateCategory(Integer categoryID, CategoryDTO categoryDTO) {
        Category existingCategory = getCategoryById(categoryID);

        boolean changes = false;

        if (StringUtils.isNotBlank(categoryDTO.getName()) && !categoryDTO.getName().equals(existingCategory.getName())) {
            if (categoryRepository.existsByName(categoryDTO.getName())) {
                logger.error("Category {} already exists", categoryDTO.getName());
                throw new DuplicateResourceException("Category [%s] already exists"
                        .formatted(categoryDTO.getName()));
            }
            existingCategory.setName(categoryDTO.getName());
            changes = true;
        }
        if (StringUtils.isNotBlank(categoryDTO.getThumbnail())
                && !categoryDTO.getThumbnail().equals(existingCategory.getThumbnail())) {
            existingCategory.setThumbnail(categoryDTO.getThumbnail());
            changes = true;
        }

        if (!changes) {
            logger.error("No changes to update");
            throw new RequestValidationException("No changes to update");
        }

        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Integer categoryID) {
        Category existingCategory = getCategoryById(categoryID);
        categoryRepository.delete(existingCategory);
    }

}
