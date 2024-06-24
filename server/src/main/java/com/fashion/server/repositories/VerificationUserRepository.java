package com.fashion.server.repositories;

import com.fashion.server.models.VerificationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VerificationUserRepository extends JpaRepository<VerificationUser, Integer> {


    @Query("SELECT v FROM VerificationUser v WHERE v.email = :email ORDER BY v.updatedAt DESC")
    Optional<List<VerificationUser>> findByEmail(String email);

    void deleteAllByEmail(String email);
}
