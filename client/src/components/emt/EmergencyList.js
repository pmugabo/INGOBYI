import React from 'react';

const EmergencyList = ({ emergencies, onSelect }) => {
  const getUrgencyColor = (level) => {
    const colors = {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-orange-100 text-orange-800 border-orange-200',
      low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[level] || colors.medium;
  };

  const getStatusBadge = (status) => {
    const badges = {
      assigned: 'bg-blue-100 text-blue-800',
      'in-transit': 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return badges[status] || badges.assigned;
  };

  return (
    <div className="space-y-4">
      {emergencies?.map((emergency) => (
        <div
          key={emergency.id}
          onClick={() => onSelect(emergency)}
          className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${getUrgencyColor(emergency.urgencyLevel)}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{emergency.patientName}</h3>
              <p className="text-sm mt-1">{emergency.description}</p>
              <div className="flex items-center mt-2 space-x-2 text-sm">
                <span>📍 {emergency.location}</span>
                <span>⏱️ ETA: {emergency.eta}</span>
              </div>
            </div>
            <div className={`px-2 py-1 rounded text-xs ${getStatusBadge(emergency.status)}`}>
              {emergency.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencyList;
