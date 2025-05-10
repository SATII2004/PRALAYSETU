package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.SOSRequest;
import java.util.List;

public interface VolunteerService {
  List<DisasterAlert> getNearbyAlerts(double latitude, double longitude);
  List<SOSRequest> getSOSRequests();
  void setAvailability(String username, boolean available);
}