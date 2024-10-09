import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './EmployeeForm.css';

const CreateEmployee = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, image: files[0] });
        } else if (type === 'checkbox') {
            if (e.target.checked) {
                setFormData({ ...formData, course: [...formData.course, value] });
            } else {
                setFormData({ ...formData, course: formData.course.filter(c => c !== value) });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Submit the form data
    };

    return (
        <form className="employee-form" onSubmit={handleSubmit}>
            <h2>Create Employee</h2>
            <input type="text" name="name" placeholder="Name" className="form-control" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} required />
            <input type="text" name="mobile" placeholder="Mobile No" className="form-control" onChange={handleChange} required />
            <select name="designation" className="form-control" onChange={handleChange} required>
                <option value="">Select Designation</option>
                <option value="HR">HR</option>
                <option value="Manager">Manager</option>
                <option value="Sales">Sales</option>
            </select>
            <div className="form-group">
                <label>
                    <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
                </label>
                <label>
                    <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
                </label>
            </div>
            <div className="form-group">
                <label>
                    <input type="checkbox" name="course" value="MCA" onChange={handleChange} /> MCA
                </label>
                <label>
                    <input type="checkbox" name="course" value="BCA" onChange={handleChange} /> BCA
                </label>
                <label>
                    <input type="checkbox" name="course" value="BSC" onChange={handleChange} /> BSC
                </label>
            </div>
            <input type="file" name="image" className="form-control" onChange={handleChange} />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

// Add prop types validation
CreateEmployee.propTypes = {
    onSubmit: PropTypes.func.isRequired, // onSubmit is required and must be a function
};

export default CreateEmployee;
