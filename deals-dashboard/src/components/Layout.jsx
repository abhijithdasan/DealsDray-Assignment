import React from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Hide the navbar on the login page
  const shouldShowNavbar = location.pathname !== '/login';

  // Logout function to remove localStorage data and navigate to login
  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="app-layout">
      {shouldShowNavbar && (
        <div className="navbar">
        <div className="logo">Logo</div>
          <Link to="/dashboard" className='nav-item'>Dashboard</Link>
          <Link to="/employee" className='nav-item'>Employee List</Link>
          <Link to="/create" className='nav-item'>Create</Link>
          <Link to={`/dashboard`} className='nav-item'>{userId}</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      )}
      {/* The rest of the page content */}
      <Outlet />
    </div>
  );
};

export default Layout;
