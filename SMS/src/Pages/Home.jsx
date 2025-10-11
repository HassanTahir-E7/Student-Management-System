import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Services from "../components/Services";
import logo from "../Images/Logo.png";
import "../Home.css"

const Home = () => {
    const navigate = useNavigate();
    
    const students = [
        {
            name: "Husnain Rehman",
            rollNo: "L1S23BSCS0023",
            course: "Artificial Intelligence",
            dept: "Computer Science",
        },
        {
            name: "Muhammad Hamid",
            rollNo: "L1S23BSCS0015",
            course: "Discrete Structures",
            dept: "Computer Science",
        },
        {
            name: "Ibrahim Nadeem",
            rollNo: "L1S23BSCS0007",
            course: "Cloud Computing",
            dept: "Computer Science",
        },
        {
            name: "Murtaza Babar",
            rollNo: "L1S23BSCS0060",
            course: "Data Science",
            dept: "Computer Science",
        },
        {
            name: "Muahmmad Alishan",
            rollNo: "L1S23BSCS0050",
            course: "UI/UX Design",
            dept: "Computer Science",
        },
    ];

    const handleExploreClick = () => {
        navigate('/about');
    };

    const handleCardClick = () => {
        navigate('/students');
    };

    return (
        <div className="container">
            <div className="HBG">
                <Navbar />

                <main className="content">
                    <h1>Welcome to ClassMate</h1>
                    <p>
                        Welcome to the ClassMate. A Student Management System, simple and easy-to-use platform for handling student information.
                        For more details contact us at <u>class.mate@gmail.com</u>.
                    </p>

                    <div className="btn_Container">
                        <button className="btn" onClick={handleExploreClick}>
                            Explore more
                        </button>
                    </div>

                    <h1
                        style={{
                            color: "black",
                            textAlign: "center",
                            fontWeight: "bold",
                            marginTop: "200px",
                            marginBottom: "0px",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                        }}
                    >
                        High Achievers
                    </h1>

                    <div className="cards">
                        {students.map((student, index) => (
                            <div 
                                key={index}
                                onClick={handleCardClick}
                                style={{ cursor: 'pointer' }}
                            >
                                <Card
                                    name={student.name}
                                    rollNo={student.rollNo}
                                    course={student.course}
                                    dept={student.dept}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="ourServices">
                        <h1 style={{ marginTop: "50px" }}>Our Services</h1>
                        <Services />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Home;