package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.dto.DisasterAlertDTO;
import com.klef.fsd.sdp.model.DisasterAlert;
import com.klef.fsd.sdp.model.Task;
import com.klef.fsd.sdp.model.User;
import com.klef.fsd.sdp.repository.DisasterAlertRepository;
import com.klef.fsd.sdp.repository.TaskRepository;
import com.klef.fsd.sdp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private DisasterAlertRepository alertRepository;
  @Autowired
  private TaskRepository taskRepository;

  @Override
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public void createDisasterAlert(DisasterAlertDTO alertDTO) {
    DisasterAlert alert = new DisasterAlert();
    alert.setTitle(alertDTO.getTitle());
    alert.setDescription(alertDTO.getDescription());
    alert.setLocation(alertDTO.getLocation());
    alert.setLatitude(alertDTO.getLatitude());
    alert.setLongitude(alertDTO.getLongitude());
    alertRepository.save(alert);
  }

  @Override
  public void assignTask(Task task) {
    task.setStatus("ASSIGNED");
    taskRepository.save(task);
  }

  @Override
  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }
}