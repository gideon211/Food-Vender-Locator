package com.vendorandcustomer.API.controller;

import com.vendorandcustomer.API.config.JwtService;
import com.vendorandcustomer.API.model.User;
import com.vendorandcustomer.API.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody User request) {
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        request.setRole(User.Role.CUSTOMER);
        userRepository.save(request);
        return "User registered!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                )
        );
        return jwtService.generateToken(request.getEmail());
    }

    @PostMapping("/logout")
    public String logout() {
        return "Logout initiated - handled by LogoutHandler";
    }
}