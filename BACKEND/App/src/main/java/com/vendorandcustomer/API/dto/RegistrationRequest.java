package com.vendorandcustomer.API.dto;

import com.vendorandcustomer.API.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegistrationRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    // Role is optional now
    private User.Role role;

    public User toUser() {
        return User.builder()
                .name(this.name)
                .email(this.email)
                .password(this.password)
               .role(this.role) // will be null if not provided
                .build();
    }
}
