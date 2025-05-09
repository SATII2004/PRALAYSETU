import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password, role });
    if (role === "user") navigate("/user-dashboard");
    else if (role === "volunteer") navigate("/volunteer-dashboard");
    else if (role === "admin") navigate("/admin-dashboard");
  };

  const handleForgotPassword = () => {
    if (registeredEmail === "example@gmail.com") {
      setOtpSent(true);
      alert("OTP sent to your registered email.");
    } else {
      alert("Email not registered.");
    }
  };

  const handleResetPassword = () => {
    if (otp === "123456") {
      alert("Password Reset Successful!");
      setShowForgotPassword(false);
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