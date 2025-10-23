import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styling/Login.css";
import logo from "../Images/Logo.png";
import bg from "../Images/LS_Background.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showReset, setShowReset] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    const storedAdmins = JSON.parse(localStorage.getItem("admins")) || [];

    const matchedAdmin = storedAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (matchedAdmin) {
      alert(`Welcome, ${matchedAdmin.name || "Admin"}!`);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentAdmin", JSON.stringify(matchedAdmin));

      // ✅ Ensure navigation works
      setTimeout(() => navigate("/home"), 500);
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  // 🔹 Handle Reset Password
  const handleResetPassword = () => {
    const storedAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    const admin = storedAdmins.find((a) => a.email === resetEmail);

    if (!admin) {
      alert("No admin found with this email.");
      return;
    }

    const newPassword = prompt("Enter your new password:");
    if (newPassword && newPassword.trim() !== "") {
      const updatedAdmins = storedAdmins.map((a) =>
        a.email === resetEmail ? { ...a, password: newPassword } : a
      );
      localStorage.setItem("admins", JSON.stringify(updatedAdmins));
      alert("Password reset successful! You can now log in.");
      setShowReset(false);
      setResetEmail("");
    } else {
      alert("Password not changed.");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <form onSubmit={handleLogin} className="login-form">
        {/* 🔹 Logo + Heading */}
        <div className="form-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Admin Login</h2>
        </div>

        {/* Email */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Forgot Password */}
        <p className="forgot-password" onClick={() => setShowReset(true)}>
          Forgot Password?
        </p>

        {/* Login Button */}
        <button type="submit" className="login-btn">
          Login
        </button>

        {/* Signup Link */}
        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>

      {/* Reset Password Modal */}
      {showReset && (
        <div className="reset-overlay">
          <div className="reset-modal">
            <h3>Reset Password</h3>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />
            <div className="reset-actions">
              <button onClick={handleResetPassword} className="reset-btn">
                Reset
              </button>
              <button onClick={() => setShowReset(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
