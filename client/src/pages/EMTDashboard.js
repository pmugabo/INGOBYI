import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const EMTDashboard = () => {
  const [activeCase, setActiveCase] = useState(null);
  const [availableCases, setAvailableCases] = useState([]);
  const [status, setStatus] = useState('available');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const { user } = useAuth();

  useEffect(() => {
    // Get EMT's current location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(newLocation);
          updateEMTLocation(newLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Fetch available cases
    fetchAvailableCases();

    // Set up real-time updates
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_EMERGENCY') {
        setAvailableCases(prev => [...prev, data.emergency]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const updateEMTLocation = async (newLocation) => {
    try {
      await fetch('/api/emt/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          emtId: user.id,
          location: newLocation
        })
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const fetchAvailableCases = async () => {
    try {
      const response = await fetch('/api/emt/available-cases', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setAvailableCases(data);
    } catch (error) {
      console.error('Error fetching available cases:', error);
    }
  };

  const acceptCase = async (caseId) => {
    try {
      const response = await fetch(`/api/emt/accept-case/${caseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setActiveCase(data);
      setStatus('responding');
    } catch (error) {
      console.error('Error accepting case:', error);
    }
  };

  const updateCaseStatus = async (newStatus) => {
    try {
      await fetch(`/api/emt/case/${activeCase.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      setStatus(newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* EMT Status Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">EMT Status</h2>
          <div className="flex items-center space-x-4 mb-6">
            <div
              className={`h-4 w-4 rounded-full ${
                status === 'available'
                  ? 'bg-green-500'
                  : status === 'responding'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            ></div>
            <span className="text-lg capitalize text-gray-700 dark:text-gray-300">
              {status}
            </span>
          </div>
          {location.lat && location.lng && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current Location: {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
            </p>
          )}
        </div>

        {/* Active Case Section */}
        {activeCase && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Active Case
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Patient Name</p>
                  <p className="text-lg text-gray-900 dark:text-white">{activeCase.patientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Type</p>
                  <p className="text-lg text-gray-900 dark:text-white">{activeCase.emergencyType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="text-lg text-gray-900 dark:text-white">{activeCase.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <p className="text-lg text-gray-900 dark:text-white capitalize">{status}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  Patient Vitals
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Blood Pressure</p>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800"
                      placeholder="120/80"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</p>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800"
                      placeholder="BPM"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Temperature</p>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800"
                      placeholder="°C"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Oxygen Saturation</p>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800"
                      placeholder="%"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                {status === 'responding' && (
                  <button
                    onClick={() => updateCaseStatus('on-scene')}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                  >
                    Mark as Arrived
                  </button>
                )}
                {status === 'on-scene' && (
                  <button
                    onClick={() => updateCaseStatus('transporting')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Start Transport
                  </button>
                )}
                {status === 'transporting' && (
                  <button
                    onClick={() => updateCaseStatus('completed')}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Complete Case
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Available Cases Section */}
        {!activeCase && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Available Cases
            </h2>
            {availableCases.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No available cases</p>
            ) : (
              <div className="space-y-4">
                {availableCases.map((case_) => (
                  <div
                    key={case_.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Patient Name</p>
                        <p className="text-lg text-gray-900 dark:text-white">{case_.patientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Type</p>
                        <p className="text-lg text-gray-900 dark:text-white">{case_.emergencyType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                        <p className="text-lg text-gray-900 dark:text-white">{case_.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Distance</p>
                        <p className="text-lg text-gray-900 dark:text-white">{case_.distance} km</p>
                      </div>
                    </div>
                    <button
                      onClick={() => acceptCase(case_.id)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Accept Case
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EMTDashboard;
