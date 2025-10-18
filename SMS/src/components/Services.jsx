// Services.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // ⬅️ NEW: Import useNavigate
import "./Services.css"; 
import imgC from "../Images/Courses.png"
import imgE from "../Images/Exam.png"
import imgA from "../Images/Attendance.png"
import imgCL from "../Images/Calcuclator.webp"


const Services = () => {
    const navigate = useNavigate(); // ⬅️ NEW: Initialize navigate

    return (
        <div style={{marginTop:'20px'}} className="our_Services">
            {/* 🎯 LINKED: Our Courses -> /subjects */}
            <p 
                className="Services clickable-service" 
                onClick={() => navigate('/subjects')}
            >
                <img src={imgC} alt="Courses icon" />  Our Courses
            </p>

            <p className="Services"><img src={imgE} alt="Exams icon" />Upcoming Exams</p>
            <p className="Services"><img src={imgA} alt="Attendance icon" />Attendance Management</p>

            {/* 🎯 LINKED: CGPA Calculator -> /cgpa */}
            <p 
                className="Services clickable-service" 
                onClick={() => navigate('/cgpa')}
            >
                <img src={imgCL} alt="Calculator icon" />CGPA Calculator
            </p> 
        </div>
    );
};

export default Services;