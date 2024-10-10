// EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch employees from API
    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN'); // Get token from localStorage
            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Use Bearer scheme for token
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch employees');
            }

            const data = await response.json();
            setEmployees(data);
        } catch (err) {
            console.error('Error fetching employees:', err);
            setError('Error fetching employees. Please try again later.'); // Update error state
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle Edit
    const handleEdit = (id) => {
        navigate(`/create/${id}`); // Adjust to the edit route you want
    };

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('AUTH_TOKEN'); // Get token from localStorage
            await fetch(`http://localhost:5000/api/employees/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Use Bearer scheme for token
                    'Content-Type': 'application/json'
                }
            });
            setEmployees(employees.filter(emp => emp._id !== id));
        } catch (err) {
            setError('Failed to delete employee');
        }
    };

    return (
        <div className="employee-list emp-list">
            <h2>Employee List</h2>
            <button onClick={() => navigate('/create')} className="btn btn-primary">Add Employee</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {employees.length ? (
                <ul>
                    {employees.map(emp => (
                        <li key={emp._id}>
                            <span>{emp.name} - {emp.designation}</span>
                            <button onClick={() => handleEdit(emp._id)} className="btn btn-warning">Edit</button>
                            <button onClick={() => handleDelete(emp._id)} className="btn btn-danger">Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No employees found.</p>
            )}
        </div>
    );
};

export default EmployeeList;
