import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../components/DashboardLayout';
import LiveAlerts from '../components/emt/LiveAlerts';
import EmergencyList from '../components/emt/EmergencyList';
import PatientInfo from '../components/emt/PatientInfo';
import PerformanceMetrics from '../components/emt/PerformanceMetrics';

const EMTDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [emergencies, setEmergencies] = useState([]);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [location, setLocation] = useState(null);

  // Simulated data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulated data
        setAlerts([
          { message: "New emergency case assigned" },
          { message: "Hospital St. Mary's is ready to receive patient" }
        ]);

        setEmergencies([
          {
            id: 1,
            patientName: "John Doe",
            description: "Cardiac arrest, requires immediate attention",
            location: "123 Main St",
            eta: "5 mins",
            urgencyLevel: "high",
            status: "assigned"
          },
          {
            id: 2,
            patientName: "Jane Smith",
            description: "Broken arm, conscious and stable",
            location: "456 Oak Ave",
            eta: "10 mins",
            urgencyLevel: "medium",
            status: "in-transit"
          }
        ]);

        setMetrics({
          avgResponseTime: "8.5",
          casesToday: "12",
          successRate: "95"
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
            (err) => console.error("Error getting location:", err)
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

  const handleEmergencySelect = (emergency) => {
    setSelectedEmergency({
      ...emergency,
      caseId: "EMT" + emergency.id,
      timestamp: new Date().toISOString(),
      age: "45",
      bloodType: "O+",
      insurance: "Medicare",
      medicalHistory: "Hypertension, Diabetes Type 2",
      allergies: ["Penicillin", "Latex"],
      hospital: "St. Mary's Hospital",
      department: "Emergency Department",
      status: emergency.urgencyLevel === "high" ? "critical" : "stable"
    });
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">EMT Dashboard</h1>
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
          <div className="mt-4">
            <LiveAlerts alerts={alerts} />
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emergency List */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Active Emergencies</h2>
              <EmergencyList
                emergencies={emergencies}
                onSelect={handleEmergencySelect}
              />
            </div>
          </div>

          {/* Map and Patient Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-500">Interactive Map Coming Soon</p>
            </div>

            {/* Patient Info */}
            {selectedEmergency && (
              <PatientInfo patient={selectedEmergency} />
            )}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h2>
          <PerformanceMetrics metrics={metrics} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EMTDashboard;
