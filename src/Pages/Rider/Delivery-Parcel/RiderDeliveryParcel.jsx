import React, { useState } from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiTruck,
  FiCalendar,
  FiPackage,
  FiCornerUpLeft,
} from 'react-icons/fi';

const RiderDeliveryParcel = () => {
  const [isGridView, setIsGridView] = useState(false);

  // Fake data for the table
  const tableData = [
    {
      id: 1,
      trackingId: 'TRK123456',
      merchantName: 'ABC Store',
      merchantPhone: '+8801712345678',
      customerName: 'John Doe',
      customerNumber: '+8801812345678',
      customerAddress: '123 Main St, Dhaka',
      type: 'Express',
      partial: 'No',
      invoiceValue: '৳1,250',
    },
    {
      id: 2,
      trackingId: 'TRK123457',
      merchantName: 'XYZ Shop',
      merchantPhone: '+8801723456789',
      customerName: 'Jane Smith',
      customerNumber: '+8801823456789',
      customerAddress: '456 Oak Ave, Chittagong',
      type: 'Standard',
      partial: 'Yes',
      invoiceValue: '৳2,800',
    },
    {
      id: 3,
      trackingId: 'TRK123458',
      merchantName: 'Super Mart',
      merchantPhone: '+8801734567890',
      customerName: 'Mike Johnson',
      customerNumber: '+8801834567890',
      customerAddress: '789 Pine Rd, Sylhet',
      type: 'Express',
      partial: 'No',
      invoiceValue: '৳3,500',
    },
    {
      id: 4,
      trackingId: 'TRK123459',
      merchantName: 'Best Buy',
      merchantPhone: '+8801745678901',
      customerName: 'Sarah Wilson',
      customerNumber: '+8801845678901',
      customerAddress: '321 Elm St, Khulna',
      type: 'Standard',
      partial: 'No',
      invoiceValue: '৳1,750',
    },
    {
      id: 5,
      trackingId: 'TRK123460',
      merchantName: 'Tech World',
      merchantPhone: '+8801756789012',
      customerName: 'David Brown',
      customerNumber: '+8801856789012',
      customerAddress: '654 Maple Dr, Rajshahi',
      type: 'Express',
      partial: 'Yes',
      invoiceValue: '৳4,200',
    },
  ];

  // Mobile Card View
  const MobileCard = ({ item, index }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-medium text-gray-500">SL:</span>
          <p className="text-gray-900">{index + 1}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Tracking ID:</span>
          <p className="text-blue-600 font-medium">{item.trackingId}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Merchant:</span>
          <p className="text-gray-900">{item.merchantName}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Type:</span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              item.type === 'Express'
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {item.type}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-500">Customer:</span>
          <p className="text-gray-900">{item.customerName}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Invoice:</span>
          <p className="text-gray-900 font-semibold">{item.invoiceValue}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500">Address:</span>
          <p className="text-gray-900 text-sm">{item.customerAddress}</p>
        </div>
      </div>

      {/* Action Buttons for Mobile */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
        <button className="flex-1 min-w-[120px] bg-green-600 text-white px-3 py-2 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiTruck size={12} />
          Deliver
        </button>
        <button className="flex-1 min-w-[120px] bg-blue-600 text-white px-3 py-2 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiCalendar size={12} />
          Reschedule
        </button>
        <button className="flex-1 min-w-[120px] bg-yellow-600 text-white px-3 py-2 rounded text-xs hover:bg-yellow-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiPackage size={12} />
          Partial
        </button>
        <button className="flex-1 min-w-[120px] bg-red-600 text-white px-3 py-2 rounded text-xs hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiCornerUpLeft size={12} />
          Return
        </button>
      </div>
    </div>
  );

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Delivery Order List Management
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and track your pickup orders efficiently
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-4 md:p-6 ">
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

      {/* Mobile Card View */}
      {isGridView && (
        <div className="block md:hidden">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Delivery Parcels ({tableData.length})
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
              Delivery Parcel List
              <span className="text-sm font-normal text-gray-500">
                ({tableData.length} orders)
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
                    Tracking ID
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Merchant
                  </th>
                  <th className="hidden lg:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Merchant Phone
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="hidden xl:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer Phone
                  </th>
                  <th className="hidden 2xl:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="hidden md:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Partial
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Invoice
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
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {item.trackingId}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{item.merchantName}</div>
                        <div className="text-gray-500 text-xs lg:hidden">
                          {item.merchantPhone}
                        </div>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.merchantPhone}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{item.customerName}</div>
                        <div className="text-gray-500 text-xs xl:hidden">
                          {item.customerNumber}
                        </div>
                      </div>
                    </td>
                    <td className="hidden xl:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.customerNumber}
                    </td>
                    <td className="hidden 2xl:table-cell px-4 md:px-6 py-4 text-sm text-gray-900">
                      <div
                        className="max-w-xs truncate"
                        title={item.customerAddress}
                      >
                        {item.customerAddress}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.type === 'Express'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-4 md:px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.partial === 'Yes'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {item.partial}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {item.invoiceValue}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        <button className="bg-green-600 text-white px-2 py-1.5 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center gap-1">
                          <FiTruck size={10} />
                          <span className="hidden sm:inline">Deliver</span>
                        </button>
                        <button className="bg-blue-600 text-white px-2 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
                          <FiCalendar size={10} />
                          <span className="hidden sm:inline">Reschedule</span>
                        </button>
                        <button className="bg-yellow-600 text-white px-2 py-1.5 rounded text-xs hover:bg-yellow-700 transition-colors duration-200 flex items-center gap-1">
                          <FiPackage size={10} />
                          <span className="hidden sm:inline">Partial</span>
                        </button>
                        <button className="bg-red-600 text-white px-2 py-1.5 rounded text-xs hover:bg-red-700 transition-colors duration-200 flex items-center gap-1">
                          <FiCornerUpLeft size={10} />
                          <span className="hidden sm:inline">Return</span>
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

export default RiderDeliveryParcel;
