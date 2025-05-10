package com.klef.fsd.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.fsd.project.model.Otp;

@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {
    Otp findByEmailAndOtp(String email, String otp);
}