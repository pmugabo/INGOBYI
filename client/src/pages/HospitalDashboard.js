import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const HospitalDashboard = () => {
  const [incomingPatients, setIncomingPatients] = useState([]);
  const [admittedPatients, setAdmittedPatients] = useState([]);
  const [resources, setResources] = useState({
    beds: { total: 0, available: 0 },
    icu: { total: 0, available: 0 },
    ambulances: { total: 0, available: 0 }
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchIncomingPatients();
    fetchAdmittedPatients();
    fetchResources();

    // Set up real-time updates
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_INCOMING_PATIENT') {
        setIncomingPatients(prev => [...prev, data.patient]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const fetchIncomingPatients = async () => {
    try {
      const response = await fetch('/api/hospital/incoming-patients', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setIncomingPatients(data);
    } catch (error) {
      console.error('Error fetching incoming patients:', error);
    }
  };

  const fetchAdmittedPatients = async () => {
    try {
      const response = await fetch('/api/hospital/admitted-patients', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAdmittedPatients(data);
    } catch (error) {
      console.error('Error fetching admitted patients:', error);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/hospital/resources', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handlePatientAdmission = async (patientId) => {
    try {
      await fetch(`/api/hospital/admit-patient/${patientId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Update lists
      setIncomingPatients(prev => prev.filter(p => p.id !== patientId));
      fetchAdmittedPatients();
      fetchResources();
    } catch (error) {
      console.error('Error admitting patient:', error);
    }
  };

  const handlePatientDischarge = async (patientId) => {
    try {
      await fetch(`/api/hospital/discharge-patient/${patientId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Update lists
      setAdmittedPatients(prev => prev.filter(p => p.id !== patientId));
      fetchResources();
    } catch (error) {
      console.error('Error discharging patient:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Hospital Beds</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{resources.beds.available}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{resources.beds.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">ICU Units</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{resources.icu.available}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{resources.icu.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Ambulances</h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">{resources.ambulances.available}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-600 dark:text-gray-400">{resources.ambulances.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Incoming Patients */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Incoming Patients</h2>
        {incomingPatients.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No incoming patients</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Emergency Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ETA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {incomingPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {patient.emergencyType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {patient.eta} mins
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handlePatientAdmission(patient.id)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.status === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}`}
                      >
                        Admit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admitted Patients */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Admitted Patients</h2>
        {admittedPatients.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No admitted patients</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Admission Date
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
                {admittedPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {patient.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {patient.room}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {new Date(patient.admissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-white">
                      {patient.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handlePatientDischarge(patient.id)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.status === 'discharged' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}
                      >
                        Discharge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalDashboard;
