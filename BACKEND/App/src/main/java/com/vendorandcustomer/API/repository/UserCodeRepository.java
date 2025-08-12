package com.vendorandcustomer.API.repository;

import com.vendorandcustomer.API.model.UserCode;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserCodeRepository extends JpaRepository<UserCode, Long> {
    Optional<UserCode> findByToken(String token);

    @Query(value = """
            SELECT ut
            FROM UserCode ut
            WHERE ut.userData.id = :userId
            """)
    List<UserCode> getAllUserTokens(Long userId);
}
