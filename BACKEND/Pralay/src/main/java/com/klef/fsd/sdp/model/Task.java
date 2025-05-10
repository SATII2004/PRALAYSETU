package com.klef.fsd.sdp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String volunteerUsername;
  private String description;

  // Getters and Setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getVolunteerUsername() { return volunteerUsername; }
  public void setVolunteerUsername(String volunteerUsername) { this.volunteerUsername = volunteerUsername; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
}