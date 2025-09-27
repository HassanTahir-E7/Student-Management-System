import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    return(
        <div className="container">
            <Navbar/>
            <main className="content">
                <h1>Welcome to Student Management System</h1>    
                <p>
                    Welcome to the Student Management System. A simple and easy-to-use platform for handling student information. 
                    This system helps manage student details, courses, and academic records all in one place. It is designed to make
                    things easier for both students and administrators by keeping everything organized and accessible. Whether it's 
                    checking student data, managing courses, or tracking progress, this system provides a smooth and reliable solution. 
                    For more details contact us at <u>StudentManagemnet@gmail.com.</u>
                </p>
            </main>
            <Footer/>
        </div>   
    );
};

export default Home;
