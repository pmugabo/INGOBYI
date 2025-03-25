const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const authController = require('../controllers/authController');
const emergencyController = require('../controllers/emergencyController');
const insuranceController = require('../controllers/insuranceController');

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', authenticate, authController.getProfile);

// Emergency routes
router.post('/emergency', authenticate, emergencyController.createEmergencyRequest);
router.put('/emergency/:requestId/status', 
  authenticate, 
  authorize('driver', 'hospital'), 
  emergencyController.updateEmergencyStatus
);
router.get('/emergency/:requestId', 
  authenticate, 
  emergencyController.getEmergencyDetails
);

// Insurance routes
router.post('/insurance/verify/:requestId',
  authenticate,
  authorize('insurance'),
  insuranceController.verifyInsurance
);
router.post('/insurance/payment/:requestId',
  authenticate,
  authorize('insurance'),
  insuranceController.processPayment
);
router.get('/insurance/records',
  authenticate,
  authorize('insurance'),
  insuranceController.getInsuranceRecords
);

module.exports = router;
