package com.klef.fsd.sdp.repository;

import com.klef.fsd.sdp.model.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {
  Volunteer findByUsername(String username);
}