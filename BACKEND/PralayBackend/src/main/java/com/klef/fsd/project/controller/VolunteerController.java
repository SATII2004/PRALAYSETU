package com.klef.fsd.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/volunteer")
@PreAuthorize("hasRole('VOLUNTEER')")
public class VolunteerController {

    @GetMapping("/tasks")
    public ResponseEntity<String> getVolunteerTasks() {
        return ResponseEntity.ok("Volunteer Tasks: Assist in disaster response, coordinate relief efforts.");
    }

    @PostMapping("/task/complete")
    public ResponseEntity<String> completeTask(@RequestParam String taskId) {
        return ResponseEntity.ok("Task " + taskId + " marked as completed.");
    }

    @GetMapping("/profile")
    public ResponseEntity<String> getVolunteerProfile() {
        return ResponseEntity.ok("Volunteer Profile: Access your volunteer details here.");
    }
}