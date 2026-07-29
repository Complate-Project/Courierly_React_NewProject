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
  FiEye,
  FiEdit,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from 'react-icons/fi';

const RiderReturnHistory = () => {
  const [isGridView, setIsGridView] = useState(false);

  // Fake data for the table
  const tableData = [
    {
      id: 1,
      createDate: '2024-01-15',
      invoiceNo: 'RTN-001',
      merchantName: 'ABC Store',
      riderName: 'John Rider',
      createBy: 'System Auto',
      updateBy: 'Admin User',
      securityCode: 'SEC-001',
      status: 'Pending',
    },
    {
      id: 2,
      createDate: '2024-01-15',
      invoiceNo: 'RTN-002',
      merchantName: 'XYZ Shop',
      riderName: 'Sarah Ahmed',
      createBy: 'Admin User',
      updateBy: 'Manager',
      securityCode: 'SEC-002',
      status: 'In Progress',
    },
    {
      id: 3,
      createDate: '2024-01-14',
      invoiceNo: 'RTN-003',
      merchantName: 'Super Mart',
      riderName: 'David Khan',
      createBy: 'System Auto',
      updateBy: 'System Auto',
      securityCode: 'SEC-003',
      status: 'Completed',
    },
    {
      id: 4,
      createDate: '2024-01-14',
      invoiceNo: 'RTN-004',
      merchantName: 'Best Buy',
      riderName: 'Lisa Rahman',
      createBy: 'Manager',
      updateBy: 'Admin User',
      securityCode: 'SEC-004',
      status: 'Cancelled',
    },
    {
      id: 5,
      createDate: '2024-01-13',
      invoiceNo: 'RTN-005',
      merchantName: 'Tech World',
      riderName: 'Mike Hossain',
      createBy: 'System Auto',
      updateBy: 'Manager',
      securityCode: 'SEC-005',
      status: 'Pending',
    },
    {
      id: 6,
      createDate: '2024-01-13',
      invoiceNo: 'RTN-006',
      merchantName: 'Fashion Hub',
      riderName: 'Anna Islam',
      createBy: 'Admin User',
      updateBy: 'System Auto',
      securityCode: 'SEC-006',
      status: 'In Progress',
    },
    {
      id: 7,
      createDate: '2024-01-12',
      invoiceNo: 'RTN-007',
      merchantName: 'Home Decor',
      riderName: 'Robert Ali',
      createBy: 'System Auto',
      updateBy: 'Admin User',
      securityCode: 'SEC-007',
      status: 'Completed',
    },
    {
      id: 8,
      createDate: '2024-01-12',
      invoiceNo: 'RTN-008',
      merchantName: 'Gadget Store',
      riderName: 'Maria Khan',
      createBy: 'Manager',
      updateBy: 'Manager',
      securityCode: 'SEC-008',
      status: 'Pending',
    },
    {
      id: 9,
      createDate: '2024-01-11',
      invoiceNo: 'RTN-009',
      merchantName: 'Sports World',
      riderName: 'Alex Hossain',
      createBy: 'System Auto',
      updateBy: 'Admin User',
      securityCode: 'SEC-009',
      status: 'Completed',
    },
    {
      id: 10,
      createDate: '2024-01-11',
      invoiceNo: 'RTN-010',
      merchantName: 'Book Store',
      riderName: 'Sara Jahan',
      createBy: 'Admin User',
      updateBy: 'System Auto',
      securityCode: 'SEC-010',
      status: 'In Progress',
    },
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Pending: { color: 'bg-yellow-100 text-yellow-800', icon: FiClock },
      'In Progress': { color: 'bg-blue-100 text-blue-800', icon: FiClock },
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

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Return Report (Date Wins)
        </h1>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
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
                  defaultValue="2025-10-23"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
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
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                />
              </div>
            </div>

            {/* Load Button */}
            <div className="flex items-end">
              <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 transition-colors duration-200 h-[42px]">
                Load
              </button>
            </div>

            {/* Export Button */}
            <button className="bg-white border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center h-[42px] mt-6">
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
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  SL.
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Create Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Invoice No
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Merchant Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Rider Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Create By
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Update By
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Security Code
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body with Data */}
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.createDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 border-r border-gray-200">
                    {item.invoiceNo}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.merchantName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.riderName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.createBy}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                    {item.updateBy}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-600 border-r border-gray-200">
                    {item.securityCode}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <button className="bg-blue-600 text-white px-2 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
                        <FiEye size={10} />
                        View
                      </button>
                      <button className="bg-green-600 text-white px-2 py-1.5 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center gap-1">
                        <FiEdit size={10} />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div>
              Showing 1 to {tableData.length} of {tableData.length} rows
            </div>
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

export default RiderReturnHistory;
