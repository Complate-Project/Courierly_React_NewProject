import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiUser, FiSearch } from 'react-icons/fi';
import { useAuth } from '../../../Hooks/useAuth';
import DateTime from '../../../Shared/DateTime/DateTime';

const Navbar = ({ toggleSidebar }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav className="w-full bg-bg shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="flex flex-wrap justify-between items-center px-4 md:px-6 py-3">
        {/* Left: Menu & Logo */}
        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={toggleSidebar}
            className="text-text-main hover:text-text-main focus:outline-none"
          >
            <FiMenu className="h-8 w-8" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-text-main -mb-1">
              Courier Service - Branch
            </h1>
            <DateTime />
          </div>
        </div>

        {/* Center: Desktop Search */}
        <div className="flex-1 max-w-2xl mx-4 md:mx-8 hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-inverse w-5 h-5" />
            <input
              type="text"
              placeholder="Search packages, riders, customers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-bg transition-colors"
            />
          </form>
        </div>

        {/* Right: User Info & Mobile Search */}
        <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition"
          >
            <FiSearch className="h-5 w-5" />
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-2 md:space-x-3 border-l border-gray-200 pl-2 md:pl-3">
            <div className="flex items-center space-x-1 md:space-x-2">
              <div className="flex items-center justify-center h-8 w-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full">
                <FiUser className="h-4 w-4 text-blue-600" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || 'Branch Manager'}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {user?.branch || 'Main Branch'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="hidden sm:block bg-btn-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-btn-primary-hover focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isMobileSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-inverse h-4 w-4" />
            <input
              type="text"
              placeholder="Search parcels, tracking numbers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
