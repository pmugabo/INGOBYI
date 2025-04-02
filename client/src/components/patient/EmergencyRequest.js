import React from 'react';

const EmergencyRequest = ({ request, onCallEmt, onCallDispatch }) => {
  if (!request) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Emergency Request</h2>
        <p className="text-gray-500">No active emergency request.</p>
        <button className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
          Request Emergency Assistance
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      'en-route': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'nearby': 'bg-blue-100 text-blue-800 border-blue-200',
      'arrived': 'bg-green-100 text-green-800 border-green-200',
      'transporting': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[status] || colors['en-route'];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-lg font-medium text-gray-900">Active Emergency</h2>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
          {request.status === 'en-route' && '🚑 Ambulance En Route'}
          {request.status === 'nearby' && '📍 Ambulance Nearby'}
          {request.status === 'arrived' && '✅ Ambulance Arrived'}
          {request.status === 'transporting' && '🏥 Transporting to Hospital'}
        </span>
      </div>

      <div className="space-y-6">
        {/* ETA Information */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-800">Estimated Arrival</h3>
              <p className="mt-1 text-2xl font-semibold text-blue-900">{request.eta} minutes</p>
            </div>
            <span className="text-3xl">⏱️</span>
          </div>
        </div>

        {/* Ambulance Details */}
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Ambulance Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Vehicle ID:</span>
              <span className="font-medium">{request.ambulance.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{request.ambulance.type}</span>
            </div>
          </div>
        </div>

        {/* EMT Details */}
        <div className="border rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">EMT Details</h3>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">{request.emt.name}</p>
              <p className="text-sm text-gray-600">ID: {request.emt.id}</p>
            </div>
            <img
              src={request.emt.avatar || 'https://via.placeholder.com/40'}
              alt="EMT"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onCallEmt(request.emt.id)}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              📞 Call EMT
            </button>
            <button
              onClick={() => onCallDispatch()}
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              🔄 Contact Dispatch
            </button>
          </div>
        </div>

        {/* Hospital Information */}
        {request.hospital && (
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Destination Hospital</h3>
            <div className="space-y-2">
              <p className="font-medium">{request.hospital.name}</p>
              <p className="text-sm text-gray-600">{request.hospital.address}</p>
              <p className="text-sm text-gray-600">
                Emergency Dept: {request.hospital.emergencyContact}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmergencyRequest;
