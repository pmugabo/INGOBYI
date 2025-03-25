import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [emergencyStats, setEmergencyStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('users');

  useEffect(() => {
    fetchUsers();
    fetchEmergencyStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchEmergencyStats = async () => {
    try {
      const response = await axios.get('/api/admin/emergency-stats');
      setEmergencyStats(response.data);
    } catch (error) {
      console.error('Error fetching emergency stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatusUpdate = async (userId, isActive) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, { isActive });
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, isActive } : user
        )
      );
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        {/* Stats Overview */}
        {!loading && emergencyStats && (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Emergency Requests
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {emergencyStats.totalRequests}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Active Drivers
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {emergencyStats.activeDrivers}
                </dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Average Response Time
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {emergencyStats.avgResponseTime} min
                </dd>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mt-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setSelectedTab('users')}
              className={`${
                selectedTab === 'users'
                  ? 'border-[#004F98] text-[#004F98]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Users
            </button>
            <button
              onClick={() => setSelectedTab('analytics')}
              className={`${
                selectedTab === 'analytics'
                  ? 'border-[#004F98] text-[#004F98]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Users List */}
        {selectedTab === 'users' && (
          <div className="mt-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xl text-gray-600">
                                  {user.fullName[0]}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <h3 className="text-sm font-medium text-gray-900">
                                {user.fullName}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {user.email}
                              </p>
                              <p className="text-sm text-gray-500">
                                Role: {user.role}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                            onClick={() => handleUserStatusUpdate(user.id, !user.isActive)}
                            className={`${
                              user.isActive
                                ? 'bg-[#004F98] hover:bg-[#003A6D]'
                                : 'bg-green-600 hover:bg-green-700'
                            } text-white px-3 py-1 rounded-md text-sm`}
                          >
                            {user.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Analytics */}
        {selectedTab === 'analytics' && (
          <div className="mt-8">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Emergency Response Analytics
                </h3>
                {/* Add charts and analytics here */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
