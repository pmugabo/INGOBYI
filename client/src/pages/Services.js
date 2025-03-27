import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'Emergency Response',
      description: 'Quick and efficient emergency medical response with real-time tracking and status updates.',
      features: [
        'Real-time ambulance tracking',
        '24/7 emergency dispatch',
        'Trained medical professionals',
        'GPS-optimized routing'
      ],
      icon: '🚑'
    },
    {
      title: 'Insurance Integration',
      description: 'Seamless insurance verification and claims processing during emergencies.',
      features: [
        'Real-time coverage verification',
        'Automated claims processing',
        'Direct insurance billing',
        'Coverage status updates'
      ],
      icon: '📋'
    },
    {
      title: 'Hospital Network',
      description: 'Access to our extensive network of partner hospitals and medical facilities.',
      features: [
        'Pre-admission processing',
        'Hospital bed availability',
        'Specialist coordination',
        'Medical record sharing'
      ],
      icon: '🏥'
    },
    {
      title: 'Patient Care Management',
      description: 'Comprehensive patient care coordination and monitoring.',
      features: [
        'Digital medical records',
        'Treatment tracking',
        'Medication management',
        'Follow-up care scheduling'
      ],
      icon: '👨‍⚕️'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-12">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/ambulances our service.jpeg"
            alt="Ambulances Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-ingobyi-blue-500 bg-opacity-60 backdrop-blur-sm rounded-lg shadow-lg p-10">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                Our Services
              </h1>
              <p className="mt-4 text-lg text-white sm:text-xl max-w-2xl mx-auto">
                Comprehensive emergency medical services with cutting-edge technology integration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className={`relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
              service.title === 'Emergency Response' || service.title === 'Insurance Integration' || service.title === 'Hospital Network' || service.title === 'Patient Care Management' ? 'min-h-[400px]' : ''
            }`}>
              {(service.title === 'Emergency Response' || service.title === 'Insurance Integration' || service.title === 'Hospital Network' || service.title === 'Patient Care Management') && (
                <div className="absolute inset-0">
                  <img
                    src={
                      service.title === 'Emergency Response' ? 
                        '/images/inside ambulance.jpeg' : 
                      service.title === 'Insurance Integration' ?
                        '/images/insurance.PNG' :
                      service.title === 'Hospital Network' ?
                        '/images/hospital network.PNG' :
                        '/images/patient care management.PNG'
                    }
                    alt={`${service.title} Background`}
                    className={`w-full h-full object-cover ${
                      service.title === 'Emergency Response' ? 'blur-[0.7px]' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
              )}
              <div className={`${
                service.title === 'Emergency Response' || service.title === 'Insurance Integration' || service.title === 'Hospital Network' || service.title === 'Patient Care Management' ? 'p-6 pt-12 relative text-white z-10' : 'p-6 relative'
              }`}>
                {(service.title !== 'Emergency Response' && service.title !== 'Insurance Integration' && service.title !== 'Hospital Network' && service.title !== 'Patient Care Management') && (
                  <div className="text-5xl mb-4">{service.icon}</div>
                )}
                <h3 className={`${
                  service.title === 'Emergency Response' || service.title === 'Insurance Integration' || service.title === 'Hospital Network' || service.title === 'Patient Care Management' ? 'text-3xl font-bold mb-4 text-white' : 'text-2xl font-bold mb-4 text-gray-900'
                }`}>{service.title}</h3>
                <p className={`mb-6 ${
                  service.title === 'Emergency Response' || service.title === 'Insurance Integration' || service.title === 'Hospital Network' || service.title === 'Patient Care Management' ? 'text-lg text-gray-100' : 'text-gray-600'
                }`}>{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className={`flex items-center ${
                      service.title === 'Emergency Response' || service.title === 'Insurance Integration' || service.title === 'Hospital Network' || service.title === 'Patient Care Management' ? 'text-lg text-gray-100' : 'text-gray-600'
                    }`}>
                      <svg className={`h-5 w-5 mr-2 ${
                        service.title === 'Emergency Response' || service.title === 'Insurance Integration' || service.title === 'Hospital Network' || service.title === 'Patient Care Management' ? 'text-white' : 'text-ingobyi-blue-500'
                      }`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Need Emergency Assistance?</span>
            <span className="block text-ingobyi-blue-500">Call our 24/7 emergency hotline: 707</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/emergency"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ingobyi-blue-500 hover:bg-ingobyi-blue-600"
              >
                Request Emergency
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
