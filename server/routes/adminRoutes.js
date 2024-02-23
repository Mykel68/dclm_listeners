const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create a new admin
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.json({ message: 'Admin registration successful' });
  } catch (error) {
    console.error('Error during admin registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      // Successful login
      res.status(200).json({ message: 'Admin login Successful ' });
    } else {
      // Invalid credentials
      res.status(401).json({ message: 'Invalid admin credentials' });
    }
  } catch (error) {
    console.error('Error during admin login:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
