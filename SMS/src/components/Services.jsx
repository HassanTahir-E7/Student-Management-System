import React from "react";
import { useNavigate } from "react-router-dom";
import "./Services.css"; 
import imgC from "../Images/Courses.png"
import imgE from "../Images/Exam.png"
import imgA from "../Images/Attendance.png"
import imgCL from "../Images/Calcuclator.webp"

const Services = () => {
    const navigate = useNavigate();

    return (
        <div className="our_Services" >
            
            <div 
                className="Services clickable-service" 
                onClick={() => navigate('/courses')}
            >
                <img src={imgC} alt="Courses icon" />
                <span>Our Courses</span>
            </div>

           
            <div className="Services clickable-service"
            onClick={() => navigate('/exams')}>
                <img src={imgE} alt="Exams icon" />
                <span>Upcoming Exams</span>
            </div>

          
            <div className="Services">
                <img src={imgA} alt="Attendance icon" />
                <span>Attendance Management</span>
            </div>

            
            <div 
                className="Services clickable-service" 
                onClick={() => navigate('/cgpa')}
            >
                <img src={imgCL} alt="Calculator icon" />
                <span>CGPA Calculator</span>
            </div> 
        </div>
    );
};

export default Services;