import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const InsuranceDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [verificationRequests, setVerificationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchClaims();
    fetchVerificationRequests();
  }, []);

  const fetchClaims = async () => {
    try {
      const response = await axios.get('/api/insurance/claims');
      setClaims(response.data);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };

  const fetchVerificationRequests = async () => {
    try {
      const response = await axios.get('/api/insurance/verification-requests');
      setVerificationRequests(response.data);
    } catch (error) {
      console.error('Error fetching verification requests:', error);
    } finally {
      setLoading(false);
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

  const handleClaimProcess = async (claimId, status) => {
    try {
      await axios.put(`/api/insurance/claims/${claimId}`, { status });
      setClaims(prevClaims =>
        prevClaims.map(claim =>
          claim.id === claimId ? { ...claim, status } : claim
        )
      );
    } catch (error) {
      console.error('Error processing claim:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Insurance Dashboard</h1>
          <span className="text-sm text-gray-500">
            Insurance Provider: {user?.insuranceProvider}
          </span>
        </div>

        {/* Verification Requests */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pending Verifications</h2>
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

        {/* Claims */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Claims</h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {claims.map((claim) => (
                <li key={claim.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800">
                          Claim #{claim.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Patient: {claim.patientName}
                        </p>
                        <p className="text-sm text-gray-500">
                          Amount: ${claim.amount}
                        </p>
                        <p className="text-sm text-gray-500">
                          Service Date: {new Date(claim.serviceDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${claim.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            claim.status === 'approved' ? 'bg-green-100 text-green-800' : 
                            claim.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {claim.status}
                        </span>
                        {claim.status === 'pending' && (
                          <div className="ml-4 flex space-x-2">
                            <button
                              onClick={() => handleClaimProcess(claim.id, 'approved')}
                              className="bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleClaimProcess(claim.id, 'rejected')}
                              className="bg-[#004F98] text-white px-3 py-1 rounded-md text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDashboard;
