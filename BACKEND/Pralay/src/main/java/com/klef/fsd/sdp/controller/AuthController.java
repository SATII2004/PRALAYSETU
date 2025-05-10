package com.klef.fsd.sdp.controller;

import com.klef.fsd.sdp.dto.ForgotPasswordRequest;
import com.klef.fsd.sdp.dto.LoginRequest;
import com.klef.fsd.sdp.dto.RegisterRequest;
import com.klef.fsd.sdp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
  @Autowired
  private AuthService authService;

  @PostMapping("/register")
  public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
    return ResponseEntity.ok(authService.registerUser(request));
  }

  @PostMapping("/login")
  public ResponseEntity<String> loginUser(@RequestBody LoginRequest request) {
    return ResponseEntity.ok(authService.loginUser(request));
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
    return ResponseEntity.ok(authService.forgotPassword(request));
  }
}