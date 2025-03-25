require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mockDb = require('./services/mockDb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// JWT Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'ingobyi-emergency-system-secret-key-change-in-production', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      role,
      nationalId,
      insuranceProvider,
      insuranceNumber
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const existingUser = mockDb.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with role-specific details
    const userData = {
      name: fullName,
      email,
      password: hashedPassword,
      phone,
      role
    };

    // Add patient-specific details
    if (role === 'patient') {
      userData.patientDetails = {
        nationalId,
        insuranceProvider,
        insuranceNumber,
        coverageDetails: 'Basic',
        lastVerificationDate: new Date(),
        paymentStatus: 'Pending'
      };

      // Create insurance record
      mockDb.createInsuranceRecord({
        userId: userData.id,
        provider: insuranceProvider,
        insuranceNumber,
        nationalId,
        coverageType: 'Basic'
      });
    }

    // Create user
    const user = mockDb.createUser(userData);

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'ingobyi-emergency-system-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        patientDetails: user.patientDetails
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error creating account', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email });

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = mockDb.findUserByEmail(email);
    console.log('User found:', user ? 'yes' : 'no');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValidPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'ingobyi-emergency-system-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    console.log('Login successful, sending response');

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        patientDetails: user.patientDetails
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Protected route for user profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  try {
    const user = mockDb.findUserById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      patientDetails: user.patientDetails
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Insurance verification endpoint
app.post('/api/insurance/verify', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.body;
    const verificationResult = mockDb.verifyInsurance(userId);
    
    if (!verificationResult) {
      return res.status(404).json({ message: 'Insurance record not found' });
    }

    res.json(verificationResult);
  } catch (error) {
    console.error('Insurance verification error:', error);
    res.status(500).json({ message: 'Error verifying insurance', error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ingobyi Emergency System API is running' });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
