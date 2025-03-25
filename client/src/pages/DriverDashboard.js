import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const DriverDashboard = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [activeEmergency, setActiveEmergency] = useState(null);
  const [status, setStatus] = useState('available');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const { user } = useAuth();

  useEffect(() => {
    // Get driver's current location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(newLocation);
          updateDriverLocation(newLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }

    // Fetch pending emergencies
    fetchEmergencies();

    // Set up real-time updates
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'NEW_EMERGENCY') {
        setEmergencies(prev => [...prev, data.emergency]);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const updateDriverLocation = async (newLocation) => {
    try {
      await fetch('/api/driver/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          driverId: user.id,
          location: newLocation
        })
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const fetchEmergencies = async () => {
    try {
      const response = await fetch('/api/driver/emergencies', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setEmergencies(data);
    } catch (error) {
      console.error('Error fetching emergencies:', error);
    }
  };

  const acceptEmergency = async (emergencyId) => {
    try {
      const response = await fetch(`/api/driver/accept-emergency/${emergencyId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setActiveEmergency(data);
      setStatus('en-route');
    } catch (error) {
      console.error('Error accepting emergency:', error);
    }
  };

  const updateEmergencyStatus = async (newStatus) => {
    try {
      await fetch(`/api/emergency/${activeEmergency.id}/status`, {
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
        {/* Status Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Driver Status</h2>
          <div className="flex items-center space-x-4 mb-6">
            <div
              className={`h-4 w-4 rounded-full ${
                status === 'available'
                  ? 'bg-green-500'
                  : status === 'en-route'
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

        {/* Active Emergency Section */}
        {activeEmergency && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Active Emergency
            </h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Location:</strong> {activeEmergency.address}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Type:</strong> {activeEmergency.type}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Description:</strong> {activeEmergency.description}
              </p>
              <div className="flex space-x-4">
                {status === 'en-route' && (
                  <button
                    onClick={() => updateEmergencyStatus('arrived')}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    Mark as Arrived
                  </button>
                )}
                {status === 'arrived' && (
                  <button
                    onClick={() => updateEmergencyStatus('completed')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Complete Emergency
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Pending Emergencies Section */}
        {!activeEmergency && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Pending Emergencies
            </h2>
            {emergencies.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No pending emergencies</p>
            ) : (
              <div className="space-y-4">
                {emergencies.map((emergency) => (
                  <div
                    key={emergency.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Location:</strong> {emergency.address}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Type:</strong> {emergency.type}
                    </p>
                    <button
                      onClick={() => acceptEmergency(emergency.id)}
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Accept Emergency
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

export default DriverDashboard;
