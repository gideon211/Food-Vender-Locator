package com.vendorandcustomer.API.Service;

import com.vendorandcustomer.API.model.User;
import com.vendorandcustomer.API.model.Vendor;
import com.vendorandcustomer.API.repository.UserRepository;
import com.vendorandcustomer.API.repository.VendorRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VendorService {
    private final VendorRepository vendorRepository;
    private final UserRepository userRepository;

    public VendorService(VendorRepository vendorRepository, UserRepository userRepository) {
        this.vendorRepository = vendorRepository;
        this.userRepository = userRepository;
    }

    public Vendor addVendor(Vendor vendor, String userEmail) {
        // Validate required fields
        if (isNullOrEmpty(vendor.getRestaurantEmail()) ||
                isNullOrEmpty(vendor.getRestaurantName()) ||
                isNullOrEmpty(vendor.getPhoneNumber()) ||
                isNullOrEmpty(vendor.getRestaurantType()) ||
                vendor.getLatitude() == null ||
                vendor.getLongitude() == null) {
            throw new IllegalArgumentException("All required fields must be filled out.");
        }

        // Check if vendor email already exists
        if (vendorRepository.findByRestaurantEmail(vendor.getRestaurantEmail()).isPresent()) {
            throw new RuntimeException("A vendor with this email already exists.");
        }

        // Get the authenticated user
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if user already has a vendor account
        if (user.getVendor() != null) {
            throw new RuntimeException("User already has a vendor account");
        }

        // Check if user has VENDOR role
        if (user.getRole() != User.Role.VENDOR) {
            throw new RuntimeException("User does not have VENDOR role");
        }

        // Set the user relationship
        vendor.setUser(user);

        // Save the vendor
        Vendor savedVendor = vendorRepository.save(vendor);

        // Update user to reference the vendor
        user.setVendor(savedVendor);
        userRepository.save(user);

        return savedVendor;
    }

    // Helper method
    private boolean isNullOrEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }

    public List<Vendor> getAllVendors() {
        return vendorRepository.findAll();
    }

    public List<Vendor> findNearbyVendors(double userLat, double userLon, double radiusKm) {
        return vendorRepository.findAll().stream()
                .filter(v -> calculateDistance(userLat, userLon, v.getLatitude(), v.getLongitude()) <= radiusKm)
                .toList();
    }

    public Vendor updateVendor(String restaurantEmail, Vendor updatedVendor) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        // Verify the user owns this vendor
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getVendor() == null || !user.getVendor().getRestaurantEmail().equals(restaurantEmail)) {
            throw new RuntimeException("You can only update your own vendor account");
        }

        return vendorRepository.findByRestaurantEmail(restaurantEmail)
                .map(existingVendor -> {
                    // Update fields
                    existingVendor.setRestaurantName(updatedVendor.getRestaurantName());
                    existingVendor.setPhoneNumber(updatedVendor.getPhoneNumber());
                    existingVendor.setImageUrl(updatedVendor.getImageUrl());
                    existingVendor.setRestaurantType(updatedVendor.getRestaurantType());
                    existingVendor.setDescription(updatedVendor.getDescription());
                    existingVendor.setLatitude(updatedVendor.getLatitude());
                    existingVendor.setLongitude(updatedVendor.getLongitude());

                    return vendorRepository.save(existingVendor);
                })
                .orElseThrow(() -> new RuntimeException("Vendor not found with email: " + restaurantEmail));
    }

    @Transactional
    public void deleteVendor(String restaurantEmail) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        // Verify the user owns this vendor
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getVendor() == null || !user.getVendor().getRestaurantEmail().equals(restaurantEmail)) {
            throw new RuntimeException("You can only delete your own vendor account");
        }

        if (!vendorRepository.existsByRestaurantEmail(restaurantEmail)) {
            throw new RuntimeException("Vendor not found with email: " + restaurantEmail);
        }

        // Remove vendor reference from user
        user.setVendor(null);
        userRepository.save(user);

        // Delete vendor
        vendorRepository.deleteByRestaurantEmail(restaurantEmail);
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final double R = 6371; // Earth radius in KM
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    public Vendor getVendorByUserEmail(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getVendor();
    }
}