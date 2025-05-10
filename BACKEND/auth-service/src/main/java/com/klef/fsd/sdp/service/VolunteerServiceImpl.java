package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.SOSRequest;
import com.klef.fsd.sdp.model.User;
import com.klef.fsd.sdp.repository.DisasterAlertRepository;
import com.klef.fsd.sdp.repository.SOSRequestRepository;
import com.klef.fsd.sdp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VolunteerServiceImpl implements VolunteerService {
  @Autowired
  private DisasterAlertRepository disasterAlertRepository;
  @Autowired
  private SOSRequestRepository sosRequestRepository;
  @Autowired
  private UserRepository userRepository;

  @Override
  public List<DisasterAlert> getNearbyAlerts(double latitude, double longitude)
  {
    double radius = 100.0; 
    return disasterAlertRepository.findAll().stream()
        .filter(alert -> calculateDistance(latitude, longitude, alert.getLatitude(), alert.getLongitude()) <= radius)
        .collect(Collectors.toList());
  }

  @Override
  public List<SOSRequest> getSOSRequests()
  {
    return sosRequestRepository.findAll();
  }

  @Override
  public void setAvailability(String username, boolean available)
  {
    User volunteer = userRepository.findById(username).orElseThrow(() -> new RuntimeException("Volunteer not found"));
    volunteer.setAvailable(available);
    userRepository.save(volunteer);
  }

  private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    double R = 6371;
    double dLat = Math.toRadians(lat2 - lat1);
    double dLon = Math.toRadians(lon2 - lon1);
    double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
               Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
               Math.sin(dLon / 2) * Math.sin(dLon / 2);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}