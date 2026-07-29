import React, { useState } from 'react';
import useTitle from '../../../Hooks/useTitle';
import {
  FiChevronDown,
  FiFilter,
  FiGrid,
  FiList,
  FiRefreshCcw,
  FiSearch,
} from 'react-icons/fi';

const CompanyInfo = () => {
  useTitle('Admin Dashboard | Company info');
  const [isGridView, setIsGridView] = useState(false);

  const companyData = [
    {
      sl: 1,
      name: 'Counter Express',
      companyInitial: 'CLD',
      title: 'Counter Express-Safe Secure Fastest Delivery',
      mobile: '01378886977',
      email: 'info@parcel.com',
      website: 'www.parcel.com',
      login: true,
      icon: true,
    },
    {
      sl: 2,
      name: 'Pathao Courier',
      companyInitial: 'PTC',
      title: 'Pathao Courier Service - Smart Delivery Nationwide',
      mobile: '09610007000',
      email: 'support@pathao.com',
      website: 'www.pathao.com/courier',
      login: true,
      icon: true,
    },
    {
      sl: 3,
      name: 'SteadFast Courier',
      companyInitial: 'SFC',
      title: 'SteadFast - Rapid Delivery Service',
      mobile: '09617005005',
      email: 'contact@steadfast.com.bd',
      website: 'www.steadfast.com.bd',
      login: true,
      icon: false,
    },
    {
      sl: 4,
      name: 'Sundarban Courier',
      companyInitial: 'SBC',
      title: 'Sundarban Courier - Trusted Nationwide Delivery',
      mobile: '01714000000',
      email: 'cs@sundarbancourier.com',
      website: 'www.sundarbancourier.com',
      login: false,
      icon: false,
    },
    {
      sl: 5,
      name: 'RedX Delivery',
      companyInitial: 'RDX',
      title: 'RedX - Smart & Smarter Logistics',
      mobile: '01847474747',
      email: 'business@redx.com.bd',
      website: 'www.redx.com.bd',
      login: true,
      icon: true,
    },
    {
      sl: 6,
      name: 'SA Paribahan',
      companyInitial: 'SAP',
      title: 'SA Paribahan – Reliable Cargo & Parcel Service',
      mobile: '01933333333',
      email: 'info@saparibahan.com',
      website: 'www.saparibahan.com',
      login: false,
      icon: false,
    },
  ];

  return (
    <div className="  min-h-screen">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Company (Information)
        </h1>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-t-xs shadow-sm border border-gray-200 p-4 md:p-6 ">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-48">
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
          </div>

          {/* Right Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-md transition-all duration-300 ${
                  !isGridView
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-white hover:shadow-sm'
                }`}
              >
                <FiList
                  size={16}
                  className={!isGridView ? 'text-blue-600' : 'text-gray-600'}
                />
              </button>
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-md transition-all duration-300 ${
                  isGridView
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-white hover:shadow-sm'
                }`}
              >
                <FiGrid
                  size={16}
                  className={isGridView ? 'text-blue-600' : 'text-gray-600'}
                />
              </button>
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiFilter size={16} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiRefreshCcw size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Export Basic Section */}
      <div className="bg-white rounded-b-xs shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Export Basic</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
            Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  SL.
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Company Initial
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Mobile
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Website
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Logo
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Icon
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companyData.map(company => (
                <tr key={company.sl} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    {company.sl}.
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    {company.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    {company.companyInitial}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border border-gray-200 max-w-xs">
                    {company.title}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    {company.mobile}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 border border-gray-200">
                    {company.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 border border-gray-200">
                    {company.website}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    <span className="text-green-500 text-lg">✅</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border border-gray-200">
                    <span className="text-green-500 text-lg">✅</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium border border-gray-200">
                    <button className="text-blue-600 hover:text-blue-900 font-semibold">
                      ✅ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {companyData.length} to {companyData.length} of{' '}
          {companyData.length} rows
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
