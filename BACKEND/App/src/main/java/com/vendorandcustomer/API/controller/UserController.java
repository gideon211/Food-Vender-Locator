package com.vendorandcustomer.API.controller;

import com.vendorandcustomer.API.Service.UserService;
import com.vendorandcustomer.API.dto.UserLogin;
import com.vendorandcustomer.API.dto.UserRequest;
import com.vendorandcustomer.API.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;

    public UserController(UserService service){
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity <String> login(@RequestBody UserLogin user){
        return ResponseEntity.ok(service.login(user));
    }

    @PostMapping
    public ResponseEntity<Object> addUser(@RequestBody UserRequest user){
        try {
            return ResponseEntity.status(201).body(service.addUser(user));
        }catch (Exception exception){
            return ResponseEntity.status(400).body(exception.getMessage());
        }
    }

    @DeleteMapping("/{email}")
    public void deleteUser(@PathVariable String email){
        service.deleteEmail(email);
    }

    @PutMapping("/{email}")
    public User updateUser(@PathVariable String email, @RequestBody User user){
        return service.updateUser(email, user);
    }



}

