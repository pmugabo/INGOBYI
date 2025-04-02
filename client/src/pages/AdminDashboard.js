import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeEmergencies: 0,
    totalAmbulances: 0,
    totalHospitals: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentEmergencies, setRecentEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, usersRes, emergenciesRes] = await Promise.all([
        axios.get('/api/admin/stats'),
        axios.get('/api/admin/recent-users'),
        axios.get('/api/admin/recent-emergencies')
      ]);
      setStats(statsRes.data);
      setRecentUsers(usersRes.data);
      setRecentEmergencies(emergenciesRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatus = async (userId, status) => {
    try {
      await axios.post(`/api/admin/users/${userId}/status`, { status });
      await fetchDashboardData();
    } catch (err) {
      setError('Failed to update user status');
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Statistics Overview */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalUsers}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active Emergencies</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.activeEmergencies}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Ambulances</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalAmbulances}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Hospitals</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalHospitals}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Users</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading users...</div>
            ) : recentUsers.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No users found</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentUsers.map((user) => (
                  <div key={user._id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {user.fullName}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Role: {user.role}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Email: {user.email}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        {user.status === 'active' ? (
                          <button
                            onClick={() => handleUserStatus(user._id, 'suspended')}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserStatus(user._id, 'active')}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Emergencies */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Emergencies</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading emergencies...</div>
            ) : recentEmergencies.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No emergencies found</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {recentEmergencies.map((emergency) => (
                  <div key={emergency._id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Emergency #{emergency._id.slice(-6)}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Status: {emergency.status}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Location: {emergency.location.address}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Time: {new Date(emergency.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
