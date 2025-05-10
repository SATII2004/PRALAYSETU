package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.dto.ForgotPasswordRequest;
import com.klef.fsd.sdp.dto.LoginRequest;
import com.klef.fsd.sdp.dto.RegisterRequest;
import com.klef.fsd.sdp.model.User;
import com.klef.fsd.sdp.model.Volunteer;
import com.klef.fsd.sdp.repository.UserRepository;
import com.klef.fsd.sdp.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private VolunteerRepository volunteerRepository;

  @Override
  public void register(RegisterRequest request) {
    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(request.getPassword()); // In production, hash the password
    user.setRole(request.getRole());
    user.setAddress(request.getAddress());
    user.setLatitude(request.getLatitude());
    user.setLongitude(request.getLongitude());
    user.setEmail(request.getEmail());
    userRepository.save(user);

    if ("VOLUNTEER".equals(request.getRole())) {
      Volunteer volunteer = new Volunteer();
      volunteer.setUsername(request.getUsername());
      volunteer.setAvailable(true);
      volunteerRepository.save(volunteer);
    }
  }

  @Override
  public boolean login(LoginRequest request) {
    User user = userRepository.findByUsername(request.getUsername());
    return user != null && user.getPassword().equals(request.getPassword()); // In production, compare hashed passwords
  }

  @Override
  public void forgotPassword(ForgotPasswordRequest request) {
    User user = userRepository.findByEmail(request.getEmail());
    if (user != null) {
      user.setPassword(request.getNewPassword()); // In production, hash the password
      userRepository.save(user);
    }
  }
}