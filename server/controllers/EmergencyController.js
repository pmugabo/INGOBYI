const Emergency = require('../models/Emergency');
const User = require('../models/User');

// Create a new emergency request
exports.createEmergency = async (req, res) => {
  try {
    const { location, description, patientId } = req.body;
    const emergency = new Emergency({
      location,
      description,
      patient: patientId,
      status: 'pending'
    });
    await emergency.save();
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

// Get emergency request by ID
exports.getEmergencyById = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id).populate('patient');
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
    const { status } = req.body;
    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!emergency) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }
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
