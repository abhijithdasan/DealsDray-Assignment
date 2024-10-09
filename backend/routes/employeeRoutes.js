// backend/routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Get all employees
router.get('/employees', async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// Delete an employee
router.delete('/employees/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

module.exports = router;
