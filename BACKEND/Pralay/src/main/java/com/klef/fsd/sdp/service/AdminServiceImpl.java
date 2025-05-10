package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.Task;
import com.klef.fsd.sdp.model.User;
import com.klef.fsd.sdp.repository.DisasterAlertRepository;
import com.klef.fsd.sdp.repository.TaskRepository;
import com.klef.fsd.sdp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService
{
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private TaskRepository taskRepository;
  @Autowired
  private DisasterAlertRepository disasterAlertRepository;

  @Override
  public List<User> getAllUsers() 
  {
    return userRepository.findAll();
  }

  @Override
  public List<Task> getAllTasks()
  {
    return taskRepository.findAll();
  }

  @Override
  public void createAlert(DisasterAlert alert)
  {
    alert.setTimestamp(LocalDateTime.now());
    disasterAlertRepository.save(alert);
  }
}