package com.vendorandcustomer.API.model;

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
    private String name;
    private String email;
    private int phoneNumber;
    private String imageUrl;
    private String restaurantType;
    private double latitude;
    private double longitude;

    @OneToOne
    @JoinColumn(name = "user_id")

    private User user;




}
