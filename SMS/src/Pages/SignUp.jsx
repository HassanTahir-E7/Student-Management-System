import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styling/SignUp.css';
import logo from '../Images/Logo.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];

    // ✅ Check admin limit
    if (existingAdmins.length >= 2) {
      alert('Only 2 admins can be registered at a time. Please login instead.');
      return;
    }

    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    const alreadyExists = existingAdmins.some((admin) => admin.email === email);
    if (alreadyExists) {
      alert('An admin with this email already exists. Please login instead.');
      return;
    }

    const newAdmin = { name, email, password };
    existingAdmins.push(newAdmin);
    localStorage.setItem('admins', JSON.stringify(existingAdmins));

    alert('Admin registered successfully!');
    setName('');
    setEmail('');
    setPassword('');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <div className="form-header">
          <img src={logo} alt="Logo" className="signup-logo" />
          <h2 className="signup-heading">Admin Signup</h2>
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="signup-btn">Register</button>

        {/* 🔹 New Section: Already registered message */}
        <p className="already-registered">
          Already registered? <Link to="/login" className="login-link">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
