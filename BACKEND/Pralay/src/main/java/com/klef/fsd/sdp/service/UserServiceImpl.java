package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.SOSRequest;
import com.klef.fsd.sdp.repository.DisasterAlertRepository;
import com.klef.fsd.sdp.repository.SOSRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService 
{
  @Autowired
  private DisasterAlertRepository disasterAlertRepository;
  @Autowired
  private SOSRequestRepository sosRequestRepository;

  @Override
  public List<DisasterAlert> getNearbyAlerts(double latitude, double longitude) 
  {
    double radius = 100.0; 
    return disasterAlertRepository.findAll().stream()
        .filter(alert -> calculateDistance(latitude, longitude, alert.getLatitude(), alert.getLongitude()) <= radius)
        .collect(Collectors.toList());
  }

  @Override
  public void sendSOS(SOSRequest request) 
  {
    request.setTimestamp(LocalDateTime.now());
    sosRequestRepository.save(request);
  }

  @Override
  public void reportDisaster(DisasterAlert disasterAlert) 
  {
    disasterAlert.setTimestamp(LocalDateTime.now());
    disasterAlertRepository.save(disasterAlert);
  }

  private double calculateDistance(double lat1, double lon1, double lat2, double lon2)
  {
    
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