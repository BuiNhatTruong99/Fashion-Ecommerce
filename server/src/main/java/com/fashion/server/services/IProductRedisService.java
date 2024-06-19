package com.fashion.server.services;

import com.fashion.server.models.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IProductRedisService {
    /**
     * Retrieves a list of products based on the given keyword, category ID, and pagination information.
     *
     * @param keyword     the keyword to search for products
     * @param categoryId  the category ID to filter products
     * @param pageRequest the pagination information
     * @return a list of products matching the criteria
     */
    List<Product> getProducts(String keyword,
                              Integer categoryId,
                              Double minPrice,
                              Double maxPrice,
                              PageRequest pageRequest) throws JsonProcessingException;

    /**
     * Saves a list of products associated with the given keyword, category ID, and pagination information.
     *
     * @param products    the list of products to save
     * @param keyword     the keyword associated with the products
     * @param categoryId  the category ID associated with the products
     * @param pageRequest the pagination information
     */
    void saveProducts(List<Product> products, String keyword,
                      Integer categoryId,
                      Double minPrice,
                      Double maxPrice,
                      PageRequest pageRequest) throws JsonProcessingException;

    /**
     * Clears all cached products.
     */
    void clearProducts();
}
