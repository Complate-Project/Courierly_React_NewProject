import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Hooks/useAuth';
import { FiMenu, FiUser, FiSearch, FiBell, FiMapPin } from 'react-icons/fi';
import DateTime from '../../../Shared/DateTime/DateTime';

const Navbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = e => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-40">
      <div className="flex flex-wrap justify-between items-center px-4 sm:px-6 py-3">
        {/* Left: Menu & Logo */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 hover:text-indigo-600 focus:outline-none"
          >
            <FiMenu className="h-7 w-7" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              Courier Service - Rider
            </h1>
            <DateTime />
          </div>
        </div>

        {/* Center: Desktop Search */}
        <div className="flex-1 max-w-2xl mx-4 hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search packages, riders, customers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 hover:bg-gray-100 transition"
            />
          </form>
        </div>

        {/* Right: Icons & User */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition"
          >
            <FiSearch className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition">
            <FiBell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </button>

          {/* Location (hidden on very small screens) */}
          <button className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 px-2 py-1 rounded-md transition">
            <FiMapPin className="h-4 w-4" />
            <span className="text-sm">Downtown</span>
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-2 sm:space-x-3 border-l border-gray-200 pl-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <FiUser className="h-4 w-4 text-green-600" />
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-800">Rider Name</p>
              <p className="text-xs text-gray-500">Available</p>
            </div>
            <button
              onClick={handleLogout}
              className="hidden sm:block bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-indigo-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="w-full mt-3 md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search packages, riders, customers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 hover:bg-gray-100 transition"
              />
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
