package com.vendorandcustomer.API.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @OneToOne
    @JsonIgnore
    private Vendor vendor;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Enumerated(EnumType.STRING)
    private User.Role role;

    public void setName() {
    }
    public static enum Role{
        // Use only the values that your database constraint allows
        CUSTOMER,
        VENDOR;
        // Remove USER if it's not allowed in the database

        @JsonCreator
        public static Role fromString(String key) {
            if (key == null) return null;

            // Handle case insensitivity and map "USER" to "CUSTOMER" if needed
            String upperKey = key.toUpperCase();
            if ("USER".equals(upperKey)) {
                return CUSTOMER; // Map USER to CUSTOMER
            }
            return Role.valueOf(upperKey);
        }

        @JsonValue
        public String getValue() {
            return name();
        }
    }
}
