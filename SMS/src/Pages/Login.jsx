import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styling/Login.css";
import logo from "../Images/Logo.png";
import bg from "../Images/LS_Background.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  // 🔹 Handle Login
  const handleLogin = (e) => {
    e.preventDefault();

    const storedAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    const matchedAdmin = storedAdmins.find(
      (admin) => admin.email === email && admin.password === password
    );

    if (matchedAdmin) {
      showPopup(`Welcome, ${matchedAdmin.name || "Admin"}!`, "success");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentAdmin", JSON.stringify(matchedAdmin));
      setTimeout(() => navigate("/home"), 1500);
    } else {
      showPopup("Invalid email or password. Please try again.", "error");
    }
  };

  // 🔹 Popup message
  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });
    setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2000);
  };

  // 🔹 Handle Reset Password
  const handleResetPassword = () => {
    const storedAdmins = JSON.parse(localStorage.getItem("admins")) || [];
    const admin = storedAdmins.find((a) => a.email === resetEmail);

    if (!admin) {
      showPopup("No admin found with this email.", "error");
      return;
    }

    if (!newPassword || newPassword.trim() === "") {
      showPopup("Please enter a new password.", "error");
      return;
    }

    const updatedAdmins = storedAdmins.map((a) =>
      a.email === resetEmail ? { ...a, password: newPassword } : a
    );

    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    showPopup("Password reset successful!", "success");

    // Reset fields and close modal
    setShowReset(false);
    setResetEmail("");
    setNewPassword("");
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* 🔹 Popup Message */}
      {popup.show && (
        <div className={`popup-message ${popup.type}`}>{popup.message}</div>
      )}

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <h2>Admin Login</h2>
        </div>

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

        <p className="forgot-password" onClick={() => setShowReset(true)}>
          Forgot Password?
        </p>

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>

      {/* 🔹 Reset Password Modal */}
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

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />

            <div className="reset-actions">
              <button onClick={handleResetPassword} className="reset-btn">
                Reset
              </button>
              <button
                onClick={() => {
                  setShowReset(false);
                  setResetEmail("");
                  setNewPassword("");
                }}
                className="cancel-btn"
              >
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
