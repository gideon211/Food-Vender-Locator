package com.vendorandcustomer.API.Service;

import com.vendorandcustomer.API.model.Vendor;
import com.vendorandcustomer.API.repository.VendorRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.awt.geom.Point2D.distance;

@Service
public class VendorService {
    private final VendorRepository repository;

    public VendorService(VendorRepository repository) {
        this.repository = repository;
    }

    public Vendor addVendor(Vendor vendor) {
        return repository.save(vendor);
    }

    public List<Vendor> getAllVendors() {
        return repository.findAll();
    }

    public List<Vendor> findNearbyVendors(double userLat, double userLon, double radiusKm) {
        return repository.findAll().stream()
                .filter(v -> distance(userLat, userLon, v.getLatitude(), v.getLongitude()) <= radiusKm)
                .toList();
    }

    public Vendor updateVendor(Long id, Vendor updatedVendor) {
        String loggedInName = SecurityContextHolder.getContext().getAuthentication().getName();

        return repository.findById(id)
                .map(existingVendor -> {
                    //  Check if the logged-in user owns this vendor
                    if (!existingVendor.getUser().getName().equals(loggedInName)) {
                        throw new RuntimeException("You are not allowed to update this profile!");
                    }

                    // Update fields
                    existingVendor.setName(updatedVendor.getName());
                    existingVendor.setPhoneNumber(updatedVendor.getPhoneNumber());
                    existingVendor.setImageUrl(updatedVendor.getImageUrl());
                    existingVendor.setRestaurantType(updatedVendor.getRestaurantType());
                    existingVendor.setLatitude(updatedVendor.getLatitude());
                    existingVendor.setLongitude(updatedVendor.getLongitude());

                    return repository.save(existingVendor);
                })
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + id));
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