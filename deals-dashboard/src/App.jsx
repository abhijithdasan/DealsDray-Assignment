// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
