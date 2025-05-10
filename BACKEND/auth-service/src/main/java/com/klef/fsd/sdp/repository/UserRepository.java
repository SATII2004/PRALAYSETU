package com.klef.fsd.sdp.repository;

import com.klef.fsd.sdp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
  User findByEmail(String email);
  List<User> findByRole(String role);
}