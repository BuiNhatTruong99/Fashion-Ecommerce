package com.fashion.server.repositories;

import com.fashion.server.models.Color;
import com.fashion.server.models.ProductVariant;
import com.fashion.server.models.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Integer> {
    List<ProductVariant> findAllByProductId(Integer productId);


    @Query("SELECT p FROM ProductVariant p WHERE " +
            "(:productId IS NULL OR :productId = 0 OR p.product.id = :productId) " +
            "AND (:color IS NULL OR p.color = :color) " +
            "AND (:size IS NULL OR p.size = :size)")
    List<ProductVariant> searchProductVariant(
            @Param("productId") Integer productId,
            @Param("color") Color color,
            @Param("size") Size size);
}
