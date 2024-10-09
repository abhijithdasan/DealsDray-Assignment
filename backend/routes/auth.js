const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
  const { userId, password } = req.body; // Should be userId, not username

  if (!userId || !password) {
    return res.status(400).json({ error: 'User ID and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ error: 'User ID already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userId, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: 'User ID and password are required.' });
  }
  // Check if user exists and password is correct
  try {
    const user = await User.findOne({ userId });
    console.log('Fetched User:', user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('Provided Password:', password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password Match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;