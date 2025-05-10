package com.klef.fsd.sdp.controller;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.SOSRequest;
import com.klef.fsd.sdp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController 
{
  @Autowired
  private UserService userService;

  @GetMapping("/alerts")
  public ResponseEntity<List<DisasterAlert>> getNearbyAlerts(@RequestParam double latitude, @RequestParam double longitude) 
  {
    return ResponseEntity.ok(userService.getNearbyAlerts(latitude, longitude));
  }

  @PostMapping("/sos")
  public ResponseEntity<String> sendSOS(@RequestBody SOSRequest request) 
  {
    userService.sendSOS(request);
    return ResponseEntity.ok("SOS Request Sent! 🆘");
  }

  @PostMapping("/report-disaster")
  public ResponseEntity<String> reportDisaster(@RequestBody DisasterAlert disasterAlert) 
  {
    userService.reportDisaster(disasterAlert);
    return ResponseEntity.ok("Disaster Reported Successfully! 🚨");
  }
}