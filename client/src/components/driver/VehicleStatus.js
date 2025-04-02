import React from 'react';

const VehicleStatus = ({ vehicle }) => {
  if (!vehicle) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Vehicle Status</h2>
        <p className="text-gray-500">Loading vehicle information...</p>
      </div>
    );
  }

  const getFuelLevelColor = (level) => {
    if (level > 70) return 'text-green-600';
    if (level > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Vehicle Status</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Vehicle ID:</span>
          <span className="font-medium">{vehicle.id}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Fuel Level:</span>
          <span className={`font-medium ${getFuelLevelColor(vehicle.fuelLevel)}`}>
            {vehicle.fuelLevel}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Status:</span>
          <span className={`px-2 py-1 rounded-full text-sm ${
            vehicle.status === 'ready' ? 'bg-green-100 text-green-800' :
            vehicle.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {vehicle.status.toUpperCase()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Mileage:</span>
          <span className="font-medium">{vehicle.mileage} km</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Next Service:</span>
          <span className="font-medium">{vehicle.nextService}</span>
        </div>
      </div>
      
      {vehicle.alerts?.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 rounded-md">
          <h3 className="text-sm font-medium text-red-800">Alerts</h3>
          <ul className="mt-2 text-sm text-red-700">
            {vehicle.alerts.map((alert, index) => (
              <li key={index}>• {alert}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VehicleStatus;
