// Navbar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"; 
import logo from "../Images/Logo.png";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the authentication flag from localStorage
        localStorage.removeItem('isAuthenticated');
        
        alert('You have been logged out.');
        
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                {/* Logo Section */}
                <li>
                    <img 
                        style={{ height: "35px", width: "75px", display: "block", marginTop: "0" }} 
                        src={logo} 
                        alt="Logo" 
                    />
                </li>

                {/* Requested Links: Home, Students, About, Contact */}
                <li>
                    <NavLink 
                        to="/" 
                        end 
                        className={({ isActive }) => (isActive ? "active" : "")}
                    > 
                        Home 
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/students"
                        className={({ isActive }) => (isActive ? "active" : "")} 
                    > 
                        Students
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/about" 
                        className={({ isActive }) => (isActive ? "active" : "")}
                    > 
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contact" 
                        className={({ isActive }) => (isActive ? "active" : "")} 
                    > 
                        Contact 
                    </NavLink>
                </li>
            </ul>

            {/* Logout Button on the top right */}
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;