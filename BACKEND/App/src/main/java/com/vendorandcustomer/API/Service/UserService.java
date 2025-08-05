package com.vendorandcustomer.API.Service;

import com.vendorandcustomer.API.dto.UserRequest;
import com.vendorandcustomer.API.model.User;
import com.vendorandcustomer.API.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public User addUser(UserRequest user) {
        User saveUser = User.builder()
                .email(user.getEmail())
                .name(user.getName())//
                .password(passwordEncoder.encode(user.getPassword()))
                .role(User.Role.CUSTOMER)
                .build();

        return repository.save(saveUser);
    }

    public User updateUser(Long id, User updatedUser) {
        return repository.findById(id)
                .map(existingUser -> {
                    existingUser.setName(updatedUser.getName());
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword())); // ✅ Encode password

                    return repository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public void deleteId(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        repository.deleteById(id);
    }
}