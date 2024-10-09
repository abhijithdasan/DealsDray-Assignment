// components/Dashboard.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-logo">Logo</div>
        <ul className="navbar-links">
          <li><Link to="/dashboard" className="nav-item">Home</Link></li>
          <li><Link to="/employees" className="nav-item">Employee List</Link></li>
          <li><Link to="/create-employee" className="nav-item">Create Employee</Link></li>
        </ul>
        <div className="navbar-user">
          <span>{userId}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <h2>Welcome, {userId}</h2>
        <p>Select an option from the menu above to manage employees.</p>
      </div>
    </div>
  );
};

export default Dashboard;
