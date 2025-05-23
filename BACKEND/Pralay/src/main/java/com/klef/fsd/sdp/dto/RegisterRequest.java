package com.klef.fsd.sdp.dto;

public class RegisterRequest {
  private String username;
  private String password;
  private String role;
  private String email;
  private String address;
  private double latitude;
  private double longitude;

  public String getUsername() { return username; }
  public void setUsername(String username) { this.username = username; }
  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }
  public String getRole() { return role; }
  public void setRole(String role) { this.role = role; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public double getLatitude() { return latitude; }
  public void setLatitude(double latitude) { this.latitude = latitude; }
  public double getLongitude() { return longitude; }
  public void setLongitude(double longitude) { this.longitude = longitude; }
}