import React from 'react';

const EmergencyAlert = ({ alert, onAccept, onDecline }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 animate-pulse">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-2xl">🚨</span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            New Emergency Alert!
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p className="font-medium">{alert.location}</p>
            <p className="mt-1">{alert.description}</p>
            <div className="mt-2">
              <span className="font-medium">Priority: </span>
              <span className={`${
                alert.priority === 'high' ? 'text-red-600' :
                alert.priority === 'medium' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {alert.priority.toUpperCase()}
              </span>
            </div>
            <div className="mt-1">
              <span className="font-medium">ETA: </span>
              {alert.eta}
            </div>
          </div>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={() => onAccept(alert.id)}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-red-200"
            >
              Accept
            </button>
            <button
              onClick={() => onDecline(alert.id)}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-200"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlert;
