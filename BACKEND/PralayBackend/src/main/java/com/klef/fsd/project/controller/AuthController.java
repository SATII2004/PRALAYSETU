package com.klef.fsd.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klef.fsd.project.dto.ForgotPasswordRequestDTO;
import com.klef.fsd.project.dto.UserDTO;
import com.klef.fsd.project.dto.UserResponseDTO;
import com.klef.fsd.project.model.User;
import com.klef.fsd.project.security.JwtUtil;
import com.klef.fsd.project.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponseDTO> signup(@RequestBody UserDTO userDTO) {
        User user = userService.signup(userDTO);
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new UserResponseDTO(user.getId(), user.getEmail(), user.getRole().toString(), token));
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody UserDTO userDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userService.findByEmail(userDTO.getEmail());
        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(new UserResponseDTO(user.getId(), user.getEmail(), user.getRole().toString(), token));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequestDTO requestDTO) {
        userService.sendOtpForPasswordReset(requestDTO.getEmail());
        return ResponseEntity.ok("OTP sent to your email for password reset.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @RequestParam String email,
            @RequestParam String otp,
            @RequestParam String newPassword) {
        userService.resetPassword(email, otp, newPassword);
        return ResponseEntity.ok("Password reset successfully.");
    }
}