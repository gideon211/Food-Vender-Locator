package com.vendorandcustomer.API.Service;

import com.vendorandcustomer.API.model.Vendor;
import com.vendorandcustomer.API.repository.VendorRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.awt.geom.Point2D.distance;

@Service
public class VendorService {
    private final VendorRepository repository;
    private final PasswordEncoder passwordEncoder;

    public VendorService(VendorRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

//    public Vendor addVendor(Vendor vendor) {
//        // Validate required fields
//        if (isNullOrEmpty(vendor.getEmail()) ||
//                isNullOrEmpty(vendor.getPassword()) ||
//                isNullOrEmpty(vendor.getName()) ||
//                isNullOrEmpty(vendor.getPhoneNumber()) ||
//                isNullOrEmpty(vendor.getImageUrl()) ||
//                isNullOrEmpty(vendor.getRestaurantType()) ||
//                vendor.getLatitude() == null ||
//                vendor.getLongitude() == null) {
//            throw new IllegalArgumentException("All fields must be filled out.");
//        }
//        if (repository.findByEmail(vendor.getEmail()).isPresent()) {
//            throw new RuntimeException("A vendor with this email already exists.");
//        }
//        vendor.setPassword(passwordEncoder.encode(vendor.getPassword()));
//        return repository.save(vendor);
//
//    }

    // Helper method
    private boolean isNullOrEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }


    public List<Vendor> getAllVendors() {
        return repository.findAll();
    }

    public List<Vendor> findNearbyVendors(double userLat, double userLon, double radiusKm) {
        return repository.findAll().stream()
                .filter(v -> distance(userLat, userLon, v.getLatitude(), v.getLongitude()) <= radiusKm)
                .toList();
    }

//    public Vendor updateVendor(String email, Vendor updatedVendor) {
//        String loggedInName = SecurityContextHolder.getContext().getAuthentication().getName();
//
//        return repository.findByEmail(email)
//                .map(existingVendor -> {
//                    // Check if the logged-in user owns this vendor
//                    if (!existingVendor.getEmail().equals(loggedInName)) {
//                        throw new RuntimeException("You are not allowed to update this profile!");
//                    }
//
//                    // Update fields
//                    existingVendor.setName(updatedVendor.getName());
//                    existingVendor.setPhoneNumber(updatedVendor.getPhoneNumber());
//                    existingVendor.setImageUrl(updatedVendor.getImageUrl());
//                    existingVendor.setRestaurantType(updatedVendor.getRestaurantType());
//                    existingVendor.setLatitude(updatedVendor.getLatitude());
//                    existingVendor.setLongitude(updatedVendor.getLongitude());
//
//                    return repository.save(existingVendor);
//                })
//                .orElseThrow(() -> new RuntimeException("Vendor not found with email: " + email));
//
//    }

//    public boolean login(String email, String rawPassword) {
//        Optional<Vendor> optionalVendor = repository.findByEmail(email);
//        if (optionalVendor.isPresent()) {
//            Vendor vendor = optionalVendor.get();
//            // Check if raw password matches the hashed password
//            return passwordEncoder.matches(rawPassword, vendor.getPassword());
//        }
//        return false;
//    }

//    @Transactional
//    public void deleteEmail(String email) {
//        if (!repository.existsByEmail(email)) {
//            throw new RuntimeException("Vendor not found with email: " + email);
//        }
//        repository.deleteByEmail(email);
//    }


    private double distance(double lat1, double lon1, double lat2, double lon2) {
        final double R = 6371; // Earth radius in KM
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
}