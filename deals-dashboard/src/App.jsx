// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import Login from './components/Login';
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
    <Routes>
      {/* Public route without layout */}
      <Route path="/login" element={<Login />} />

      {/* Private routes with shared layout (navbar) */}
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employee" element={<EmployeeList />} />
        <Route path="/create" element={<CreateEmployee />} />
      </Route>
    </Routes>
  </Router>
  );
};

export default App;