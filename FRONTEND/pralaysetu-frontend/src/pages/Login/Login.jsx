import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = ({ setUserRole }) => {
  const [role, setRole] = useState("user");
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
    const username = email.split("@")[0];
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        { username, password },
        {
          headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
          },
        }
      );
      alert(response.data);
      localStorage.setItem("userRole", role);
      localStorage.setItem("authHeader", "Basic " + btoa(`${username}:${password}`));
      setUserRole(role);
      if (role === "user") navigate("/user-dashboard");
      else if (role === "volunteer") navigate("/volunteer-dashboard");
      else if (role === "admin") navigate("/admin-dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed! Please check your credentials.");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post("http://localhost:5000/auth/forgot-password", {
        email: registeredEmail,
        newPassword: "tempPassword",
      });
      setOtpSent(true);
      alert("OTP sent to your registered email. (For demo, OTP is 123456)");
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Email not registered.");
    }
  };

  const handleResetPassword = async () => {
    if (otp === "123456") {
      try {
        await axios.post("http://localhost:5000/auth/forgot-password", {
          email: registeredEmail,
          newPassword,
        });
        alert("Password Reset Successful!");
        setShowForgotPassword(false);
        setOtpSent(false);
      } catch (error) {
        console.error("Reset password error:", error);
        alert("Failed to reset password.");
      }
    } else {
      alert("Invalid OTP!");
    }
  };

  return (
    <div className="login-container">
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
          <label className={role === "user" ? "selected" : ""}>
            <input type="radio" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} /> User
          </label>
          <label className={role === "volunteer" ? "selected" : ""}>
            <input type="radio" name="role" value="volunteer" checked={role === "volunteer"} onChange={() => setRole("volunteer")} /> Volunteer
          </label>
          <label className={role === "admin" ? "selected" : ""}>
            <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} /> Admin
          </label>
        </div>

        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        
        <div className="login-links">
          <a href="#" onClick={() => setShowForgotPassword(true)}>Forgot Password?</a>
          <span>|</span>
          <a href="#" onClick={() => navigate("/signup")}>New User? Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;