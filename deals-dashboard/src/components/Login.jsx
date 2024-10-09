import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import '../App.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!userId || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        userId,
        password,
      });
      if (!response.data.token) {
        setMessage('Invalid user ID or password');
        return;
      }
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', userId); // Store userId instead of username
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message); // Show error message from server
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className='btn' type="submit">Login</button>
      </form>
      {message && <p className="error">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
