package com.vendorandcustomer.API.controller;

import com.vendorandcustomer.API.Service.UserService;
import com.vendorandcustomer.API.dto.UserRequest;
import com.vendorandcustomer.API.model.User;
import org.springframework.web.bind.annotation.*;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;

    public UserController(UserService service){
        this.service = service;
    }

    @PostMapping
    public User addUser(@RequestBody UserRequest user){
        return service.addUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        service.deleteId(id);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String name, @RequestBody User user){
        return service.updateUser(name, user);
    }

}
