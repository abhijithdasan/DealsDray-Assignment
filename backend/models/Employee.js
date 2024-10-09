const mongoose = require('mongoose');

// Define the Employee schema
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false, // Optional
  }
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create the model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
