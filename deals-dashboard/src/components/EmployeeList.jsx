import React, { useEffect, useState } from 'react';
import './EmployeeList.css';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/employees');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`/employees/${id}`, { method: 'DELETE' });
            setEmployees(employees.filter(emp => emp._id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="employee-list">
            <h2>Employee List</h2>
            {employees.length ? (
                <ul>
                    {employees.map(emp => (
                        <li key={emp._id}>
                            <span>{emp.name} - {emp.designation}</span>
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
