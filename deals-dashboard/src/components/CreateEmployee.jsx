// components/CreateEmployee.js
import React, { useState } from 'react';

const CreateEmployee = () => {
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and make an API call to submit the data
    console.log('Form submitted', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="create-employee-form">
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Mobile</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="form-control" required />
      </div>
      <div className="form-group">
        <label>Designation</label>
        <select name="designation" value={formData.designation} onChange={handleChange} className="form-control" required>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
      <div className="form-group">
        <label>Gender</label>
        <div className="radio-group">
          <label>
            <input type="radio" name="gender" value="M" onChange={handleChange} required /> M
          </label>
          <label>
            <input type="radio" name="gender" value="F" onChange={handleChange} required /> F
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Course</label>
        <div className="checkbox-group">
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
      </div>
      <div className="form-group">
        <label>Image Upload</label>
        <input type="file" name="image" accept=".jpg, .png" onChange={handleImageUpload} className="form-control-file" required />
      </div>
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  );
};

export default CreateEmployee;
