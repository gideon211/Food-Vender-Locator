package com.vendorandcustomer.API.repository;

import com.vendorandcustomer.API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
        Optional<User> findByEmail(String email);
        void deleteByEmail(String email);
        boolean existsByEmail(String email);
}

