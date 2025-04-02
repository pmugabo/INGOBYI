const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
  async register(userData) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Create new user
      const user = new User({
        ...userData,
        password: hashedPassword,
        status: 'approved',
        createdAt: new Date()
      });

      // Save user
      await user.save();

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Return user data with dashboard route
      const dashboardRoutes = {
        patient: '/patient',
        emt: '/emt',
        driver: '/driver',
        hospital: '/hospital',
        insurance: '/insurance'
      };

      return {
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          status: user.status
        },
        redirectTo: dashboardRoutes[user.role] || '/dashboard'
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Return user data with dashboard route
      const dashboardRoutes = {
        patient: '/patient',
        emt: '/emt',
        driver: '/driver',
        hospital: '/hospital',
        insurance: '/insurance'
      };

      return {
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          status: user.status
        },
        redirectTo: dashboardRoutes[user.role] || '/dashboard'
      };
    } catch (error) {
      throw error;
    }
  }

  async approveAccount(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.status = 'approved';
      await user.save();

      return {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status
      };
    } catch (error) {
      throw error;
    }
  }

  async getPendingAccounts() {
    try {
      const users = await User.find({ status: 'pending' })
        .select('-password')
        .sort({ createdAt: -1 });
      return users;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
