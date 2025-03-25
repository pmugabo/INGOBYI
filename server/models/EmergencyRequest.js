const mongoose = require('mongoose');

const emergencyRequestSchema = new mongoose.Schema({
  patient: {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    phone: String,
    medicalHistory: String,
    insuranceInfo: {
      provider: String,
      policyNumber: String,
      verified: { type: Boolean, default: false }
    }
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
    address: String
  },
  condition: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'en_route', 'arrived', 'completed', 'cancelled'],
    default: 'pending'
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedHospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  payment: {
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'insurance_verified', 'paid', 'failed'],
      default: 'pending'
    },
    method: {
      type: String,
      enum: ['insurance', 'cash', 'card'],
    },
    insuranceClaim: {
      claimId: String,
      status: String,
      processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  },
  timeline: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    location: {
      type: { type: String },
      coordinates: [Number]
    },
    notes: String
  }],
  createdAt: { type: Date, default: Date.now }
});

emergencyRequestSchema.index({ location: '2dsphere' });
emergencyRequestSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('EmergencyRequest', emergencyRequestSchema);
