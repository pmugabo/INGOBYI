import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import VehicleStatus from '../components/driver/VehicleStatus';
import EmergencyAlert from '../components/driver/EmergencyAlert';
import PerformanceStats from '../components/driver/PerformanceStats';

const DriverDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeEmergency, setActiveEmergency] = useState(null);
  const [emergencies, setEmergencies] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const [stats, setStats] = useState(null);
  const [location, setLocation] = useState(null);

  // Simulated data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulated data
        setActiveEmergency({
          id: 'EMG123',
          location: '123 Emergency St, Downtown',
          description: 'Cardiac emergency, elderly patient',
          priority: 'high',
          eta: '8 mins'
        });

        setEmergencies([
          {
            id: 'EMG001',
            patientName: 'John Smith',
            location: '456 Main St',
            hospital: 'St. Mary Hospital',
            status: 'en-route',
            priority: 'high',
            description: 'Cardiac arrest, requires immediate attention',
            eta: '5 mins'
          },
          {
            id: 'EMG002',
            patientName: 'Sarah Johnson',
            location: '789 Oak Ave',
            hospital: 'Central Hospital',
            status: 'pending',
            priority: 'medium',
            description: 'Broken arm, conscious and stable',
            eta: '15 mins'
          }
        ]);

        setVehicle({
          id: 'AMB-001',
          fuelLevel: 75,
          status: 'ready',
          mileage: 45280,
          nextService: '500 km',
          alerts: ['Tire pressure low']
        });

        setStats({
          avgResponseTime: '7.2',
          tripsToday: '5',
          totalDistance: '120',
          recentActivity: [
            { description: 'Completed emergency transport', time: '10 mins ago' },
            { description: 'Refueled vehicle', time: '1 hour ago' },
            { description: 'Started shift', time: '3 hours ago' }
          ]
        });

        // Get current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              });
            },
            (err) => console.error('Error getting location:', err)
          );
        }

        setError('');
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Set up periodic refresh
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyAccept = async (emergencyId) => {
    try {
      // Accept emergency through API
      // await axios.post(`/api/emergencies/${emergencyId}/accept`);
      setActiveEmergency(null);
    } catch (err) {
      setError('Failed to accept emergency');
    }
  };

  const handleEmergencyDecline = async (emergencyId) => {
    try {
      // Decline emergency through API
      // await axios.post(`/api/emergencies/${emergencyId}/decline`);
      setActiveEmergency(null);
    } catch (err) {
      setError('Failed to decline emergency');
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="p-2 text-gray-400 hover:text-gray-500"
              >
                🔄
              </button>
              {location && (
                <span className="text-sm text-gray-500">
                  📍 {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </span>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {/* Emergency Alert */}
        {activeEmergency && (
          <div className="mb-6">
            <EmergencyAlert
              alert={activeEmergency}
              onAccept={handleEmergencyAccept}
              onDecline={handleEmergencyDecline}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Active Emergencies */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Active Emergencies</h2>
              <div className="space-y-4">
                {emergencies.map(emergency => (
                  <div
                    key={emergency.id}
                    className={`p-4 rounded-lg border ${
                      emergency.priority === 'high' ? 'bg-red-50 border-red-200' :
                      emergency.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-green-50 border-green-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{emergency.patientName}</h3>
                        <p className="text-sm mt-1">{emergency.description}</p>
                        <div className="mt-2 space-y-1 text-sm">
                          <p>📍 Pickup: {emergency.location}</p>
                          <p>🏥 Hospital: {emergency.hospital}</p>
                          <p>⏱️ ETA: {emergency.eta}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs capitalize ${
                        emergency.status === 'en-route' ? 'bg-blue-100 text-blue-800' :
                        emergency.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {emergency.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <VehicleStatus vehicle={vehicle} />
          </div>

          {/* Right Column - Map and Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 h-96 flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Coming Soon</p>
              </div>
            </div>

            {/* Performance Stats */}
            <PerformanceStats stats={stats} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DriverDashboard;
