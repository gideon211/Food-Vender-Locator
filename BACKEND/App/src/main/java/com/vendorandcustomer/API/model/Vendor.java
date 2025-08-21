package com.vendorandcustomer.API.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vendor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String restaurantName;
    private String restaurantEmail;
    private String phoneNumber;
    private String imageUrl;
    private String restaurantType;
    private String description;
    private Double latitude;
    private Double longitude;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // Add getters and setters if not using @Data



}
