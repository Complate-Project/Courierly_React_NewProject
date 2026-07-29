import React, { useState } from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiDownload,
  FiCalendar,
} from 'react-icons/fi';

const ParcelHistory = () => {
  const [isGridView, setIsGridView] = useState(false);

  // Fake data matching the image
  const tableData = [
    {
      id: 1,
      trackingId: 'CL010562421',
      pickupDate: '16-07-2024',
      merchantName: 'Test Business',
      customerName: 'Monir',
      customerPhone: '1710000018',
      customerAddress: 'Banan, Dhaka',
      invoiceValue: '1000',
      type: 'Regular',
    },
    {
      id: 2,
      trackingId: 'CL010562419',
      pickupDate: '16-07-2024',
      merchantName: 'Test Business',
      customerName: 'Monir',
      customerPhone: '1710000016',
      customerAddress: 'Banan, Dhaka',
      invoiceValue: '1000',
      type: 'Regular',
    },
    {
      id: 3,
      trackingId: 'CL010562418',
      pickupDate: '16-07-2024',
      merchantName: 'Test Business',
      customerName: 'Monir',
      customerPhone: '1710000015',
      customerAddress: 'Banan, Dhaka',
      invoiceValue: '1000',
      type: 'Regular',
    },
    {
      id: 4,
      trackingId: 'CL010562411',
      pickupDate: '18-07-2024',
      merchantName: 'Test Business',
      customerName: 'Monir',
      customerPhone: '1710000028',
      customerAddress: 'Banan, Dhaka',
      invoiceValue: '1000',
      type: 'Regular',
    },
    {
      id: 5,
      trackingId: 'CL010562413',
      pickupDate: '26-07-2024',
      merchantName: 'Test Business',
      customerName: 'Monir',
      customerPhone: '1710000010',
      customerAddress: 'Banan, Dhaka',
      invoiceValue: '1000',
      type: 'Regular',
    },
    {
      id: 6,
      trackingId: 'CL010562415',
      pickupDate: '31-07-2024',
      merchantName: 'Test Business',
      customerName: 'Monir',
      customerPhone: '1710000012',
      customerAddress: 'Banan, Dhaka',
      invoiceValue: '1000',
      type: 'Regular',
    },
    {
      id: 7,
      trackingId: 'CL010562428',
      pickupDate: '18-08-2024',
      merchantName: 'Test Business',
      customerName: 'M Test',
      customerPhone: '01700000000',
      customerAddress: 'Address house road area',
      invoiceValue: '1000',
      type: 'Regular',
    },
    {
      id: 8,
      trackingId: 'CL010562414',
      pickupDate: '24-08-2024',
      merchantName: 'Test Business',
      customerName: 'Monir',
      customerPhone: '1710000011',
      customerAddress: 'Banan, Dhaka',
      invoiceValue: '1000',
      type: 'Regular',
    },
    {
      id: 9,
      trackingId: 'CL010562420',
      pickupDate: '24-08-2024',
      merchantName: 'Test Business',
      customerName: 'Monir',
      customerPhone: '1710000017',
      customerAddress: 'Banan, Dhaka',
      invoiceValue: '1000',
      type: 'Regular',
    },
    {
      id: 10,
      trackingId: 'CL010562416',
      pickupDate: '24-08-2024',
      merchantName: 'Test Business',
      customerName: 'Monir',
      customerPhone: '1710000013',
      customerAddress: 'Banan, Dhaka',
      invoiceValue: '1000',
      type: 'Regular',
    },
  ];

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Rider Order History
        </h1>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Status Filter */}
            <div className="relative w-full sm:w-48">
              <select className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full">
                <option>--select status--</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Cancelled</option>
              </select>
              <FiChevronDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>

            {/* Date From */}
            <div className="relative w-full sm:w-40">
              <FiCalendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="date"
                className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                placeholder="From Date"
              />
            </div>

            {/* Date To */}
            <div className="relative w-full sm:w-40">
              <FiCalendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="date"
                className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                placeholder="To Date"
              />
            </div>

            {/* Load Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center">
              Load
            </button>

            {/* Export Button */}
            <button className="bg-white border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center">
              <FiDownload size={16} />
              Export Basic
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 lg:flex-none">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full lg:w-64"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                <FiRefreshCcw size={16} className="text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                <FiList size={16} className="text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                <FiGrid size={16} className="text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                <FiFilter size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  SL
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Tracking ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Pickup Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Merchant Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Customer Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Customer Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Customer Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Invoice Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {index + 1}.
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 border-r border-gray-200">
                    {item.trackingId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.pickupDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.merchantName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.customerName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.customerPhone}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200 max-w-xs">
                    <div className="truncate" title={item.customerAddress}>
                      {item.customerAddress}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.invoiceValue}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {item.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div>Showing 1 to 10 of 222 rows</div>
            <div className="flex items-center gap-2">
              <span>10</span>
              <select className="bg-white border border-gray-300 rounded px-2 py-1 text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>rows per page</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelHistory;
