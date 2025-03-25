const User = require('../models/User');
const EmergencyRequest = require('../models/EmergencyRequest');

exports.verifyInsurance = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { insuranceNumber, providerId } = req.body;

    const request = await EmergencyRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }

    // Verify insurance coverage
    const coverage = await User.findOne({
      'insuranceDetails.providerId': providerId,
      role: 'insurance'
    });

    if (!coverage) {
      return res.status(404).json({ message: 'Insurance provider not found' });
    }

    // Update request with insurance verification
    request.payment = {
      ...request.payment,
      status: 'insurance_verified',
      method: 'insurance',
      insuranceClaim: {
        claimId: `CLM-${Date.now()}`,
        status: 'pending',
        processedBy: req.user.userId
      }
    };

    await request.save();

    res.json({
      message: 'Insurance verified',
      coverage: coverage.insuranceDetails.coverage,
      claimId: request.payment.insuranceClaim.claimId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying insurance', error: error.message });
  }
};

exports.processPayment = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { amount, status } = req.body;

    const request = await EmergencyRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Emergency request not found' });
    }

    request.payment = {
      ...request.payment,
      amount,
      status,
      insuranceClaim: {
        ...request.payment.insuranceClaim,
        status: status === 'paid' ? 'processed' : 'failed',
        processedBy: req.user.userId
      }
    };

    await request.save();

    res.json({
      message: 'Payment processed',
      payment: request.payment
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

exports.getInsuranceRecords = async (req, res) => {
  try {
    const records = await EmergencyRequest.find({
      'payment.method': 'insurance',
      'payment.insuranceClaim.processedBy': req.user.userId
    }).sort({ createdAt: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
};
