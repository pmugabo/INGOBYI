import React from 'react';

const LiveAlerts = ({ alerts }) => {
  return (
    <div className="flex items-center space-x-4">
      {alerts?.map((alert, index) => (
        <div
          key={index}
          className="flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 animate-pulse"
        >
          <span className="mr-2">🚨</span>
          {alert.message}
        </div>
      ))}
    </div>
  );
};

export default LiveAlerts;
