package com.klef.fsd.sdp.dto;

public class DisasterAlertDTO 
{
  private String title;
  private String description;
  private String location;
  private double latitude;
  private double longitude;

  public String getTitle() 
  { 
	  return title; 
  }
  public void setTitle(String title)
  { 
	  this.title = title; 
  }
  public String getDescription() 
  { 
	  return description; 
 }
  public void setDescription(String description) { this.description = description; }
  public String getLocation() { return location; }
  public void setLocation(String location) { this.location = location; }
  public double getLatitude() { return latitude; }
  public void setLatitude(double latitude) { this.latitude = latitude; }
  public double getLongitude() { return longitude; }
  public void setLongitude(double longitude) { this.longitude = longitude; }
}