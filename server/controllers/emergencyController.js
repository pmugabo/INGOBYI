const Emergency = require('../models/Emergency');
const User = require('../models/User');
const { io } = require('../server');

// Create a new emergency request
exports.createEmergencyRequest = async (req, res) => {
  try {
    const { location, description, patientDetails } = req.body;
    
    const emergency = new Emergency({
      location,
      description,
      patient: {
        ...patientDetails,
        userId: req.user.userId
      },
      status: 'pending',
      payment: {
        status: 'pending',
        method: null
      }
    });
    
    await emergency.save();
    
    // Emit to relevant channels
    io.emit('new_emergency', {
      requestId: emergency._id,
      location: emergency.location
    });
    
    res.status(201).json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all emergency requests
exports.getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().populate('patient');
    res.json(emergencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get emergency request details
exports.getEmergencyDetails = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.requestId).populate('patient');
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
    res.json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update emergency request status
exports.updateEmergencyStatus = async (req, res) => {
  try {
    const { status, location } = req.body;
    const emergency = await Emergency.findById(req.params.requestId);
    
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }

    emergency.status = status;
    if (location) {
      emergency.currentLocation = location;
    }

    if (status === 'accepted' && req.user.role === 'driver') {
      emergency.assignedDriver = req.user.userId;
    }

    await emergency.save();

    // Emit status update
    io.to(`request_${emergency._id}`).emit('status_update', {
      requestId: emergency._id,
      status: emergency.status,
      location: emergency.currentLocation
    });

    res.json(emergency);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete emergency request
exports.deleteEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndDelete(req.params.id);
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
    res.json({ message: 'Emergency request deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
