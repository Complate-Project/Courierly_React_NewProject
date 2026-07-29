import React, { useState } from 'react';
import {
  FiChevronDown,
  FiFilter,
  FiGrid,
  FiList,
  FiRefreshCcw,
  FiSearch,
} from 'react-icons/fi';

const RiderRescheduleOrder = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isGridView, setIsGridView] = useState(false);

  // Sample data
  const orders = [
    {
      id: 1,
      trackingId: 'TRK001234',
      riderName: 'John Doe',
      merchantName: 'Food Mart',
      customerName: 'Alice Johnson',
      customerPhone: '+1-555-0101',
      customerAddress: '123 Main St, Cityville',
      note: 'Call before delivery',
      status: 'Pending',
      invoiceValue: 45.5,
      collectedAmount: 45.5,
    },
    {
      id: 2,
      trackingId: 'TRK001235',
      riderName: 'Sarah Wilson',
      merchantName: 'Tech Store',
      customerName: 'Bob Smith',
      customerPhone: '+1-555-0102',
      customerAddress: '456 Oak Ave, Townsville',
      note: 'Fragile handle with care',
      status: 'Rescheduled',
      invoiceValue: 120.75,
      collectedAmount: 0,
    },
    {
      id: 3,
      trackingId: 'TRK001236',
      riderName: 'Mike Chen',
      merchantName: 'Fashion Hub',
      customerName: 'Carol Davis',
      customerPhone: '+1-555-0103',
      customerAddress: '789 Pine Rd, Villagetown',
      note: 'Leave at front desk',
      status: 'Completed',
      invoiceValue: 89.99,
      collectedAmount: 89.99,
    },
    {
      id: 4,
      trackingId: 'TRK001237',
      riderName: 'John Doe',
      merchantName: 'Book Paradise',
      customerName: 'David Wilson',
      customerPhone: '+1-555-0104',
      customerAddress: '321 Elm St, Hamlet City',
      note: 'Customer will reschedule',
      status: 'Pending',
      invoiceValue: 34.25,
      collectedAmount: 0,
    },
  ];

  const handleSelectRow = id => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = e => {
    if (e.target.checked) {
      setSelectedRows(orders.map(order => order.id));
    } else {
      setSelectedRows([]);
    }
  };

  const totalCollectedAmount = orders
    .filter(order => selectedRows.includes(order.id))
    .reduce((sum, order) => sum + order.collectedAmount, 0);

  const getStatusBadge = status => {
    const statusColors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Rescheduled: 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
      {/* Export Selected Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedRows.length === orders.length && orders.length > 0
                    }
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SL
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tracking ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rider Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Merchant Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collected Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(order.id)}
                      onChange={() => handleSelectRow(order.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                    {order.trackingId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {order.riderName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {order.merchantName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {order.customerPhone}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                    {order.customerAddress}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                    {order.note}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    ${order.invoiceValue.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    ${order.collectedAmount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      Reschedule
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Collected Amount */}
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm font-medium text-gray-700">
            Total Collected Amount:{' '}
            <span className="text-green-600 font-bold">
              ${totalCollectedAmount.toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiderRescheduleOrder;
