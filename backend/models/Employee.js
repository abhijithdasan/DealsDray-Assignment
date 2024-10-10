const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    createdDate: { 
      type: Date, 
      default: Date.now 
    },
    image: {
        type: String
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
