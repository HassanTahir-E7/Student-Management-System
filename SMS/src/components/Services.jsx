import React from "react";
import "./components.css";
import imgC from "../Images/Courses.png"
import imgE from "../Images/Exam.png"
import imgA from "../Images/Attendance.png"
import imgT from "../Images/TimeTable.webp"
import imgCL from "../Images/Calcuclator.webp"


const Services = () => {
    return (
        <div className="our_Services">
            <p className="Services"><img src={imgC} alt="" />  Our Courses</p>
            <p className="Services"><img src={imgE} alt="" />Upcoming Exams</p>
            <p className="Services"><img src={imgA} alt="" />Attendance Management</p>
            <p className="Services"><img src={imgT} alt="" />Time Table Management</p>
            <p className="Services"><img src={imgCL} alt="" />GPA Calculator</p>
        </div>

    );
};

export default Services;
