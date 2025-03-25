import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const InsuranceDashboard = () => {
  const [activeRequests, setActiveRequests] = useState([]);
  const [verifiedCases, setVerifiedCases] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [stats, setStats] = useState({
    totalVerified: 0,
    totalPending: 0,
    totalProcessed: 0,
    totalAmount: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
    fetchActiveRequests();
    fetchVerifiedCases();
    fetchPendingPayments();

    // Set up real-time updates
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_INSURANCE_REQUEST') {
        setActiveRequests(prev => [data.request, ...prev]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/insurance/stats', {
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

  const fetchActiveRequests = async () => {
    try {
      const response = await fetch('/api/insurance/active-requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setActiveRequests(data);
    } catch (error) {
      console.error('Error fetching active requests:', error);
    }
  };

  const fetchVerifiedCases = async () => {
    try {
      const response = await fetch('/api/insurance/verified-cases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setVerifiedCases(data);
    } catch (error) {
      console.error('Error fetching verified cases:', error);
    }
  };

  const fetchPendingPayments = async () => {
    try {
      const response = await fetch('/api/insurance/pending-payments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setPendingPayments(data);
    } catch (error) {
      console.error('Error fetching pending payments:', error);
    }
  };

  const handleVerification = async (requestId, isVerified) => {
    try {
      await fetch(`/api/insurance/verify/${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ verified: isVerified })
      });
      fetchActiveRequests();
      fetchVerifiedCases();
      fetchStats();
    } catch (error) {
      console.error('Error updating verification:', error);
    }
  };

  const handlePayment = async (paymentId) => {
    try {
      await fetch(`/api/insurance/process-payment/${paymentId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchPendingPayments();
      fetchStats();
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Total Verified</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalVerified}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Pending Verification</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.totalPending}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Processed Claims</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalProcessed}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Total Amount</h3>
          <p className="text-3xl font-bold text-purple-600">${stats.totalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Active Requests */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Active Verification Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Insurance Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Emergency Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {activeRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {request.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {request.insuranceNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {request.provider}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {request.emergencyType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleVerification(request.id, true)}
                      className="text-green-600 hover:text-green-900 mr-4"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleVerification(request.id, false)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pending Payments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Pending Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Case ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Service Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
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
              {pendingPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {payment.caseId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {payment.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(payment.serviceDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        payment.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handlePayment(payment.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Process Payment
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

export default InsuranceDashboard;
