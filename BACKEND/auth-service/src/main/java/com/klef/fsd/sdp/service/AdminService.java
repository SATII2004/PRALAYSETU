package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.Task;
import com.klef.fsd.sdp.model.User;
import java.util.List;

public interface AdminService
{
  List<User> getAllUsers();
  List<Task> getAllTasks();
  void createAlert(DisasterAlert alert);
}