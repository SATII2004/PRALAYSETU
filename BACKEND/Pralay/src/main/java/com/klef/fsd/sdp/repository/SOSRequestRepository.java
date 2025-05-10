package com.klef.fsd.sdp.repository;

import com.klef.fsd.sdp.model.SOSRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SOSRequestRepository extends JpaRepository<SOSRequest, Long> {
}