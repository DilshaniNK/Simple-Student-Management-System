// routes/auth.js
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Scheam');
require('dotenv').config();

// Replace with your secret key
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email' });
  const isMatch = await bcrypt.compare(String(password), user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password.' });


  if (user.isFirstLoging ) {
    // Password is empty, so check OTP
   
      // OTP matches, update first login and clear OTP
      user.isFirstLoging = false;
      
      await user.save();
      // Respond to frontend to redirect to create password page
      return res.json({ firstLogin: true, message: 'OTP verified. Please create your password.' });
   
  }

  // Issue JWT and login as usual
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, firstLogin: user.isFirstLoging });

  


});


// Create password after OTP login
router.post('/create-password', async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.isFirstLoging = false;
  

  await user.save();

  res.json({ message: 'Password created successfully. Please log in.' });
});
module.exports = router;