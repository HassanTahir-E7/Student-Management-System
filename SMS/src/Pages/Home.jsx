import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Services from "../components/Services";
import logo from "../Images/Logo.png";
import lightlogo from "../Images/CML4.png";
import "../Styling/Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleExploreServicesClick = () => {
    document.getElementById('services-section').scrollIntoView({ behavior:'smooth' });
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="HBG">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>

          <main className="content">
            <img src={lightlogo} alt="Classmate Logo" className="cmLogo" />
            <h1>Welcome to Classmate</h1>
            <p>
              Welcome to the ClassMate. A Student Management System, simple and easy-to-use platform for handling student information.
              For more details contact us at <u>class.mate@gmail.com</u>.
            </p>

            <div className="btn_Container">
              <button className="btn" onClick={handleRegisterClick}>
                Register NOW!
              </button>
              <button className="btn" onClick={handleExploreServicesClick}>
                Our Services
              </button>
            </div>

            <div className="ourServices" id="services-section" style={{marginBottom:'7rem'}}>
              <h1>Our Services</h1>
              <Services />
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
