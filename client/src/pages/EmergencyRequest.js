import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const EmergencyRequest = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [condition, setCondition] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(currentLocation);
          reverseGeocode(currentLocation);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const reverseGeocode = async (location) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      if (response.data.results[0]) {
        setAddress(response.data.results[0].formatted_address);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRequestStatus(null);

    try {
      const response = await axios.post('/api/emergency/request', {
        location,
        address,
        condition,
        additionalNotes,
        patientId: user.id
      });
      
      setRequestStatus({
        type: 'success',
        message: 'Emergency request sent successfully! Help is on the way.'
      });
      
      // Start listening for updates on the request
      // TODO: Implement Socket.IO connection for real-time updates
    } catch (error) {
      setRequestStatus({
        type: 'error',
        message: 'Failed to send emergency request. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '300px'
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Request</h1>
          <p className="mt-2 text-sm text-gray-600">
            Please provide accurate information to help us respond quickly
          </p>
        </div>

        {/* Map */}
        {location && (
          <div className="mb-6">
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={location}
                zoom={15}
              >
                <Marker position={location} />
              </GoogleMap>
            </LoadScript>
          </div>
        )}

        {/* Request Form */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="shadow-sm focus:ring-[#004F98] focus:border-[#004F98] block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                    Medical Condition/Emergency Type
                  </label>
                  <div className="mt-1">
                    <select
                      id="condition"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      className="shadow-sm focus:ring-[#004F98] focus:border-[#004F98] block w-full sm:text-sm border-gray-300 rounded-md"
                      required
                    >
                      <option value="">Select condition</option>
                      <option value="cardiac">Cardiac Emergency</option>
                      <option value="respiratory">Respiratory Distress</option>
                      <option value="trauma">Trauma/Injury</option>
                      <option value="stroke">Stroke Symptoms</option>
                      <option value="allergic">Severe Allergic Reaction</option>
                      <option value="other">Other Medical Emergency</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Additional Notes
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="notes"
                      rows={3}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="shadow-sm focus:ring-[#004F98] focus:border-[#004F98] block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Any additional information that might help emergency responders"
                    />
                  </div>
                </div>

                {requestStatus && (
                  <div className={`rounded-md p-4 ${
                    requestStatus.type === 'success' ? 'bg-green-50' : 'bg-red-50'
                  }`}>
                    <p className={`text-sm ${
                      requestStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {requestStatus.message}
                    </p>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004F98] hover:bg-[#003d7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004F98]"
                  >
                    {loading ? 'Sending Request...' : 'Send Emergency Request'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequest;
