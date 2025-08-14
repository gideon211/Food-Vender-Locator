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


    public VendorService(VendorRepository repository) {
        this.repository = repository;
    }

    public Vendor addVendor(Vendor vendor) {
        // Validate required fields
        if (isNullOrEmpty(vendor. getRestaurantEmail()) ||
                isNullOrEmpty(vendor.getRestaurantName()) ||
                isNullOrEmpty(vendor.getPhoneNumber()) ||
                isNullOrEmpty(vendor.getImageUrl()) ||
                isNullOrEmpty(vendor.getRestaurantType()) ||
                vendor.getLatitude() == null ||
                vendor.getLongitude() == null) {
            throw new IllegalArgumentException("All fields must be filled out.");
        }
        if (repository.findByRestaurantEmail(vendor.getRestaurantEmail()).isPresent()) {
            throw new RuntimeException("A vendor with this email already exists.");
        }

        return repository.save(vendor);

    }

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

    public Vendor updateVendor(String restaurantEmail, Vendor updatedVendor) {
        String loggedInName = SecurityContextHolder.getContext().getAuthentication().getName();

        return repository.findByRestaurantEmail(restaurantEmail)
                .map(existingVendor -> {

                    // Update fields
                    existingVendor.setRestaurantName(updatedVendor.getRestaurantName());
                    existingVendor.setPhoneNumber(updatedVendor.getPhoneNumber());
                    existingVendor.setImageUrl(updatedVendor.getImageUrl());
                    existingVendor.setRestaurantType(updatedVendor.getRestaurantType());
                    existingVendor.setLatitude(updatedVendor.getLatitude());
                    existingVendor.setLongitude(updatedVendor.getLongitude());

                    return repository.save(existingVendor);
                })
                .orElseThrow(() -> new RuntimeException("Vendor not found with email: " + restaurantEmail));

    }


    @ Transactional
    public void deleteEmail(String restaurantEmail) {
        if (!repository.existsByRestaurantEmail(restaurantEmail)) {
            throw new RuntimeException("Vendor not found with email: " + restaurantEmail);
        }
        repository.deleteByRestaurantEmail(restaurantEmail);
    }


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