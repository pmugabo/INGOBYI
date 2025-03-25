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
      <div className="bg-[#004F98] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Our Services
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Comprehensive emergency medical services with cutting-edge technology integration
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-[#004F98] mr-2" fill="currentColor" viewBox="0 0 20 20">
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
            <span className="block">Ready to get started?</span>
            <span className="block text-[#004F98]">Register now and access our services.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#004F98] hover:bg-[#003d7a]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
