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
    console.log('Received registration request:', req.body);

    const { email, password, fullName, phone, nationalId, role } = req.body;

    // Validate required fields
    if (!email || !password || !fullName || !phone || !role) {
      console.warn('Missing required fields:', {
        email: !!email,
        password: !!password,
        fullName: !!fullName,
        phone: !!phone,
        role: !!role
      });
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        missingFields: [
          !email && 'email',
          !password && 'password', 
          !fullName && 'fullName', 
          !phone && 'phone', 
          !role && 'role'
        ].filter(Boolean)
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('Invalid email format:', email);
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Validate password strength
    if (password.length < 6) {
      console.warn('Password too short:', password.length);
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.warn('User already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Validate role
    const validRoles = ['patient', 'driver', 'emt', 'hospital', 'insurance', 'admin'];
    if (!validRoles.includes(role)) {
      console.warn('Invalid role:', role);
      return res.status(400).json({
        success: false,
        message: 'Invalid role',
        validRoles
      });
    }

    // Require nationalId for patient role
    if (role === 'patient' && !nationalId) {
      console.warn('National ID required for patient role');
      return res.status(400).json({
        success: false,
        message: 'National ID is required for patient registration'
      });
    }

    // Create new user
    const user = new User({
      email,
      password,
      fullName,
      phone,
      nationalId,
      role,
      status: 'approved'
    });

    try {
      await user.save();
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      return res.status(500).json({
        success: false,
        message: 'Error creating user account',
        details: saveError.message
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return success with token and user data
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Unexpected registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Unexpected error during registration',
      details: error.message || 'Unknown error occurred'
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.warn('User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.warn('Invalid password:', password);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return success with token and user data
    res.json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      details: error.message || 'Unknown error occurred'
    });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      details: error.message || 'Unknown error occurred'
    });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.warn('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      console.warn('User not found:', decoded.userId);
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
      console.warn('Invalid token:', error.message);
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
    console.error('Error fetching pending accounts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending accounts',
      details: error.message || 'Unknown error occurred'
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
    console.error('Error approving account:', error);
    res.status(400).json({
      success: false,
      message: 'Error approving account',
      details: error.message || 'Unknown error occurred'
    });
  }
});

module.exports = router;
