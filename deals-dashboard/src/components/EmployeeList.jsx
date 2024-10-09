// components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/employees');
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);

    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.mobile.toString().includes(search)
    );
    setFilteredEmployees(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${id}`);
      setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      <input
        type="text"
        placeholder="Enter Search Keyword"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      <table className="employee-table" border="1">
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee._id}</td>
              <td>
                <img src={employee.image} alt={employee.name} className="employee-image" />
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.course.join(', ')}</td>
              <td>{new Date(employee.createDate).toLocaleDateString()}</td>
              <td>
                <button className="edit-btn" onClick={() => alert(`Edit ${employee.name}`)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
