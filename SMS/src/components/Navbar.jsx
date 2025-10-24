import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../Images/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentAdmin");

    // Show popup
    setPopup(true);

    // Hide popup after 2 seconds and redirect
    setTimeout(() => {
      setPopup(false);
      navigate("/login");
    }, 1800);
  };

  return (
    <>
      {/* 🔹 Popup Message */}
      {popup && (
        <div className="popup-message success">
          You have been logged out successfully!
        </div>
      )}

      <nav className="navbar">
        <ul className="nav-links">
          {/* Logo */}
          <li>
            <img
              style={{
                height: "35px",
                width: "75px",
                display: "block",
                marginTop: "0",
              }}
              src={logo}
              alt="Logo"
            />
          </li>

          {/* Navigation Links */}
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/students" className={({ isActive }) => (isActive ? "active" : "")}>
              Students
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </>
  );
};

export default Navbar;
