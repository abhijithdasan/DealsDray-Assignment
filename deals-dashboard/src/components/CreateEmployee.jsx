import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EmployeeForm.css';

const generateEmployeeId = () => {
    return Math.floor(100 + Math.random() * 900);
};

const CreateEmployee = () => {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [course, setCourse] = useState(''); // Changed to a single value
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCourseChange = (e) => {
        setCourse(e.target.value); // Set selected course
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const employeeId = `emp-${generateEmployeeId()}`;
        const createdDate = new Date(); // Get the current date

        const formData = new FormData();
        formData.append('_id', employeeId);
        formData.append('name', name);
        formData.append('designation', designation);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('gender', gender);
        formData.append('course',course);
        formData.append('createdDate', createdDate.toISOString());
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('token'); // Get token from localStorage
            await axios.post('http://localhost:5000/api/employees', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            alert('Employee created successfully!');
            navigate('/employeelist'); // Redirect to employee list
        } catch (error) {
            setError('Failed to create employee. Please try again. ' + error.message);
        }
    };

    return (
        <div className="create-employee">
            <h2>Create Employee</h2>
            {error && <p className='error'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    required
                >
                    <option value="">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                />
                <div className='gender-section'>
                    <label>Gender:</label>
                    <label>
                        <input
                            type="radio"
                            value="Male"
                            checked={gender === 'Male'}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        /> Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Female"
                            checked={gender === 'Female'}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        /> Female
                    </label>
                </div>
                <div className='course-section'>
                    <h4>Select Course:</h4>
                    <label>
                        <input
                            type="radio"
                            value="MCA"
                            checked={course === 'MCA'}
                            onChange={handleCourseChange}
                        /> MCA
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="BCA"
                            checked={course === 'BCA'}
                            onChange={handleCourseChange}
                        /> BCA
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="BSC"
                            checked={course === 'BSC'}
                            onChange={handleCourseChange}
                        /> BSC
                    </label>
                </div>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit" className="btn">Add Employee</button>
            </form>
        </div>
    );
};

export default CreateEmployee;
