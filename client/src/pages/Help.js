import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
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
      title: 'General Inquiries',
      description: 'Questions about our services, partnerships, or general information about Ingobyi.',
      email: 'general@ingobyi.com',
      phone: '706',
      icon: '📞'
    },
    {
      title: 'Technical Support',
      description: 'Get help with the app, account issues, or any technical difficulties.',
      email: 'tech@ingobyi.com',
      phone: '708',
      icon: '🔧'
    },
    {
      title: 'Emergency Support',
      description: 'Urgent assistance for emergency response and ambulance services.',
      email: 'emergency@ingobyi.com',
      phone: '707',
      icon: '🚑'
    },
    {
      title: 'Insurance Inquiries',
      description: 'Questions about insurance coverage, claims, and documentation.',
      email: 'insurance@ingobyi.com',
      phone: '709',
      icon: '📋'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-ingobyi-blue-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">How can we help you?</h1>
            <p className="mt-3 text-xl text-white">
              Find answers to common questions or get in touch with our support team
            </p>
          </div>
        </div>
      </div>

      {/* Support Categories */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {helpCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-ingobyi-blue-600 mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-ingobyi-blue-500">Email: </span>
                  <a href={`mailto:${category.email}`} className="text-gray-600 hover:text-ingobyi-blue-500">
                    {category.email}
                  </a>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-ingobyi-blue-500">Phone: </span>
                  <a href={`tel:${category.phone}`} className="text-gray-600 hover:text-ingobyi-blue-500">
                    {category.phone}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-4 focus:outline-none"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    <span className={`transform transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
