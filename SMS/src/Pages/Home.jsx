// Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Services from "../components/Services";
import logo from "../Images/Logo.png";
import "../Styling/Home.css"

const Home = () => {
    const navigate = useNavigate();
    
    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleExploreServicesClick = () => {
        // Smoothly scroll to the "Our Services" section
        document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' });
    };

    // Note: handleViewStudentsClick is now redundant since the 'cards' section is removed/commented out.

    return (
        <div className="container">
            <div className="HBG">
                {/* <Navbar /> */}

                <main className="content">
                    <h1>Welcome to Classmate</h1>
                    <p>
                        Welcome to the ClassMate. A Student Management System, simple and easy-to-use platform for handling student information.
                        For more details contact us at <u>class.mate@gmail.com</u>.
                    </p>

                    <div className="btn_Container">
                        {/* 1. Register Button */}
                        <button style={{fontSize:"18px"}} className="btn" onClick={handleRegisterClick}>
                            Register NOW!
                        </button>
                        
                        {/* 2. New Explore Services Button */}
                        <button 
                            style={{ 
                                fontSize:"20px", 
                            }} 
                            className="btn" 
                            onClick={handleExploreServicesClick}
                        >
                            Our Services
                        </button>
                    </div>

                 

                    {/* The entire 'cards' section remains commented out/removed from rendering */}

                    <div className="ourServices" id="services-section">
                        <h1 style={{ marginTop: "400px"}}>Our Services</h1>
                        <Services />
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default Home;