package com.fashion.server.repositories;

import com.fashion.server.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    boolean findByName(String name);

    boolean existsByName(String name);
}
