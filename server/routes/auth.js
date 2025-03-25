const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authService = require('../services/authService');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'Account created successfully. Please wait for approval.',
      ...result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({
      success: true,
      message: 'Logged in successfully',
      ...result
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      patientDetails: user.patientDetails,
      insuranceOfficerDetails: user.insuranceOfficerDetails
    });
  } catch (error) {
    console.error('Profile error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Admin: Get pending accounts
router.get('/pending-accounts', adminAuth, async (req, res) => {
  try {
    const pendingAccounts = await authService.getPendingAccounts();
    res.json({
      success: true,
      data: pendingAccounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Admin: Approve account
router.put('/approve/:userId', adminAuth, async (req, res) => {
  try {
    const user = await authService.approveAccount(req.params.userId);
    res.json({
      success: true,
      message: 'Account approved successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
