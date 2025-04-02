import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import EmergencyRequest from '../components/patient/EmergencyRequest';
import MedicalInfo from '../components/patient/MedicalInfo';

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeRequest, setActiveRequest] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulated data
        setPatientInfo({
          name: 'John Doe',
          emergencyContacts: [
            { name: 'Jane Doe', relationship: 'Spouse', phone: '123-456-7890' },
            { name: 'Mike Doe', relationship: 'Son', phone: '123-456-7891' }
          ],
          conditions: [
            'Type 2 Diabetes',
            'Hypertension'
          ],
          allergies: [
            'Penicillin',
            'Peanuts'
          ],
          medications: [
            { name: 'Metformin', dosage: '500mg daily' },
            { name: 'Lisinopril', dosage: '10mg daily' }
          ],
          insurance: {
            provider: 'HealthCare Plus',
            policyNumber: 'HC123456789',
            coverageType: 'Full Coverage'
          }
        });

        setActiveRequest({
          id: 'EMR001',
          status: 'en-route',
          eta: '8',
          ambulance: {
            id: 'AMB-007',
            type: 'Advanced Life Support'
          },
          emt: {
            id: 'EMT-123',
            name: 'Dr. Sarah Wilson',
            avatar: null
          },
          hospital: {
            name: 'Central City Hospital',
            address: '123 Healthcare Ave, City',
            emergencyContact: '555-EMERGENCY'
          }
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

  const handleEmergencyRequest = () => {
    // Handle new emergency request
    console.log('Emergency requested');
  };

  const handleCallEmt = (emtId) => {
    // Handle EMT call
    console.log('Calling EMT:', emtId);
  };

  const handleCallDispatch = () => {
    // Handle dispatch call
    console.log('Calling dispatch');
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
              {patientInfo && (
                <p className="mt-1 text-sm text-gray-500">Welcome back, {patientInfo.name}</p>
              )}
            </div>
            {!activeRequest && (
              <button
                onClick={handleEmergencyRequest}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                🚑 Request Emergency
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Emergency Request & Map */}
          <div className="lg:col-span-2 space-y-6">
            <EmergencyRequest
              request={activeRequest}
              onCallEmt={handleCallEmt}
              onCallDispatch={handleCallDispatch}
            />
            
            {/* Map */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 h-96 flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Right Column - Medical Info */}
          <div className="lg:col-span-1">
            <MedicalInfo patient={patientInfo} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
