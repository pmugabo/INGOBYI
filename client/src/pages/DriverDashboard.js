import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const DriverDashboard = () => {
  const [activeRequests, setActiveRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapError, setMapError] = useState(false);
  const { user } = useAuth();

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '0.5rem'
  };

  useEffect(() => {
    fetchActiveRequests();
  }, []);

  const fetchActiveRequests = async () => {
    try {
      const response = await axios.get('/api/emergency-requests/active');
      setActiveRequests(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch active requests');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccept = async (requestId) => {
    try {
      await axios.post(`/api/emergency-requests/${requestId}/accept`, {
        driverId: user.id
      });
      // Update the local state or refetch requests
      await fetchActiveRequests();
    } catch (err) {
      console.error('Error accepting request:', err);
      setError('Failed to accept request');
    }
  };

  const handleMapError = () => {
    setMapError(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ingobyi-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Driver Dashboard
          </h2>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-md bg-ingobyi-blue-50">
          <p className="text-sm text-ingobyi-blue-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Requests List */}
        <div className="lg:col-span-1 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Active Requests
            </h3>
            {activeRequests.length === 0 ? (
              <p className="text-gray-500">No active emergency requests</p>
            ) : (
              <div className="space-y-4">
                {activeRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-gray-50 p-4 rounded-md cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <p className="font-medium text-gray-900">{request.condition}</p>
                    <p className="text-sm text-gray-500 mt-1">{request.address}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestAccept(request.id);
                      }}
                      className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-ingobyi-blue-500 hover:bg-ingobyi-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ingobyi-blue-500"
                    >
                      Accept Request
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-2">
          {!mapError ? (
            <LoadScript 
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              onError={handleMapError}
              onLoad={() => setMapError(false)}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={selectedRequest?.location || { lat: -1.9441, lng: 30.0619 }} // Default to Kigali
                zoom={13}
                onLoad={() => setMapError(false)}
                onError={handleMapError}
              >
                {activeRequests.map((request) => (
                  <Marker
                    key={request.id}
                    position={request.location}
                    onClick={() => setSelectedRequest(request)}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          ) : (
            <div className="h-full bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center p-6">
              <p className="text-gray-600 text-center">
                Map loading failed. You can still view and accept requests from the list.
                <br />
                <span className="text-sm mt-2 block">
                  Contact support if this issue persists.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
