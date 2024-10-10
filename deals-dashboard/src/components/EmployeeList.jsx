import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    // Fetch employees from API
    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to view this page.');
                setLoading(false);
                return;
            }

            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
            setError('Error fetching employees. Please try again later.');
        } finally {
            setLoading(false); 
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
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete employee.');
            }

            setEmployees(employees.filter((emp) => emp._id !== id));
        } catch (err) {
            console.error('Error deleting employee:', err);
            setError('Failed to delete employee. Please try again later.');
        }
    };

    return (
        <div className="employee-list emp-list">
            <h2>Employee List</h2>
            <button onClick={() => navigate('/create')} className="btn btn-primary">
                Add Employee
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading ? (
                <p>Loading employees...</p>
            ) : (
                employees.length ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Designation</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp._id}>
                                    {/* <td></td> */}
                                    <td>
                                        {emp.image ? (
                                            <img
                                                src={`http://localhost:5000/uploads/${emp.image}`}
                                                alt={emp.name}
                                                width="50"
                                            />
                                        ) : (
                                            'No Image'
                                        )}
                                    </td>
                                    <td>{emp.name || 'N/A'}</td>
                                    <td>{emp.email || 'N/A'}</td>
                                    <td>{emp.mobile || 'N/A'}</td>
                                    <td>{emp.designation || 'N/A'}</td>
                                    <td>{emp.gender || 'N/A'}</td>
                                    <td>{emp.course || 'N/A'}</td>
                                    <td>{emp.createdAt ? new Date(emp.createdAt).toLocaleDateString() : 'Date not available'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEdit(emp._id)}
                                            className="btn btn-warning"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(emp._id)}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No employees found.</p>
                )
            )}
        </div>
    );
};

export default EmployeeList;
