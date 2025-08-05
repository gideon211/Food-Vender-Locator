package com.vendorandcustomer.API.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;


    @Enumerated(EnumType.STRING)
    private User.Role role;

    public void setName() {
    }

    public static enum Role{
        CUSTOMER,
        VENDOR;

        @JsonCreator
        public static Role fromString(String key) {
            return key == null ? null : Role.valueOf(key.toUpperCase());
        }

        @JsonValue
        public String getValue() {
            return name();
        }
    }
}
