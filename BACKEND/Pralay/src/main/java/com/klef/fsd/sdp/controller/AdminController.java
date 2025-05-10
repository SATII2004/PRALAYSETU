package com.klef.fsd.sdp.controller;

import com.klef.fsd.sdp.dto.DisasterAlertDTO;
import com.klef.fsd.sdp.model.Task;
import com.klef.fsd.sdp.model.User;
import com.klef.fsd.sdp.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
  @Autowired
  private AdminService adminService;

  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.ok(adminService.getAllUsers());
  }

  @PostMapping("/alerts")
  public ResponseEntity<String> createDisasterAlert(@RequestBody DisasterAlertDTO alertDTO) {
    adminService.createDisasterAlert(alertDTO);
    return ResponseEntity.ok("Disaster alert created! 🚨");
  }

  @PostMapping("/tasks")
  public ResponseEntity<String> assignTask(@RequestBody Task task) {
    adminService.assignTask(task);
    return ResponseEntity.ok("Task assigned! ✅");
  }

  @GetMapping("/tasks")
  public ResponseEntity<List<Task>> getAllTasks() {
    return ResponseEntity.ok(adminService.getAllTasks());
  }
}