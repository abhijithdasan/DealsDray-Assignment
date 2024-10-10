// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import CreateEmployee from './components/CreateEmployee';
import Login from './components/Login';
import Layout from './components/Layout';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/" element={<Layout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/employeelist" element={<EmployeeList />} /> {/* Updated route name */}
                        <Route path="/create" element={<CreateEmployee />} />
                        <Route path="/create/:id" element={<CreateEmployee />} /> {/* Route for editing employee */}
                    </Route>
                </Routes>
            </ErrorBoundary>
        </Router>
    );
};

export default App;
