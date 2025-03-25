import React, { useState } from 'react';

const Help = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I request emergency assistance?',
      answer: 'Click the "Emergency" button on the homepage or navigation menu. Fill in the required information about the emergency, and our system will dispatch the nearest available help.'
    },
    {
      question: 'How long does it take for help to arrive?',
      answer: 'Response times vary based on your location and the nature of the emergency. Our system automatically dispatches the nearest available unit to minimize wait times.'
    },
    {
      question: 'Does Ingobyi work with insurance providers?',
      answer: 'Yes, we work with major insurance providers. You can verify your insurance coverage directly through our platform.'
    },
    {
      question: 'What information do I need to provide during an emergency?',
      answer: 'Basic information includes your location, nature of the emergency, and any relevant medical conditions. Having your profile completed beforehand helps speed up the process.'
    },
    {
      question: 'Can I track the ambulance in real-time?',
      answer: "Yes, once an emergency request is accepted, you can track the response team's location in real-time through our platform."
    }
  ];

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Help Center</h1>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for help..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto">
        <div className="flex mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'faq'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'contact'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Us
          </button>
        </div>

        {/* FAQ Content */}
        {activeTab === 'faq' && (
          <div>
            <div className="bg-white px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Frequently Asked Questions
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl className="divide-y divide-gray-200">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">{faq.question}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {/* Contact Form */}
        {activeTab === 'contact' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Help;
