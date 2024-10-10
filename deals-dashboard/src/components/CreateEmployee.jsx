import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import '../App.css';

const CreateEmployee = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [designation, setDesignation] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const token = localStorage.getItem('token'); // Retrieve the token here
        console.log("Token before making request:", token); // Check if token is retrieved

        if (!token) {
            setMessage('You must be logged in to create an employee.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('designation', designation);
        formData.append('gender', gender);
        formData.append('course', course);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/employees', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                navigate('/employeelist'); // Redirect to employee list page
            }
        } catch (error) {
            console.error('Error creating employee:', error);
            setMessage('Failed to create employee. Please try again later.');
        }
    };

    return (
        <div className="create-employee-container">
            <h2>Create Employee</h2>
            {message && <p className="error">{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                />
                <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input
                    type="text"
                    placeholder="Course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Add Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
