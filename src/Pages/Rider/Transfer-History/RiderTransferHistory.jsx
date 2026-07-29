import React from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiDownload,
  FiCalendar,
  FiEye,
} from 'react-icons/fi';

const RiderTransferHistory = () => {
  // Fake data matching the image
  const tableData = [
    {
      id: 1,
      date: '16-07-2024',
      invoiceId: 'T8D57720',
      pickupAddress: 'nikunja 1 road 3/c',
      deliveryAddress: 'Head Office',
      status: 'complete',
      type: 'delivery',
      amount: '0.0000',
    },
    {
      id: 2,
      date: '16-07-2024',
      invoiceId: 'T8DH72471',
      pickupAddress: 'Head Office',
      deliveryAddress: 'nikunja 1 road 3/c',
      status: 'complete',
      type: 'delivery',
      amount: '0.0000',
    },
    {
      id: 3,
      date: '17-07-2024',
      invoiceId: 'T8DH65032',
      pickupAddress: 'Head Office',
      deliveryAddress: 'Sub Dhaka',
      status: 'complete',
      type: 'delivery',
      amount: '0.0000',
    },
    {
      id: 4,
      date: '26-07-2024',
      invoiceId: 'T8DH52253',
      pickupAddress: 'Head Office',
      deliveryAddress: 'out of dhaka',
      status: 'complete',
      type: 'delivery',
      amount: '0.0000',
    },
    {
      id: 5,
      date: '16-07-2024',
      invoiceId: 'T8R88934',
      pickupAddress: 'nikunja 1 road 3/c',
      deliveryAddress: 'Head Office',
      status: 'complete',
      type: 'return',
      amount: '0.0000',
    },
    {
      id: 6,
      date: '16-07-2024',
      invoiceId: 'T8RH99855',
      pickupAddress: 'Head Office',
      deliveryAddress: 'nikunja 1 road 3/c',
      status: 'complete',
      type: 'return',
      amount: '0.0000',
    },
    {
      id: 7,
      date: '26-09-2024',
      invoiceId: 'T8D34337',
      pickupAddress: 'nikunja 1 road 3/c',
      deliveryAddress: 'Head Office',
      status: 'complete',
      type: 'delivery',
      amount: '0.0000',
    },
    {
      id: 8,
      date: '26-09-2024',
      invoiceId: 'T8DH36118',
      pickupAddress: 'Head Office',
      deliveryAddress: 'nikunja 1 road 3/c',
      status: 'complete',
      type: 'delivery',
      amount: '0.0000',
    },
    {
      id: 9,
      date: '26-09-2024',
      invoiceId: 'T8R83239',
      pickupAddress: 'nikunja 1 road 3/c',
      deliveryAddress: 'Head Office',
      status: 'complete',
      type: 'return',
      amount: '0.0000',
    },
    {
      id: 10,
      date: '26-09-2024',
      invoiceId: 'T8RH903110',
      pickupAddress: 'Head Office',
      deliveryAddress: 'nikunja 1 road 3/c',
      status: 'complete',
      type: 'return',
      amount: '0.0000',
    },
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        {status}
      </span>
    );
  };

  // Type badge component
  const TypeBadge = ({ type }) => {
    const typeConfig = {
      delivery: { color: 'bg-blue-100 text-blue-800', label: 'delivery' },
      return: { color: 'bg-orange-100 text-orange-800', label: 'return' },
    };

    const config = typeConfig[type] || typeConfig.delivery;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Report (collected)
        </h1>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left Controls */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto items-end">
            {/* Date From */}
            <div className="relative w-full sm:w-40">
              <span className="block text-sm text-gray-600 mb-1">From:</span>
              <div className="flex items-center">
                <FiCalendar
                  className="absolute left-3 text-gray-400"
                  size={16}
                />
                <input
                  type="date"
                  defaultValue="2025-10-22"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm 
        focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* Date To */}
            <div className="relative w-full sm:w-40">
              <span className="block text-sm text-gray-600 mb-1">To:</span>
              <div className="flex items-center">
                <FiCalendar
                  className="absolute left-3 text-gray-400"
                  size={16}
                />
                <input
                  type="date"
                  defaultValue="2025-10-25"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm 
        focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* Load Button */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 
    transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto"
            >
              Load
            </button>

            {/* Export Button */}
            <button
              className="bg-white border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50 
    transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto"
            >
              <FiDownload size={16} />
              Export Basic
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 w-full lg:w-auto mt-6 sm:mt-0">
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
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Invoice ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Pickup Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Delivery Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.date}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 border-r border-gray-200">
                    {item.invoiceId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200 max-w-xs">
                    <div className="truncate" title={item.pickupAddress}>
                      {item.pickupAddress}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200 max-w-xs">
                    <div className="truncate" title={item.deliveryAddress}>
                      {item.deliveryAddress}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                    <TypeBadge type={item.type} />
                  </td>
                  <td className="  text-sm text-gray-900">
                    <button className="bg-blue-600 hover:bg-blue-700 px-2 text-white ml-2 rounded-xs flex items-center gap-1 py-0.5">
                      <FiEye size={10} />
                      <span className="hidden sm:inline">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div>Showing 1 to 10 of 88 rows</div>
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

export default RiderTransferHistory;
