const mongoose = require('mongoose');

const emergencySchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: String
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    },
    address: String
  },
  description: {
    type: String,
    required: true
  },
  patient: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    fullName: String,
    nationalId: String,
    phoneNumber: String,
    insuranceProvider: String,
    insuranceNumber: String,
    coverageDetails: String
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'inProgress', 'completed', 'cancelled'],
    default: 'pending'
  },
  payment: {
    status: {
      type: String,
      enum: ['pending', 'insurance_verified', 'paid', 'failed'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: [null, 'cash', 'insurance'],
      default: null
    },
    amount: Number,
    insuranceClaim: {
      claimId: String,
      status: {
        type: String,
        enum: ['pending', 'processed', 'failed']
      },
      processedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedHospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
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

emergencySchema.index({ location: '2dsphere' });
emergencySchema.index({ currentLocation: '2dsphere' });

// Update timestamps
emergencySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Emergency = mongoose.model('Emergency', emergencySchema);

module.exports = Emergency;
