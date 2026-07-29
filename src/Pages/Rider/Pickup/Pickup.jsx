import React, { useState } from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
} from 'react-icons/fi';
import useTitle from '../../../Hooks/useTitle';

const Pickup = () => {
  useTitle('Rider Dashboard | Pickup');
  const [activeTab, setActiveTab] = useState('pickup');

  // 🧩 Fake Data
  const pickupData = [
    {
      id: 1,
      date: '2025-10-23',
      trackingId: 'PK12345',
      merchant: 'ABC Store',
      customer: 'John Doe',
      address: 'House 12, Road 5, Dhaka',
    },
    {
      id: 2,
      date: '2025-10-22',
      trackingId: 'PK12346',
      merchant: 'XYZ Shop',
      customer: 'Jane Smith',
      address: '23 Green Road, Rajshahi',
    },
  ];

  const autoPickupData = [
    {
      id: 1,
      trackingId: 'AP98765',
      pickupDate: '2025-10-25',
      pickupTime: '10:30 AM',
      merchant: 'TechBazaar',
      type: 'Scheduled',
      status: 'Pending',
    },
    {
      id: 2,
      trackingId: 'AP98766',
      pickupDate: '2025-10-26',
      pickupTime: '2:00 PM',
      merchant: 'Digital Mart',
      type: 'Scheduled',
      status: 'Completed',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Pickup Management
          </h1>
          <p className="text-gray-600">
            Manage and track your pickup orders efficiently
          </p>
        </div>

        {/* Tabs - Segmented Control */}
        <div className="mt-4 md:mt-0">
          <div className="relative bg-gray-100 rounded-lg p-1 inline-flex">
            <div
              className={`absolute top-1 bottom-1 rounded-md bg-blue-600 transition-all duration-300 ${
                activeTab === 'pickup' ? 'left-1 w-20' : 'left-[90px] w-24'
              }`}
            />
            <button
              onClick={() => setActiveTab('pickup')}
              className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 z-10 ${
                activeTab === 'pickup'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Pickup
            </button>
            <button
              onClick={() => setActiveTab('auto-pickup')}
              className={`relative px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 z-10 ${
                activeTab === 'auto-pickup'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Auto Pickup
            </button>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xs shadow-sm border border-gray-200 p-6 ">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                <option>Export All</option>
                <option>Export Selected</option>
                <option>Export CSV</option>
              </select>
              <FiChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>

            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                <option>--- Select Merchant ---</option>
                <option>ABC Store</option>
                <option>XYZ Shop</option>
              </select>
              <FiChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>

            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium flex items-center gap-2 justify-center">
              <FiRefreshCcw size={16} />
              Load Data
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full lg:w-64"
              />
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiRefreshCcw size={16} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-md bg-white shadow-sm transition-all duration-300">
                <FiList size={16} className="text-blue-600" />
              </button>
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiGrid size={16} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiFilter size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-xs shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {activeTab === 'auto-pickup' ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Auto Pickup Order List
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Pickup Order List
              </>
            )}
          </h2>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'pickup' ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SL.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Create Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Merchant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pickupData.map((item, i) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm">{i + 1}</td>
                    <td className="px-6 py-4 text-sm">{item.date}</td>
                    <td className="px-6 py-4 text-sm">{item.trackingId}</td>
                    <td className="px-6 py-4 text-sm">{item.merchant}</td>
                    <td className="px-6 py-4 text-sm">{item.customer}</td>
                    <td className="px-6 py-4 text-sm">{item.address}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-blue-600 hover:underline">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SL.
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pickup Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pickup Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Merchant
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {autoPickupData.map((item, i) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm">{i + 1}</td>
                    <td className="px-6 py-4 text-sm">{item.trackingId}</td>
                    <td className="px-6 py-4 text-sm">{item.pickupDate}</td>
                    <td className="px-6 py-4 text-sm">{item.pickupTime}</td>
                    <td className="px-6 py-4 text-sm">{item.merchant}</td>
                    <td className="px-6 py-4 text-sm">{item.type}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-blue-600 hover:underline">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pickup;
