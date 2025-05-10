package com.klef.fsd.sdp.repository;

import com.klef.fsd.sdp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}