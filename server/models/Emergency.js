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
  description: {
    type: String,
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'inProgress', 'completed', 'cancelled'],
    default: 'pending'
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

const Emergency = mongoose.model('Emergency', emergencySchema);

module.exports = Emergency;
