const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { f_userName, f_Pwd } = req.body;

    // Log the input data
    console.log("Received login request with", f_userName, f_Pwd);

    const user = await User.findOne({ f_userName });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(f_Pwd, user.f_Pwd);

    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user });

  } catch (err) {
    console.error("Error occurred during login", err);
    res.status(500).json({ message: "Error occurred. Please try again." });
  }
});


module.exports = router;
