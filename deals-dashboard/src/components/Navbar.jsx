// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <ul className="nav-links">
        <li><Link to="/" className="nav-item">Home</Link></li>
        <li><Link to="/employee-list" className="nav-item">Employee List</Link></li>
        <li><Link to="/create-employee" className="nav-item">Create Employee</Link></li>
      </ul>
      <div className="user-profile">
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
