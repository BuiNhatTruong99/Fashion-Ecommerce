package com.fashion.server.repositories;

import com.fashion.server.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    boolean existsByName(String name);
}
