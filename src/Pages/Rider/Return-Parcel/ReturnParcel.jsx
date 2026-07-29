import React, { useState } from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEdit,
  FiEye,
  FiTruck,
  FiUser,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';

const ReturnParcel = () => {
  const [isGridView, setIsGridView] = useState(false);

  // Fake data for the table
  const tableData = [
    {
      id: 1,
      createDate: '2024-01-15',
      invoiceNo: 'RTN-001',
      merchantName: 'ABC Store',
      merchantPhone: '+8801712345678',
      merchantAddress: '123 Shop Street, Dhaka',
      riderName: 'John Rider',
      createBy: 'System Auto',
      status: 'Pending',
    },
    {
      id: 2,
      createDate: '2024-01-15',
      invoiceNo: 'RTN-002',
      merchantName: 'XYZ Shop',
      merchantPhone: '+8801723456789',
      merchantAddress: '456 Market Road, Chittagong',
      riderName: 'Sarah Ahmed',
      createBy: 'Admin User',
      status: 'In Transit',
    },
    {
      id: 3,
      createDate: '2024-01-14',
      invoiceNo: 'RTN-003',
      merchantName: 'Super Mart',
      merchantPhone: '+8801734567890',
      merchantAddress: '789 Commercial Area, Sylhet',
      riderName: 'David Khan',
      createBy: 'System Auto',
      status: 'Completed',
    },
    {
      id: 4,
      createDate: '2024-01-14',
      invoiceNo: 'RTN-004',
      merchantName: 'Best Buy',
      merchantPhone: '+8801745678901',
      merchantAddress: '321 Business Center, Khulna',
      riderName: 'Lisa Rahman',
      createBy: 'Manager',
      status: 'Cancelled',
    },
    {
      id: 5,
      createDate: '2024-01-13',
      invoiceNo: 'RTN-005',
      merchantName: 'Tech World',
      merchantPhone: '+8801756789012',
      merchantAddress: '654 Tech Park, Rajshahi',
      riderName: 'Mike Hossain',
      createBy: 'System Auto',
      status: 'Pending',
    },
    {
      id: 6,
      createDate: '2024-01-13',
      invoiceNo: 'RTN-006',
      merchantName: 'Fashion Hub',
      merchantPhone: '+8801767890123',
      merchantAddress: '987 Fashion Street, Bogura',
      riderName: 'Anna Islam',
      createBy: 'Admin User',
      status: 'In Transit',
    },
    {
      id: 7,
      createDate: '2024-01-12',
      invoiceNo: 'RTN-007',
      merchantName: 'Home Decor',
      merchantPhone: '+8801778901234',
      merchantAddress: '234 Design Road, Rangpur',
      riderName: 'Robert Ali',
      createBy: 'System Auto',
      status: 'Completed',
    },
    {
      id: 8,
      createDate: '2024-01-12',
      invoiceNo: 'RTN-008',
      merchantName: 'Gadget Store',
      merchantPhone: '+8801789012345',
      merchantAddress: '567 Electronics Zone, Barisal',
      riderName: 'Maria Khan',
      createBy: 'Manager',
      status: 'Pending',
    },
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Pending: { color: 'bg-yellow-100 text-yellow-800', icon: FiClock },
      'In Transit': { color: 'bg-blue-100 text-blue-800', icon: FiTruck },
      Completed: { color: 'bg-green-100 text-green-800', icon: FiCheckCircle },
      Cancelled: { color: 'bg-red-100 text-red-800', icon: FiXCircle },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent size={12} className="mr-1" />
        {status}
      </span>
    );
  };

  // Mobile Card View
  const MobileCard = ({ item, index }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-medium text-gray-500">SL:</span>
          <p className="text-gray-900">{index + 1}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Date:</span>
          <p className="text-gray-900">{item.createDate}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Invoice:</span>
          <p className="text-blue-600 font-medium">{item.invoiceNo}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Status:</span>
          <StatusBadge status={item.status} />
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiUser size={12} />
            Merchant:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.merchantName}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiPhone size={12} />
            Phone:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.merchantPhone}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiUser size={12} />
            Rider:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.riderName}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500">Created By:</span>
          <p className="text-gray-900 text-sm">{item.createBy}</p>
        </div>
      </div>

      {/* Action Buttons for Mobile */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
        <button className="flex-1 min-w-[100px] bg-blue-600 text-white px-2 py-2 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiEye size={12} />
          View
        </button>
        <button className="flex-1 min-w-[100px] bg-green-600 text-white px-2 py-2 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiEdit size={12} />
          Process
        </button>
        <button className="flex-1 min-w-[100px] bg-purple-600 text-white px-2 py-2 rounded text-xs hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiTruck size={12} />
          Track
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Return Parcel Management
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and track return parcels efficiently
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-4 md:p-6">
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
                placeholder="Search return parcels..."
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

      {/* Mobile Card View */}
      {isGridView && (
        <div className="block md:hidden">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Return Parcels ({tableData.length})
            </h2>
          </div>
          {tableData.map((item, index) => (
            <MobileCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      {/* Tablet and Desktop Table View */}
      <div className={`${isGridView ? 'hidden md:block' : 'block'}`}>
        <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-4 md:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              Return Parcel List
              <span className="text-sm font-normal text-gray-500">
                ({tableData.length} parcels)
              </span>
            </h2>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] lg:min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SL.
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Create Date
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Invoice No
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Merchant Name
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Merchant Phone
                  </th>
                  <th className="hidden lg:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Merchant Address
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rider Name
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Create By
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.createDate}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {item.invoiceNo}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.merchantName}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <FiPhone size={14} className="text-gray-400" />
                        {item.merchantPhone}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-4 md:px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="flex items-start gap-2">
                        <FiMapPin
                          size={14}
                          className="text-gray-400 mt-0.5 flex-shrink-0"
                        />
                        <span className="truncate" title={item.merchantAddress}>
                          {item.merchantAddress}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <FiUser size={14} className="text-gray-400" />
                        {item.riderName}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.createBy}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
                          <FiEye size={12} />
                          <span className="hidden sm:inline">View</span>
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1.5 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center gap-1">
                          <FiEdit size={12} />
                          <span className="hidden sm:inline">Process</span>
                        </button>
                        <button className="bg-purple-600 text-white px-3 py-1.5 rounded text-xs hover:bg-purple-700 transition-colors duration-200 flex items-center gap-1">
                          <FiTruck size={12} />
                          <span className="hidden sm:inline">Track</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
              <div>
                Showing {tableData.length} of {tableData.length} entries
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">Rows per page:</span>
                <select className="bg-white border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnParcel;
