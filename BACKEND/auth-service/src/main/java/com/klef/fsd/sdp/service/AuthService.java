package com.klef.fsd.sdp.service;

import com.klef.fsd.sdp.dto.ForgotPasswordRequest;
import com.klef.fsd.sdp.dto.LoginRequest;
import com.klef.fsd.sdp.dto.RegisterRequest;

public interface AuthService
{
  String registerUser(RegisterRequest request);
  String loginUser(LoginRequest request);
  String forgotPassword(ForgotPasswordRequest request);
}