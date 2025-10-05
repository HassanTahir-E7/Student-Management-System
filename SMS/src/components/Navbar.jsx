import React from "react";
import { NavLink } from "react-router-dom";
import "./components.css";
import logo from "../Images/Logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <img style={{ height: "35px", width: "75px", display: "block",   marginTop: "0",}}  src={logo} alt="Logo"  />
        </li>
        <li>
          <NavLink  to="/" end className={({ isActive }) => (isActive ? "active" : "")}> Home </NavLink>
        </li>
        <li>
          <NavLink to="/students"className={({ isActive }) => (isActive ? "active" : "")} > Students</NavLink>
        </li>
        <li>
          <NavLink to="/courses"className={({ isActive }) => (isActive ? "active" : "")} > Courses </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}> About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
