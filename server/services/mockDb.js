// Mock database service for development
const mockDb = {
  users: [
    {
      id: '1',
      name: 'Test Patient',
      email: 'patient@test.com',
      password: '$2a$10$6Bnv6HxlAPTN0FkTrK0IuOXZYE.TXD5pGfGvQxYO.w8VHr8JF2N.q', // password: password123
      role: 'patient',
      phone: '1234567890',
      createdAt: new Date(),
      patientDetails: {
        nationalId: 'TEST123',
        insuranceProvider: 'Test Insurance',
        insuranceNumber: 'INS123',
        coverageDetails: 'Basic',
        lastVerificationDate: new Date(),
        paymentStatus: 'Active'
      }
    },
    {
      id: '2',
      name: 'Test Driver',
      email: 'driver@test.com',
      password: '$2a$10$6Bnv6HxlAPTN0FkTrK0IuOXZYE.TXD5pGfGvQxYO.w8VHr8JF2N.q', // password: password123
      role: 'driver',
      phone: '0987654321',
      createdAt: new Date()
    }
  ],
  insuranceRecords: [
    {
      id: '1',
      userId: '1',
      provider: 'Test Insurance',
      insuranceNumber: 'INS123',
      nationalId: 'TEST123',
      coverageType: 'Basic',
      verificationStatus: 'verified',
      createdAt: new Date(),
      verifiedAt: new Date()
    }
  ],
  emergencyRequests: []
};

// User operations
const createUser = (userData) => {
  const user = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date()
  };
  mockDb.users.push(user);
  return user;
};

const findUserByEmail = (email) => {
  return mockDb.users.find(user => user.email === email);
};

const findUserById = (id) => {
  return mockDb.users.find(user => user.id === id);
};

// Insurance operations
const createInsuranceRecord = (data) => {
  const record = {
    id: Date.now().toString(),
    ...data,
    verificationStatus: 'pending',
    createdAt: new Date()
  };
  mockDb.insuranceRecords.push(record);
  return record;
};

const verifyInsurance = (userId) => {
  const user = findUserById(userId);
  if (!user || user.role !== 'patient') return null;
  
  const record = mockDb.insuranceRecords.find(r => r.userId === userId);
  if (!record) return null;

  record.verificationStatus = 'verified';
  record.verifiedAt = new Date();
  return record;
};

// Emergency request operations
const createEmergencyRequest = (data) => {
  const request = {
    id: Date.now().toString(),
    ...data,
    status: 'pending',
    createdAt: new Date()
  };
  mockDb.emergencyRequests.push(request);
  return request;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  createInsuranceRecord,
  verifyInsurance,
  createEmergencyRequest
};
