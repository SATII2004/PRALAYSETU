package com.klef.fsd.project.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.klef.fsd.project.model.Role;
import com.klef.fsd.project.model.User;
import com.klef.fsd.project.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Value("${admin.email}")
    private String adminEmail;

    @Value("${admin.password}")
    private String adminPassword;

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            try {
                if (!userRepository.existsByEmail(adminEmail)) {
                    User admin = new User();
                    admin.setEmail(adminEmail);
                    admin.setPassword(passwordEncoder.encode(adminPassword));
                    admin.setName("Default Admin");
                    admin.setRole(Role.ADMIN);
                    userRepository.save(admin);
                    System.out.println("Default admin user created: " + adminEmail + " / " + adminPassword);
                } else {
                    System.out.println("Default admin user already exists: " + adminEmail);
                }
            } catch (Exception e) {
                System.err.println("Failed to create default admin user: " + e.getMessage());
                e.printStackTrace();
            }
        };
    }
}