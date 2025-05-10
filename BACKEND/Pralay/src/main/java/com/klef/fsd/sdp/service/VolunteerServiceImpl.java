package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.SOSRequest;
import com.klef.fsd.sdp.model.Volunteer;
import com.klef.fsd.sdp.repository.DisasterAlertRepository;
import com.klef.fsd.sdp.repository.SOSRequestRepository;
import com.klef.fsd.sdp.repository.VolunteerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VolunteerServiceImpl implements VolunteerService {
  @Autowired
  private DisasterAlertRepository alertRepository;
  @Autowired
  private SOSRequestRepository sosRepository;
  @Autowired
  private VolunteerRepository volunteerRepository;

  @Override
  public List<DisasterAlert> getNearbyAlerts(double latitude, double longitude) {
    List<DisasterAlert> alerts = alertRepository.findAll();
    return alerts.stream()
        .filter(alert -> calculateDistance(latitude, longitude, alert.getLatitude(), alert.getLongitude()) <= 100)
        .collect(Collectors.toList());
  }

  @Override
  public List<SOSRequest> getSOSRequests() {
    return sosRepository.findAll();
  }

  @Override
  public void updateAvailability(String username, boolean available) {
    Volunteer volunteer = volunteerRepository.findByUsername(username);
    if (volunteer != null) {
      volunteer.setAvailable(available);
      volunteerRepository.save(volunteer);
    }
  }

  private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
    double latDiff = Math.toRadians(lat2 - lat1);
    double lonDiff = Math.toRadians(lon2 - lon1);
    double a = Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
               Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
               Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
    double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return 6371 * c; // Earth radius in km
  }
}