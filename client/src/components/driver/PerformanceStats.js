import React from 'react';

const PerformanceStats = ({ stats }) => {
  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Stats</h2>
        <p className="text-gray-500">Loading performance statistics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Stats</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm font-medium text-blue-800">Response Time</div>
          <div className="mt-2 flex items-baseline">
            <div className="text-2xl font-semibold text-blue-900">
              {stats.avgResponseTime}
            </div>
            <div className="ml-2 text-sm text-blue-800">minutes</div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm font-medium text-green-800">Trips Today</div>
          <div className="mt-2 flex items-baseline">
            <div className="text-2xl font-semibold text-green-900">
              {stats.tripsToday}
            </div>
            <div className="ml-2 text-sm text-green-800">completed</div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-sm font-medium text-purple-800">Distance</div>
          <div className="mt-2 flex items-baseline">
            <div className="text-2xl font-semibold text-purple-900">
              {stats.totalDistance}
            </div>
            <div className="ml-2 text-sm text-purple-800">km</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {stats.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>
              <div className="flex-1 text-gray-600">{activity.description}</div>
              <div className="text-gray-400">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceStats;
