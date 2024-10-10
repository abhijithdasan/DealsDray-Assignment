import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch employees from API
    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            if (!token) {
                setError('You must be logged in to view this page.'); // Handle no token
                return;
            }
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
        navigate(`/create/${id}`);
    };

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Gender</th>
                            <th>Courses</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp._id}>
                                <td>{emp.name}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.email}</td>
                                <td>{emp.mobile}</td>
                                <td>{emp.gender}</td>
                                <td>{emp.course.join(', ')}</td>
                                <td>{emp.image && <img src={`http://localhost:5000/uploads/${emp.image}`} alt={emp.name} width="50" />}</td>
                                <td>
                                    <button onClick={() => handleEdit(emp._id)} className="btn btn-warning">Edit</button>
                                    <button onClick={() => handleDelete(emp._id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No employees found.</p>
            )}
        </div>
    );
};

export default EmployeeList;
