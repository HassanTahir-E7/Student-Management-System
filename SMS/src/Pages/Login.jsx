// Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Styling/Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve stored credentials
    const storedCredentialsString = localStorage.getItem('adminCredentials');

    if (!storedCredentialsString) {
      alert('No admin account found. Please sign up first.');
      return;
    }

    const storedCredentials = JSON.parse(storedCredentialsString);

    // Verify credentials
    if (email === storedCredentials.email && password === storedCredentials.password) {
      // Successful login
      alert('Login successful! Welcome Admin.');
      // A simple way to manage the session state globally
      localStorage.setItem('isAuthenticated', 'true'); 
      setIsAuthenticated(true); // Update state in App/parent component (assuming you'll pass this prop)
      navigate('/home'); // Redirect to Home Page
    } else {
      // Invalid Credentials
      alert('Invalid Credentials. Please check your email and password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
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
        <button type="submit" className="login-btn">Login</button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;