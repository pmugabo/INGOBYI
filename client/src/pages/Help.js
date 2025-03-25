import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: 'How do I request emergency services?',
      answer: 'You can request emergency services through our app by clicking the "Request Emergency" button on the homepage or by calling our emergency number 707. The app will automatically detect your location and dispatch the nearest available ambulance.'
    },
    {
      question: 'How does insurance verification work?',
      answer: 'Our system automatically verifies your insurance coverage in real-time when you request emergency services. You just need to ensure your insurance information is up to date in your profile.'
    },
    {
      question: 'What hospitals are in your network?',
      answer: 'We partner with major hospitals across the country. When you request emergency services, we will direct you to the nearest and most appropriate facility based on your condition and insurance coverage.'
    },
    {
      question: 'Can I track the ambulance in real-time?',
      answer: 'Yes, once an ambulance is dispatched, you can track its location in real-time through our app. You will also receive estimated arrival time updates.'
    },
    {
      question: 'What information do I need to register?',
      answer: 'To register, you will need to provide your full name, contact information, national ID, and insurance details. This information helps us provide faster service during emergencies.'
    }
  ];

  const helpCategories = [
    {
      title: 'Emergency Services',
      description: 'Get help with emergency requests and ambulance services',
      icon: '',
      contact: 'emergency@ingobyi.com'
    },
    {
      title: 'Insurance Support',
      description: 'Assistance with insurance verification and claims',
      icon: '',
      contact: 'insurance@ingobyi.com'
    },
    {
      title: 'Technical Support',
      description: 'Help with app-related issues and account management',
      icon: '',
      contact: 'support@ingobyi.com'
    },
    {
      title: 'General Inquiries',
      description: 'General questions and partnership opportunities',
      icon: '',
      contact: 'info@ingobyi.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-#004F98 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Help Center
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Find answers to common questions and get support when you need it
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('faq')}
              className={`${
                activeTab === 'faq'
                  ? 'border-#004F98 text-#004F98'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Frequently Asked Questions
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`${
                activeTab === 'help'
                  ? 'border-#004F98 text-#004F98'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Help & Support
            </button>
          </nav>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'faq' ? (
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white shadow rounded-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <svg
                    className={`h-6 w-6 transform ${openFaq === index ? 'rotate-180' : ''} text-gray-500`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {helpCategories.map((category) => (
              <div key={category.title} className="bg-white shadow rounded-lg p-6">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                <p className="mt-2 text-gray-600">{category.description}</p>
                <div className="mt-4">
                  <a
                    href={`mailto:${category.contact}`}
                    className="text-#004F98 hover:text-#003d7a font-medium"
                  >
                    {category.contact}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Contact */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Need immediate assistance?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Our support team is available 24/7
            </p>
            <p className="mt-2 text-xl text-[#004F98]">
              Call our hotline at 707
            </p>
            <div className="mt-8">
              <Link
                to="/emergency"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-#004F98 hover:bg-#003d7a"
              >
                Request Emergency Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
