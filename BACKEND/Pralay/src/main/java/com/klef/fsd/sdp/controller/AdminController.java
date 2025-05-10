package com.klef.fsd.sdp.controller;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.Task;
import com.klef.fsd.sdp.model.User;
import com.klef.fsd.sdp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdminController {
  @Autowired
  private AdminService adminService;

  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers() 
  {
    return ResponseEntity.ok(adminService.getAllUsers());
  }

  @GetMapping("/tasks")
  public ResponseEntity<List<Task>> getAllTasks() 
  {
    return ResponseEntity.ok(adminService.getAllTasks());
  }

  @PostMapping("/alerts")
  public ResponseEntity<String> createAlert(@RequestBody DisasterAlert alert) {
    adminService.createAlert(alert);
    return ResponseEntity.ok("Alert Created Successfully! 🚨");
  }
}