// EmployeePage.jsx
import React from 'react';
import CreateEmployee from './CreateEmployee'; // Adjust the import path as necessary

const EmployeePage = () => {
  // Function to handle form submission
  const submitEmployeeForm = async (formData) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await fetch('http://localhost:5000/api/employees', {
        method: 'POST',
        body: formData, // The form data is sent here
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in request headers
        }
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Employee created:', result);
        alert('Employee added successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit employee');
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <CreateEmployee onSubmit={submitEmployeeForm} /> {/* Pass the function as a prop */}
    </div>
  );
};

export default EmployeePage;
