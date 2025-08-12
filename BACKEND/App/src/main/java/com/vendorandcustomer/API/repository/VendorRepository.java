package com.vendorandcustomer.API.repository;

import com.vendorandcustomer.API.model.User;
import com.vendorandcustomer.API.model.Vendor;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface VendorRepository extends JpaRepository<Vendor, Long> {
//    Optional<Vendor> findByEmail(String email);
//
//    boolean existsByEmail(String email);
//
//    @Transactional
//    void deleteByEmail(String email);
}