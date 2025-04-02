import React from 'react';

const MedicalInfo = ({ patient }) => {
  if (!patient) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h2>
        <p className="text-gray-500">Loading medical information...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Medical Information</h2>
      
      {/* Emergency Contacts */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Emergency Contacts</h3>
        <div className="space-y-3">
          {patient.emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.relationship}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                📞 {contact.phone}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Medical Conditions */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Medical Conditions</h3>
        <div className="space-y-2">
          {patient.conditions.map((condition, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-red-500">•</span>
              <span>{condition}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Allergies</h3>
        <div className="space-y-2">
          {patient.allergies.map((allergy, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-yellow-500">⚠️</span>
              <span>{allergy}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Medications */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Current Medications</h3>
        <div className="space-y-2">
          {patient.medications.map((medication, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{medication.name}</span>
              <span className="text-sm text-gray-600">{medication.dosage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insurance Information */}
      {patient.insurance && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Insurance Information</h3>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Provider:</span>
                <span className="font-medium">{patient.insurance.provider}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Policy Number:</span>
                <span className="font-medium">{patient.insurance.policyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Coverage Type:</span>
                <span className="font-medium">{patient.insurance.coverageType}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalInfo;
