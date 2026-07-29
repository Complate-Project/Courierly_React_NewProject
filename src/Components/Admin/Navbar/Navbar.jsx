import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import {
  FiMenu,
  FiUser,
  FiSearch,
  FiBell,
  FiMessageSquare,
} from 'react-icons/fi';
import DateTime from '../../../Shared/DateTime/DateTime';

const Navbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
  };

  const handleSearch = e => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="w-full bg-white shadow-md top-0 z-50 sticky">
      {/* ================== Top Section ================== */}
      <div className="flex justify-between items-center px-4 md:px-8 py-3">
        {/* ===== Left Section (Menu + Title + Date) ===== */}
        <div className="flex items-center gap-3">
          {/* Sidebar toggle for mobile */}
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-indigo-600 focus:outline-none lg:block "
          >
            <FiMenu className="h-7 w-7" />
          </button>

          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
              Courier Service - Admin
            </h1>
            <DateTime />
          </div>
        </div>

        {/* ===== Middle Section (Search Bar) ===== */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <form onSubmit={handleSearch} className="w-full max-w-lg relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search packages, riders, customers..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition"
            />
          </form>
        </div>

        {/* ===== Right Section (Icons + Profile) ===== */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition">
            <FiBell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Messages */}
          <button className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-100 rounded-full transition">
            <FiMessageSquare className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              7
            </span>
          </button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center gap-3 border-l border-gray-200 pl-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <FiUser className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>

            <button
              onClick={handleLogout}
              className="hidden md:block bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ================== Quick Search Filters ================== */}
      <div className="hidden md:block bg-gray-50 border-t border-gray-200 px-6 py-2">
        <div className="flex items-center space-x-4 text-sm">
          <span className="text-gray-600 font-medium">Quick Search:</span>
          <div className="flex space-x-3">
            {[
              { label: 'Packages', query: '#PK-' },
              { label: 'Riders', query: 'rider:' },
              { label: 'Customers', query: 'customer:' },
              { label: 'Branches', query: 'branch:' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => setSearchQuery(item.query)}
                className="text-gray-600 hover:text-indigo-600 transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
