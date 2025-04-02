import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import DashboardLayout from '../components/DashboardLayout';

const HospitalDashboard = () => {
  const [incomingPatients, setIncomingPatients] = useState([]);
  const [beds, setBeds] = useState({
    total: 0,
    available: 0,
    occupied: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
    // Set up real-time updates with Socket.IO
    // TODO: Implement Socket.IO connection
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [incomingPatientsRes, bedsRes] = await Promise.all([
        axios.get('/api/hospital/incoming-patients'),
        axios.get('/api/hospital/beds')
      ]);
      setIncomingPatients(incomingPatientsRes.data);
      setBeds(bedsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdmissionConfirm = async (patientId) => {
    try {
      await axios.post(`/api/hospital/confirm-admission/${patientId}`);
      // Update the local state to reflect the change
      setIncomingPatients(prevPatients =>
        prevPatients.map(patient =>
          patient.id === patientId
            ? { ...patient, status: 'admitted' }
            : patient
        )
      );
    } catch (error) {
      console.error('Error confirming admission:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
          <span className="text-sm text-gray-500">
            Hospital: {user?.hospitalName}
          </span>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Bed Status Overview */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Beds</dt>
                    <dd className="text-lg font-medium text-gray-900">{beds.total}</dd>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Available Beds</dt>
                    <dd className="text-lg font-medium text-gray-900">{beds.available}</dd>
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
                    <dt className="text-sm font-medium text-gray-500 truncate">Occupied Beds</dt>
                    <dd className="text-lg font-medium text-gray-900">{beds.occupied}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Incoming Patients */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Incoming Patients</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading patients...</div>
            ) : incomingPatients.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No incoming patients</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {incomingPatients.map((patient) => (
                  <div key={patient.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Patient: {patient.fullName}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Condition: {patient.condition}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          ETA: {patient.estimatedArrival}
                        </p>
                      </div>
                      {patient.status === 'arriving' && (
                        <button
                          onClick={() => handleAdmissionConfirm(patient.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Confirm Admission
                        </button>
                      )}
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

export default HospitalDashboard;
