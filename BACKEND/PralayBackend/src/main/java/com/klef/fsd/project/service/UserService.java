package com.klef.fsd.project.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.klef.fsd.project.dto.UserDTO;
import com.klef.fsd.project.exception.BadRequestException;
import com.klef.fsd.project.exception.ResourceNotFoundException;
import com.klef.fsd.project.model.Otp;
import com.klef.fsd.project.model.Role;
import com.klef.fsd.project.model.User;
import com.klef.fsd.project.repository.OtpRepository;
import com.klef.fsd.project.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final OtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, OtpRepository otpRepository, 
                       PasswordEncoder passwordEncoder, EmailService emailService) {
        this.userRepository = userRepository;
        this.otpRepository = otpRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public User signup(UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new BadRequestException("Email already exists.");
        }

        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setName(userDTO.getName());
        user.setRole(Role.valueOf(userDTO.getRole() != null ? userDTO.getRole() : "USER"));
        return userRepository.save(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    public User updateUser(UserDTO userDTO) {
        User user = findByEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        return userRepository.save(user);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserRole(Long id, Role role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        user.setRole(role);
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        userRepository.delete(user);
    }

    public void sendOtpForPasswordReset(String email) {
        User user = findByEmail(email);
        String otp = generateOtp();
        LocalDateTime now = LocalDateTime.now();
        Otp otpEntity = new Otp();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setCreatedAt(now);
        otpEntity.setExpiresAt(now.plusMinutes(10));
        otpRepository.save(otpEntity);
        emailService.sendOtpEmail(email, otp);
    }

    public void resetPassword(String email, String otp, String newPassword) {
        Otp otpEntity = otpRepository.findByEmailAndOtp(email, otp)
                .orElseThrow(() -> new BadRequestException("Invalid OTP or email."));
        if (otpEntity.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP has expired.");
        }
        User user = findByEmail(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        otpRepository.delete(otpEntity);
    }

    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }
}