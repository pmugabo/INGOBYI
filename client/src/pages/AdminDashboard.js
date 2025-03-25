import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeEmergencies: 0,
    availableDrivers: 0,
    totalHospitals: 0,
    totalEMTs: 0,
    totalResponses: 0
  });
  const [recentEmergencies, setRecentEmergencies] = useState([]);
  const [userManagement, setUserManagement] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
    fetchRecentEmergencies();
    fetchUsers();

    // Set up real-time updates
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'STATS_UPDATE') {
        setStats(prev => ({ ...prev, ...data.stats }));
      } else if (data.type === 'NEW_EMERGENCY') {
        setRecentEmergencies(prev => [data.emergency, ...prev.slice(0, 9)]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentEmergencies = async () => {
    try {
      const response = await fetch('/api/admin/recent-emergencies', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setRecentEmergencies(data);
    } catch (error) {
      console.error('Error fetching recent emergencies:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUserManagement(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserStatusChange = async (userId, newStatus) => {
    try {
      await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">System Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Emergencies</p>
              <p className="text-2xl font-bold text-red-600">{stats.activeEmergencies}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available Drivers</p>
              <p className="text-2xl font-bold text-green-600">{stats.availableDrivers}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Hospitals</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalHospitals}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active EMTs</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.totalEMTs}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Responses</p>
              <p className="text-2xl font-bold text-indigo-600">{stats.totalResponses}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Recent Emergencies</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentEmergencies.map((emergency) => (
                  <tr key={emergency.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(emergency.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {emergency.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {emergency.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          emergency.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : emergency.status === 'in-progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {emergency.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Management</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {userManagement.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() =>
                        handleUserStatusChange(
                          user.id,
                          user.status === 'active' ? 'inactive' : 'active'
                        )
                      }
                      className={`text-sm font-medium ${
                        user.status === 'active'
                          ? 'text-red-600 hover:text-red-900'
                          : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
