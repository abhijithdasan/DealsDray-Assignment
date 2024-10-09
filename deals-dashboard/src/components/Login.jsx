import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Login = () => {
  const [userId, setUserId] = useState(''); // Updated variable name
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!userId || !password) { // Check for userId instead of username
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { // Ensure the endpoint matches
        userId, // Use userId here
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', userId); // Updated variable name
      navigate('/dashboard'); // Adjust if needed
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="User ID" // Update placeholder for clarity
          value={userId} // Updated variable name
          onChange={(e) => setUserId(e.target.value)} // Updated variable name
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default Login;
