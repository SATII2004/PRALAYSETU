package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.dto.ForgotPasswordRequest;
import com.klef.fsd.sdp.dto.LoginRequest;
import com.klef.fsd.sdp.dto.RegisterRequest;
import com.klef.fsd.sdp.model.User;
import com.klef.fsd.sdp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
  @Autowired
  private UserRepository userRepository;

  @Override
  public String registerUser(RegisterRequest request) {
    if (userRepository.existsById(request.getUsername())) {
      return "Username already exists!";
    }
    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(request.getPassword());
    user.setRole(request.getRole());
    user.setEmail(request.getEmail());
    user.setAddress(request.getAddress());
    user.setLatitude(request.getLatitude());
    user.setLongitude(request.getLongitude());
    userRepository.save(user);
    return "Registration Successful! 🎉";
  }

  @Override
  public String loginUser(LoginRequest request) {
    User user = userRepository.findById(request.getUsername()).orElse(null);
    if (user == null || !user.getPassword().equals(request.getPassword())) {
      return "Invalid username or password!";
    }
    return "Login Successful! Welcome " + user.getRole() + "!";
  }

  @Override
  public String forgotPassword(ForgotPasswordRequest request) {
    User user = userRepository.findByEmail(request.getEmail());
    if (user == null) {
      return "Email not registered!";
    }
    user.setPassword(request.getNewPassword());
    userRepository.save(user);
    return "Password Reset Successful!";
  }
}