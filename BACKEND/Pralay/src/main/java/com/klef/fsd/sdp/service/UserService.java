package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.SOSRequest;

import java.util.List;

public interface UserService {
  List<DisasterAlert> getNearbyAlerts(double latitude, double longitude);
  void sendSOS(SOSRequest request);
}