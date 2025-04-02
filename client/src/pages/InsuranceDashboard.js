import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const InsuranceDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [stats, setStats] = useState({
    totalClaims: 0,
    pendingClaims: 0,
    approvedClaims: 0,
    rejectedClaims: 0
  });
  const [verificationRequests, setVerificationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
    fetchVerificationRequests();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [claimsRes, statsRes] = await Promise.all([
        axios.get('/api/insurance/claims'),
        axios.get('/api/insurance/stats')
      ]);
      setClaims(claimsRes.data);
      setStats(statsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchVerificationRequests = async () => {
    try {
      const response = await axios.get('/api/insurance/verification-requests');
      setVerificationRequests(response.data);
    } catch (error) {
      console.error('Error fetching verification requests:', error);
    }
  };

  const handleClaimProcess = async (claimId, status) => {
    try {
      await axios.post(`/api/insurance/claims/${claimId}/process`, { status });
      await fetchDashboardData();
    } catch (err) {
      setError('Failed to process claim');
    }
  };

  const handleVerificationResponse = async (requestId, isVerified) => {
    try {
      await axios.post(`/api/insurance/verify/${requestId}`, { isVerified });
      setVerificationRequests(requests =>
        requests.filter(request => request.id !== requestId)
      );
    } catch (error) {
      console.error('Error responding to verification:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Insurance Dashboard</h1>
        <span className="text-sm text-gray-500">
          Insurance Provider: {user?.insuranceProvider}
        </span>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Claims Statistics */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Claims</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalClaims}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Claims</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.pendingClaims}</dd>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Approved Claims</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.approvedClaims}</dd>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Rejected Claims</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.rejectedClaims}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Requests */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Verifications</h2>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : verificationRequests.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No pending verification requests</div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {verificationRequests.map((request) => (
                  <li key={request.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-800">
                            {request.patientName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Insurance Number: {request.insuranceNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            Service: {request.serviceType}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleVerificationResponse(request.id, true)}
                            className="bg-[#004F98] text-white px-3 py-1 rounded-md text-sm"
                          >
                            Verify
                          </button>
                          <button
                            onClick={() => handleVerificationResponse(request.id, false)}
                            className="bg-[#004F98] text-white px-3 py-1 rounded-md text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Claims List */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Claims</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading claims...</div>
            ) : claims.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No claims found</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {claims.map((claim) => (
                  <div key={claim._id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Claim #{claim._id.slice(-6)}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Patient: {claim.patientName}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Amount: ${claim.amount}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Service: {claim.service}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleClaimProcess(claim._id, 'approved')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleClaimProcess(claim._id, 'rejected')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
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

export default InsuranceDashboard;
