package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.dto.DisasterAlertDTO;
import com.klef.fsd.sdp.model.Task;
import com.klef.fsd.sdp.model.User;

import java.util.List;

public interface AdminService {
  List<User> getAllUsers();
  void createDisasterAlert(DisasterAlertDTO alertDTO);
  void assignTask(Task task);
  List<Task> getAllTasks();
}