// components/Dashboard.js
import React from 'react';

const Dashboard = () => {
  const userId = localStorage.getItem('userId');
  return (
    <div className="dashboard-container">


      <div className="dashboard-content">
        <h2>Welcome, Admin Panel</h2>
        <p></p>
      </div>
    </div>
  );
};

export default Dashboard;
