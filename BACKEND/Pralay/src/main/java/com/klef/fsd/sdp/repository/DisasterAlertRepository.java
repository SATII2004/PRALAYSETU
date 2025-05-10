package com.klef.fsd.sdp.repository;

import com.klef.fsd.sdp.model.DisasterAlert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DisasterAlertRepository extends JpaRepository<DisasterAlert, Long> {
}