import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const HospitalDashboard = () => {
  const [incomingPatients, setIncomingPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchIncomingPatients();
    // Set up real-time updates with Socket.IO
    // TODO: Implement Socket.IO connection
  }, []);

  const fetchIncomingPatients = async () => {
    try {
      const response = await axios.get('/api/hospital/incoming-patients');
      setIncomingPatients(response.data);
    } catch (error) {
      console.error('Error fetching incoming patients:', error);
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
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
          <span className="text-sm text-gray-500">
            Hospital: {user?.hospitalName}
          </span>
        </div>

        {/* Incoming Patients */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Incoming Patients</h2>
          
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : incomingPatients.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No incoming patients</div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {incomingPatients.map((patient) => (
                  <li key={patient.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-[#004F98] truncate">
                              {patient.fullName}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${patient.status === 'en_route' ? 'bg-yellow-100 text-yellow-800' : 
                                  patient.status === 'arriving' ? 'bg-green-100 text-green-800' : 
                                  'bg-gray-100 text-gray-800'}`}>
                                {patient.status}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                Condition: {patient.condition}
                              </p>
                              <p className="text-sm text-gray-500">
                                ETA: {patient.estimatedArrival}
                              </p>
                            </div>
                            {patient.status === 'arriving' && (
                              <button
                                onClick={() => handleAdmissionConfirm(patient.id)}
                                className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[#004F98] hover:bg-[#003d7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004F98]"
                              >
                                Confirm Admission
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Recent Admissions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Admissions</h2>
          {/* Add recent admissions list here */}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
