import React from "react";
import "./components.css";
import logo from "../Images/Logo.png";

const Navbar = () => {
  return (
    <>

      <nav className="navbar">
        <ul className="nav-links">
      <img style={{height: '35px',width :'75px', display:'block', marginTop:'0'}} src={logo} alt="Logo" />
          <li><a href="#">Home</a></li>
          <li><a href="#">Students</a></li>
          <li><a href="#">Courses</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
