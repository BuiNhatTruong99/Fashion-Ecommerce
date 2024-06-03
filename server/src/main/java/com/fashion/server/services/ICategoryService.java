package com.fashion.server.services;

import com.fashion.server.dtos.CategoryDTO;
import com.fashion.server.models.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories();

    Category getCategoryById(Integer categoryID);
    Category createCategory(CategoryDTO categoryDTO);

    Category updateCategory(Integer categoryID, CategoryDTO categoryDTO);

    void deleteCategory(Integer categoryID);

}
