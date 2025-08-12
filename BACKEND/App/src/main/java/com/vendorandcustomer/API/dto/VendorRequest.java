package com.vendorandcustomer.API.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VendorRequest {
    private String name;
    private String email;
    private String phoneNumber;
    private String imageUrl;
    private String description;
    private String password;
    private String restaurantType;
    private double latitude;
    private double longitude;
}
