package com.klef.fsd.sdp.repository;

import com.klef.fsd.sdp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByUsername(String username);
  User findByEmail(String email);
}