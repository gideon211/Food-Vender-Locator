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
    private String name;

    @OneToOne
    @JsonIgnore
    private User user;
    private String phoneNumber;
    private String imageUrl;
    private String restaurantType;
    private String description;
    private String password;
    private Double latitude;
    private Double longitude;






}
