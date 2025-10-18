// App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 🎯 UNCOMMENTED: All necessary Admin components
import Navbar from './components/Navbar.jsx'; 
import Home from './Pages/Home.jsx';
import Students from './Pages/Student.jsx'; // ⬅️ Corrected: Import variable is Students, file is Student.jsx
import Login from './Pages/Login.jsx'; 
import Signup from './Pages/SignUp.jsx';
import About from './Pages/About.jsx'; 
import RegisterStudent from './Pages/RegisterStudent.jsx'; 
import CgpaCalculator from './Pages/CgpaCalculator.jsx'; 
import Courses from './Pages/Courses.jsx'; 
// import Contact from './Pages/Contact.jsx';

// --- Private Route Component (No change) ---
const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  return isAuthenticated ? (
    <>
      <Navbar />
      <Element />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
// -----------------------------

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <Routes>
        {/* Authentication Routes (Public) */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main/Home Route (Protected) */}
        <Route path="/" element={<PrivateRoute element={Home} />} /> 
        <Route path="/home" element={<PrivateRoute element={Home} />} /> 
        
        {/* ❌ REMOVED: Problematic path="/student" */}

        {/* 🎯 CORRECTED: Student Management & Other Routes (Protected) */}
        <Route path="/register" element={<PrivateRoute element={RegisterStudent} />} />
        <Route path="/students" element={<PrivateRoute element={Students} />} /> 
        <Route path="/subjects" element={<PrivateRoute element={Courses} />} />
        <Route path="/cgpa" element={<PrivateRoute element={CgpaCalculator} />} />
        
        {/* Your Existing Routes (Protected) */}
        <Route path="/about" element={<PrivateRoute element={About} />} />
        {/* <Route path="/contact" element={<PrivateRoute element={Contact} />} /> */}

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;