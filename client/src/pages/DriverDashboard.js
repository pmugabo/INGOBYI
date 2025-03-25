import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const DriverDashboard = () => {
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmergencyRequests();
    getCurrentLocation();
    // TODO: Set up Socket.IO for real-time updates
  }, []);

  const fetchEmergencyRequests = async () => {
    try {
      const response = await axios.get('/api/driver/emergency-requests');
      setEmergencyRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      await axios.put(`/api/driver/emergency-requests/${requestId}`, { status });
      setEmergencyRequests(requests =>
        requests.map(request =>
          request.id === requestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>

        {/* Map Section */}
        <div className="mt-6">
          <div className="bg-white shadow sm:rounded-lg">
            {currentLocation && (
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={currentLocation}
                  zoom={13}
                >
                  <Marker position={currentLocation} />
                  {emergencyRequests.map(request => (
                    <Marker
                      key={request.id}
                      position={request.location}
                      onClick={() => setSelectedRequest(request)}
                    />
                  ))}
                </GoogleMap>
              </LoadScript>
            )}
          </div>
        </div>

        {/* Emergency Requests List */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency Requests</h2>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : emergencyRequests.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No emergency requests</div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {emergencyRequests.map((request) => (
                  <li key={request.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-red-600 truncate">
                              {request.patientName}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                  request.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                                  'bg-gray-100 text-gray-800'}`}>
                                {request.status}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Condition: {request.condition}
                            </p>
                            <p className="text-sm text-gray-500">
                              Location: {request.address}
                            </p>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          {request.status === 'pending' && (
                            <button
                              onClick={() => handleStatusUpdate(request.id, 'accepted')}
                              className="ml-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                            >
                              Accept
                            </button>
                          )}
                          {request.status === 'accepted' && (
                            <button
                              onClick={() => handleStatusUpdate(request.id, 'completed')}
                              className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
