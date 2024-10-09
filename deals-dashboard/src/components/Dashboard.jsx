// components/Dashboard.js
import React from 'react';

const Dashboard = () => {
  const userId = localStorage.getItem('userId');
  return (
    <div className="dashboard-container">


      <div className="dashboard-content">
        <h2>Welcome, {userId}</h2>
        <p>Select an option from the menu above to manage employees.</p>
      </div>
    </div>
  );
};

export default Dashboard;
