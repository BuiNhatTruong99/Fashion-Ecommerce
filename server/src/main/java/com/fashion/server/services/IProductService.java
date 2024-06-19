package com.fashion.server.services;

import com.fashion.server.dtos.ProductDTO;
import com.fashion.server.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;


public interface IProductService {

    Product getProductById(Integer productID);

    Page<Product> getAllProducts(String keyword, Integer categoryId, Double minPrice, Double maxPrice, PageRequest pageRequest);

    Product createProduct(ProductDTO productDTO);

    Product updateProduct(Integer productID, ProductDTO productDTO);

    void deleteProduct(Integer productID);

}
