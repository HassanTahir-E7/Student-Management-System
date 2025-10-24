import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styling/SignUp.css';
import logo from '../Images/Logo.png';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');       // 🔹 new state for message
  const [isSuccess, setIsSuccess] = useState(false); // 🔹 to style message color
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setMessage(''); // clear any old messages

    const existingAdmins = JSON.parse(localStorage.getItem('admins')) || [];

    if (existingAdmins.length >= 1) {
      setMessage('Only one admin can be registered at a time. Please login instead.');
      setIsSuccess(false);
      return;
    }

    if (!name || !email || !password) {
      setMessage('Please fill in all fields.');
      setIsSuccess(false);
      return;
    }

    const alreadyExists = existingAdmins.some((admin) => admin.email === email);
    if (alreadyExists) {
      setMessage('An admin with this email already exists. Please login instead.');
      setIsSuccess(false);
      return;
    }

    const newAdmin = { name, email, password };
    existingAdmins.push(newAdmin);
    localStorage.setItem('admins', JSON.stringify(existingAdmins));

    setMessage('✅ Admin registered successfully! Redirecting to login...');
    setIsSuccess(true);

    // reset form
    setName('');
    setEmail('');
    setPassword('');

    // redirect after short delay
    setTimeout(() => navigate('/login'), 2000);
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

        {/* 🔹 Message Display Section */}
        {message && (
          <p className={`signup-message ${isSuccess ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        <p className="already-registered">
          Already registered? <Link to="/login" className="login-link">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
