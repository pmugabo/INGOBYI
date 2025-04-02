import React from 'react';

const PatientInfo = ({ patient }) => {
  if (!patient) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="border-b pb-4 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">Case #{patient.caseId}</h2>
            <p className="text-sm text-gray-500 mt-1">Opened: {new Date(patient.timestamp).toLocaleString()}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm ${
            patient.status === 'critical' ? 'bg-red-100 text-red-800' :
            patient.status === 'stable' ? 'bg-green-100 text-green-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {patient.status}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Patient Information</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{patient.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age</p>
              <p className="font-medium">{patient.age}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Blood Type</p>
              <p className="font-medium">{patient.bloodType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Insurance</p>
              <p className="font-medium">{patient.insurance}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Medical History</h3>
          <div className="mt-2">
            <p className="text-sm">{patient.medicalHistory}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Allergies</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {patient.allergies?.map((allergy, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full bg-red-50 text-red-700 text-sm"
              >
                {allergy}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Destination Hospital</h3>
          <div className="mt-2">
            <p className="font-medium">{patient.hospital}</p>
            <p className="text-sm text-gray-500">{patient.department}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex space-x-3">
        <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
          📞 Call Dispatch
        </button>
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          💬 Message Hospital
        </button>
      </div>
    </div>
  );
};

export default PatientInfo;
