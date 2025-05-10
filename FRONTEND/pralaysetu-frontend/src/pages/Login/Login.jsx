import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./login.css";

function Login() {
  const [role, setRole] = useState("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.role === "USER") navigate("/user-dashboard");
      else if (data.role === "VOLUNTEER") navigate("/volunteer-dashboard");
      else if (data.role === "ADMIN") navigate("/admin-dashboard");
    } else {
      alert("Login failed!");
    }
  };

  const handleForgotPassword = async () => {
    // Simulate sending OTP by checking email (replace with actual API call)
    const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: registeredEmail }),
    });
    if (response.ok) {
      setOtpSent(true);
      alert("OTP sent to your registered email.");
    } else {
      alert("Email not registered.");
    }
  };

  const handleResetPassword = async () => {
    // Simulate OTP verification and password reset (replace with actual API call)
    const response = await fetch("http://localhost:8080/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: registeredEmail, otp, newPassword }),
    });
    if (response.ok) {
      alert("Password Reset Successful!");
      setShowForgotPassword(false);
      setOtpSent(false);
      setOtp("");
      setNewPassword("");
      setRegisteredEmail("");
    } else {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <div className="login-form-container">
        {showForgotPassword && (
          <div className="forgot-password-modal">
            <div className="modal-content">
              {!otpSent ? (
                <>
                  <h3>Forgot Password</h3>
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={registeredEmail}
                    onChange={(e) => setRegisteredEmail(e.target.value)}
                    required
                  />
                  <button onClick={handleForgotPassword}>Send OTP</button>
                  <button onClick={() => setShowForgotPassword(false)}>Close</button>
                </>
              ) : (
                <>
                  <h3>Enter OTP</h3>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button onClick={handleResetPassword}>Reset Password</button>
                  <button onClick={() => setShowForgotPassword(false)}>Close</button>
                </>
              )}
            </div>
          </div>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <h2>Welcome to PralaySetu</h2>
          <p>Login to your account</p>

          <div className="role-selection">
            <label className={role === "USER" ? "selected" : ""}>
              <input
                type="radio"
                name="role"
                value="USER"
                checked={role === "USER"}
                onChange={() => setRole("USER")}
              />
              User
            </label>
            <label className={role === "VOLUNTEER" ? "selected" : ""}>
              <input
                type="radio"
                name="role"
                value="VOLUNTEER"
                checked={role === "VOLUNTEER"}
                onChange={() => setRole("VOLUNTEER")}
              />
              Volunteer
            </label>
            <label className={role === "ADMIN" ? "selected" : ""}>
              <input
                type="radio"
                name="role"
                value="ADMIN"
                checked={role === "ADMIN"}
                onChange={() => setRole("ADMIN")}
              />
              Admin
            </label>
          </div>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>

          <div className="login-links">
            <a href="#" onClick={() => setShowForgotPassword(true)}>
              Forgot Password?
            </a>
            <span>|</span>
            <a href="#" onClick={() => navigate("/signup")}>
              New User? Sign Up
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;