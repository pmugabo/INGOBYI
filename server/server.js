require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ingobyi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok',
    message: 'Ingobyi Emergency System API is running',
    timestamp: new Date().toISOString()
  });
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    console.log('Registration request:', req.body);
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      nationalId,
      role
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [
        { email },
        { nationalId },
        { phone }
      ]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }
      if (existingUser.nationalId === nationalId) {
        return res.status(400).json({ message: 'User already exists with this National ID' });
      }
      if (existingUser.phone === phone) {
        return res.status(400).json({ message: 'User already exists with this phone number' });
      }
    }

    // Create new user - password will be hashed by the User model middleware
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      nationalId,
      role
    });

    console.log('Saving user:', { 
      firstName, 
      lastName, 
      email, 
      phone, 
      nationalId,
      role
    });

    await user.save();
    console.log('User saved successfully');

    // Generate JWT token with role
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role
      },
      process.env.JWT_SECRET || 'ingobyi-emergency-system-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    // Get dashboard route based on role
    const dashboardRoutes = {
      patient: '/patient-dashboard',
      emt: '/emt-dashboard',
      driver: '/driver-dashboard',
      hospital_staff: '/hospital-dashboard',
      insurance_provider: '/insurance-dashboard'
    };

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      redirectTo: dashboardRoutes[user.role] || '/dashboard'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Failed to create account', error: error.message });
  }
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { identifier, password, role } = req.body;
    console.log('Login attempt:', { identifier, role });

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    });

    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify role matches
    if (user.role !== role) {
      console.log('Role mismatch:', { expected: role, actual: user.role });
      return res.status(401).json({ message: 'Invalid role for this user' });
    }

    // Compare password
    const isValidPassword = await user.comparePassword(password);
    console.log('Password valid:', isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token with role
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role 
      },
      process.env.JWT_SECRET || 'ingobyi-emergency-system-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    // Get dashboard route based on role
    const dashboardRoutes = {
      patient: '/patient-dashboard',
      emt: '/emt-dashboard',
      driver: '/driver-dashboard',
      hospital_staff: '/hospital-dashboard',
      insurance_provider: '/insurance-dashboard'
    };

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      redirectTo: dashboardRoutes[user.role] || '/dashboard'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
