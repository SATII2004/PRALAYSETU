package com.klef.fsd.sdp.controller;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.SOSRequest;
import com.klef.fsd.sdp.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/volunteer")
public class VolunteerController {
  @Autowired
  private VolunteerService volunteerService;

  @GetMapping("/alerts")
  public ResponseEntity<List<DisasterAlert>> getNearbyAlerts(@RequestParam double latitude, @RequestParam double longitude) {
    return ResponseEntity.ok(volunteerService.getNearbyAlerts(latitude, longitude));
  }

  @GetMapping("/sos-requests")
  public ResponseEntity<List<SOSRequest>> getSOSRequests() {
    return ResponseEntity.ok(volunteerService.getSOSRequests());
  }

  @PostMapping("/availability")
  public ResponseEntity<String> updateAvailability(@RequestParam String username, @RequestParam boolean available) {
    volunteerService.updateAvailability(username, available);
    return ResponseEntity.ok("Availability updated! ✅");
  }
}