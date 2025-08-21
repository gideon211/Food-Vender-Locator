package com.vendorandcustomer.API.controller;

import com.vendorandcustomer.API.config.JwtService;
import com.vendorandcustomer.API.dto.LoginRequest;
import com.vendorandcustomer.API.dto.RegistrationRequest;
import com.vendorandcustomer.API.model.User;
import com.vendorandcustomer.API.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request) {
        try {
            // Check if email already exists
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Email already exists"));
            }

            User user = request.toUser();
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Set default role to CUSTOMER if not provided
            if (user.getRole() == null) {
                user.setRole(User.Role.CUSTOMER);
            }

            User savedUser = userRepository.save(user);

            return ResponseEntity.ok(Map.of(
                    "message", "User registered successfully!",
                    "userId", savedUser.getId(),
                    "email", savedUser.getEmail(),
                    "role", savedUser.getRole().name()
            ));

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to register user: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(), request.getPassword()
                    )
            );

            String token = jwtService.generateToken(request.getEmail());

            // Get user to return role information
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "token", token,
                    "email", request.getEmail(),
                    "role", user.getRole().name(),
                    "userId", user.getId()
            ));

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Invalid email or password"));
        }
    }

    // In AuthController or a new UserController:
    @PostMapping("/upgrade-to-vendor")
    public ResponseEntity<?> upgradeToVendor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(User.Role.VENDOR);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "message", "User upgraded to VENDOR role successfully",
                "email", userEmail,
                "role", User.Role.VENDOR.name()
        ));
    }
}