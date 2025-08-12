package com.vendorandcustomer.API.Service;

import com.vendorandcustomer.API.dto.UserRequest;
import com.vendorandcustomer.API.model.User;
import com.vendorandcustomer.API.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static ch.qos.logback.core.util.StringUtil.isNullOrEmpty;

@Service
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public User addUser(UserRequest user) {
        if (isNullOrEmpty(user.getEmail()) ||
                isNullOrEmpty(user.getPassword()) ||
                isNullOrEmpty(user.getName())) {
        throw new IllegalArgumentException("All fields must be filled out.");
        }
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("A user with this email already exists.");
        }
        User saveUser = User.builder()
                .email(user.getEmail())
                .name(user.getName())//
                .password(passwordEncoder.encode(user.getPassword()))
                .role(User.Role.CUSTOMER)
                .build();

        return repository.save(saveUser);
    }

    public User updateUser(String email, User updatedUser) {
        return repository.findByEmail(email)
                .map(existingUser -> {
                    existingUser.setName(updatedUser.getName());
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));

                    return repository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + email));
    }

    public void deleteEmail(String email) {
        if (!repository.existsByEmail(email)) {
            throw new RuntimeException("User not found with email: " + email);
        }
        repository.deleteByEmail(email);
    }


}