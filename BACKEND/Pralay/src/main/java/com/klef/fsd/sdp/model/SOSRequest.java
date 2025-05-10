package com.klef.fsd.sdp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class SOSRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String username;
  private String message;
  private double latitude;
  private double longitude;
  private LocalDateTime timestamp;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getUsername() { return username; }
  public void setUsername(String username) { this.username = username; }
  public String getMessage() { return message; }
  public void setMessage(String message) { this.message = message; }
  public double getLatitude() { return latitude; }
  public void setLatitude(double latitude) { this.latitude = latitude; }
  public double getLongitude() { return longitude; }
  public void setLongitude(double longitude) { this.longitude = longitude; }
  public LocalDateTime getTimestamp() { return timestamp; }
  public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}