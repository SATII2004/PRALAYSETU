package com.klef.fsd.sdp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Volunteer {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String username;
  private boolean available;

  public Long getId() 
  {
	  return id;
	  }
  public void setId(Long id)
  {
	  this.id = id;
	  }
  public String getUsername()
  { 
	  return username;
  }
  public void setUsername(String username)
  {
	  this.username = username;
  }
  public boolean isAvailable() 
  { return available;
  }
  public void setAvailable(boolean available) 
  {
	  this.available = available;
	  }
}