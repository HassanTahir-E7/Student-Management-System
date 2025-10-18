// Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styling/SignUp.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Check if an admin already exists (optional but good practice)
    const existingAdmin = localStorage.getItem('adminCredentials');
    if (existingAdmin) {
      alert('An admin account already exists. Please log in.');
      return;
    }

    // Save credentials to localStorage
    const adminData = { email, password };
    localStorage.setItem('adminCredentials', JSON.stringify(adminData));

    alert('Signup successful! Please log in.');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Admin Signup</h2>
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
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;