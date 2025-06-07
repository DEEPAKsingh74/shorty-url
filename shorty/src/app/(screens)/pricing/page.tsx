"use client";

import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import RazorpayButton from '@/app/components/ui/payment/RazorPayButton';

const PricingPage = () => {
  const [urlCount, setUrlCount] = useState(1);
  const pricePerUrl = 50;
  const totalPrice = urlCount * pricePerUrl;

  const features = [
    "Real-time click analytics",
    "Geographic data (country/city)",
    "Device & browser breakdown",
    "Custom dashboard for each URL",
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Pay only for what you need. ₹{pricePerUrl} per URL.</p>

        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">URL Analytics</h2>
                <p className="text-gray-600 mt-2">Track clicks, locations, devices, and more</p>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="flex items-center">
                  <span className="text-5xl font-bold text-blue-600">₹{totalPrice}</span>
                  <span className="ml-2 text-gray-500">/ month</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Billed monthly</p>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label htmlFor="url-count" className="block text-lg font-medium text-gray-700">
                  Number of URLs to track
                </label>
                <span className="text-lg font-semibold text-gray-900">{urlCount} URL{urlCount !== 1 ? 's' : ''}</span>
              </div>
              <input
                type="range"
                id="url-count"
                min="1"
                max="100"
                value={urlCount}
                onChange={(e) => setUrlCount(parseInt(e.target.value))}
                className="w-full h-3 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 URL</span>
                <span>100 URLs</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-lg font-medium text-gray-900 mb-4">What&apos;s included:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FiCheck className="text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <RazorpayButton
              amount={totalPrice}
              description={`${urlCount} URL${urlCount !== 1 ? 's' : ''} Plan`}
              urlCount={urlCount}
            />
          </div>

          <div className="bg-gray-50 px-8 py-6 text-center">
            <p className="text-gray-600">
              Need more than 100 URLs?{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
                Contact us for enterprise pricing
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;