const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['patient', 'driver', 'hospital', 'emt', 'insurance', 'admin'],
    default: 'patient'
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  // Patient-specific fields
  nationalId: {
    type: String,
    required: function() {
      return this.role === 'patient';
    },
    trim: true
  },
  insuranceProvider: {
    type: String,
    required: function() {
      return this.role === 'patient';
    },
    trim: true
  },
  insuranceNumber: {
    type: String,
    required: function() {
      return this.role === 'patient';
    },
    trim: true
  },
  insuranceDetails: {
    coverageType: {
      type: String,
      enum: ['Basic', 'Premium', 'Comprehensive'],
      default: 'Basic'
    },
    coverageStatus: {
      type: String,
      enum: ['Active', 'Inactive', 'Pending'],
      default: 'Pending'
    },
    lastVerificationDate: {
      type: Date
    }
  },
  // Insurance officer-specific fields
  providerId: {
    type: String,
    required: function() {
      return this.role === 'insurance';
    },
    trim: true
  },
  department: {
    type: String,
    required: function() {
      return this.role === 'insurance';
    },
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  this.updatedAt = new Date();
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
