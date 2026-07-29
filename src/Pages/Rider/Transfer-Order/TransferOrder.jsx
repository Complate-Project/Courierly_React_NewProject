import React, { useState } from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiEye,
  FiEdit,
  FiTruck,
  FiMapPin,
  FiSend,
} from 'react-icons/fi';

const TransferOrder = () => {
  const [isGridView, setIsGridView] = useState(false);

  // Fake data for the table
  const tableData = [
    {
      id: 1,
      date: '2024-01-15',
      invoiceId: 'TRF-001',
      pickupAddress: '123 Warehouse, Industrial Area, Dhaka',
      deliveryAddress: '456 Main Street, Gulshan, Dhaka',
      type: 'Inter-City',
    },
    {
      id: 2,
      date: '2024-01-15',
      invoiceId: 'TRF-002',
      pickupAddress: '789 Distribution Center, Chittagong Port',
      deliveryAddress: '321 Commercial Area, Agrabad, Chittagong',
      type: 'Intra-City',
    },
    {
      id: 3,
      date: '2024-01-14',
      invoiceId: 'TRF-003',
      pickupAddress: '555 Main Hub, Sylhet City',
      deliveryAddress: '777 Suburb Area, Sylhet',
      type: 'Inter-City',
    },
    {
      id: 4,
      date: '2024-01-14',
      invoiceId: 'TRF-004',
      pickupAddress: '888 Storage Facility, Khulna',
      deliveryAddress: '999 Residential Zone, Khulna',
      type: 'Intra-City',
    },
    {
      id: 5,
      date: '2024-01-13',
      invoiceId: 'TRF-005',
      pickupAddress: '234 Logistics Center, Rajshahi',
      deliveryAddress: '567 Downtown Area, Rajshahi',
      type: 'Inter-City',
    },
    {
      id: 6,
      date: '2024-01-13',
      invoiceId: 'TRF-006',
      pickupAddress: '876 Main Depot, Bogura',
      deliveryAddress: '543 Urban Area, Bogura',
      type: 'Intra-City',
    },
    {
      id: 7,
      date: '2024-01-12',
      invoiceId: 'TRF-007',
      pickupAddress: '654 Central Warehouse, Rangpur',
      deliveryAddress: '987 City Center, Rangpur',
      type: 'Inter-City',
    },
    {
      id: 8,
      date: '2024-01-12',
      invoiceId: 'TRF-008',
      pickupAddress: '321 Storage Unit, Barisal',
      deliveryAddress: '789 Riverside Area, Barisal',
      type: 'Intra-City',
    },
  ];

  // Type badge component
  const TypeBadge = ({ type }) => {
    const typeConfig = {
      'Inter-City': { color: 'bg-purple-100 text-purple-800', icon: FiSend },
      'Intra-City': { color: 'bg-orange-100 text-orange-800', icon: FiTruck },
    };

    const config = typeConfig[type] || typeConfig['Intra-City'];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent size={12} className="mr-1" />
        {type}
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
          <p className="text-gray-900">{item.date}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Invoice ID:</span>
          <p className="text-blue-600 font-medium">{item.invoiceId}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Type:</span>
          <TypeBadge type={item.type} />
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiMapPin size={12} />
            Pickup:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.pickupAddress}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiMapPin size={12} />
            Delivery:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.deliveryAddress}</p>
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
          Edit
        </button>
        <button className="flex-1 min-w-[100px] bg-purple-600 text-white px-2 py-2 rounded text-xs hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiSend size={12} />
          Transfer
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Transfer Order Management
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and track transfer orders efficiently
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
                placeholder="Search transfer orders..."
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
              Transfer Orders ({tableData.length})
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
              Transfer Order List
              <span className="text-sm font-normal text-gray-500">
                ({tableData.length} orders)
              </span>
            </h2>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] lg:min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    SL.
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Pickup Address
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Delivery Address
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
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
                      {item.date}
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {item.invoiceId}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="flex items-start gap-2">
                        <FiMapPin
                          size={14}
                          className="text-gray-400 mt-0.5 flex-shrink-0"
                        />
                        <span className="truncate" title={item.pickupAddress}>
                          {item.pickupAddress}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="flex items-start gap-2">
                        <FiMapPin
                          size={14}
                          className="text-gray-400 mt-0.5 flex-shrink-0"
                        />
                        <span className="truncate" title={item.deliveryAddress}>
                          {item.deliveryAddress}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <TypeBadge type={item.type} />
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
                          <FiEye size={12} />
                          <span className="hidden sm:inline">View</span>
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1.5 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center gap-1">
                          <FiEdit size={12} />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button className="bg-purple-600 text-white px-3 py-1.5 rounded text-xs hover:bg-purple-700 transition-colors duration-200 flex items-center gap-1">
                          <FiSend size={12} />
                          <span className="hidden sm:inline">Transfer</span>
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

export default TransferOrder;
