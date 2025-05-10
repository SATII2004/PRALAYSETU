package com.klef.fsd.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.klef.fsd.project.dto.UserDTO;
import com.klef.fsd.project.model.User;
import com.klef.fsd.project.service.UserService;

@RestController
@RequestMapping("/api/user")
@PreAuthorize("hasRole('USER')")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<String> getUserDashboard() {
        return ResponseEntity.ok("Welcome to the User Dashboard!");
    }

    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getProfile(@RequestParam String email) {
        User user = userService.findByEmail(email);
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setRole(user.getRole().toString());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserDTO> updateProfile(@RequestBody UserDTO userDTO) {
        User updatedUser = userService.updateUser(userDTO);
        UserDTO responseDTO = new UserDTO();
        responseDTO.setId(updatedUser.getId());
        responseDTO.setEmail(updatedUser.getEmail());
        responseDTO.setName(updatedUser.getName());
        responseDTO.setRole(updatedUser.getRole().toString());
        return ResponseEntity.ok(responseDTO);
    }
}