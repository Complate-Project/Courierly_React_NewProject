import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { FiHome, FiRefreshCw, FiAlertTriangle, FiMail } from 'react-icons/fi';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <FiAlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border-4 border-red-200 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            {error?.status || '404'}
          </h1>

          {/* Main Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {error?.status === 404 ? 'Page Not Found' : 'Something Went Wrong'}
          </h2>

          {/* Error Details */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-gray-200 max-w-md mx-auto">
            <p className="text-gray-600 text-lg mb-4">
              {error?.statusText ||
                error?.message ||
                'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
            </p>
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <FiHome className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 border border-gray-300"
            >
              <FiRefreshCw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center space-x-4 opacity-40">
            <div
              className="w-3 h-3 bg-red-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.3s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
