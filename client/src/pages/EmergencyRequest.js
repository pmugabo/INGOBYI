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
  const [mapError, setMapError] = useState(false);
  const { user } = useAuth();

  const mapContainerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '0.5rem'
  };

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
          setMapError(true);
        }
      );
    } else {
      setMapError(true);
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

    try {
      // Create the emergency request
      const response = await axios.post('/api/emergency-requests', {
        userId: user.id,
        location,
        address,
        condition,
        additionalNotes
      });

      setRequestStatus({
        type: 'success',
        message: 'Emergency request submitted successfully. Help is on the way!'
      });
    } catch (error) {
      setRequestStatus({
        type: 'error',
        message: 'Failed to submit emergency request. Please try again or call 707.'
      });
    }

    setLoading(false);
  };

  const handleMapError = () => {
    setMapError(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-8">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold text-gray-900">EMERGENCY REQUEST</h1>
            <p className="mt-4 text-2xl font-medium text-ingobyi-blue-600">
              Please provide accurate information to help us respond quickly
            </p>
          </div>
        </div>
      </div>

      {/* Map */}
      {location && !mapError ? (
        <div className="mb-6">
          <LoadScript 
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onError={handleMapError}
            onLoad={() => setMapError(false)}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location}
              zoom={15}
              onLoad={() => setMapError(false)}
              onError={handleMapError}
            >
              <Marker position={location} />
            </GoogleMap>
          </LoadScript>
        </div>
      ) : (
        <div className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-gray-600">
            {mapError ? (
              <>
                Map loading failed. Don't worry, you can still submit your emergency request.
                Your location has been captured{location ? ' successfully' : ', please ensure location services are enabled'}.
              </>
            ) : (
              'Getting your location...'
            )}
          </p>
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
                    className="shadow-sm focus:ring-ingobyi-blue-500 focus:border-ingobyi-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your location"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700">
                  Emergency Condition
                </label>
                <div className="mt-1">
                  <select
                    id="condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="shadow-sm focus:ring-ingobyi-blue-500 focus:border-ingobyi-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select condition</option>
                    <option value="accident">Accident</option>
                    <option value="cardiac">Cardiac Emergency</option>
                    <option value="respiratory">Respiratory Emergency</option>
                    <option value="trauma">Trauma</option>
                    <option value="other">Other</option>
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
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={3}
                    className="shadow-sm focus:ring-ingobyi-blue-500 focus:border-ingobyi-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Any additional information that might help emergency responders"
                  />
                </div>
              </div>

              {requestStatus && (
                <div
                  className={`p-4 rounded-md ${
                    requestStatus.type === 'success' ? 'bg-green-50' : 'bg-red-50'
                  }`}
                >
                  <p
                    className={`text-sm ${
                      requestStatus.type === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {requestStatus.message}
                  </p>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ingobyi-blue-500 hover:bg-ingobyi-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ingobyi-blue-500 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Submitting...' : 'Submit Emergency Request'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmergencyRequest;
