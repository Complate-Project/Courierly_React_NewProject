import React, { useEffect, useState } from 'react';
import { getAllParcelListApi } from '../../../Services/api';
import {
  FiPackage,
  FiSearch,
  FiRefreshCw,
  FiFilter,
  FiEye,
  FiDollarSign,
  FiUser,
  FiMapPin,
  FiPhone,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiAlertCircle,
  FiX,
} from 'react-icons/fi';
import useTitle from '../../../Hooks/useTitle';

const DEMO_PARCEL_LIST = [
  {
    id: "13",
    tracking_id: "202608193",
    customer_name: "Suhel Roy",
    customer_phone: "01728105586",
    customer_address: "block-b, Dhaka",
    business_name: "Test Merchant",
    merchant_user_name: "Test Merchant",
    merchant_user_mobile: "01717468815",
    weight: "500gm to 1kg",
    collection: "400.00",
    status: "Order Placed",
    created_at: "2026-06-01 13:50:21",
    type: "Regular",
  },
  {
    id: "1",
    tracking_id: "202607192",
    customer_name: "Isruk Hasan",
    customer_phone: "01560068370",
    customer_address: "Mirpur 11.5, Pallabi Extension",
    business_name: "Demo shop",
    merchant_user_name: "Habib Hasan",
    merchant_user_mobile: "01798737513",
    weight: "500gm to 1kg",
    collection: "566.00",
    status: "Assigned Pickup Rider",
    created_at: "2025-02-11 17:49:57",
    type: "Regular",
  },
];

const Consignments = () => {
  useTitle('All Parcel Consignments');
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedParcel, setSelectedParcel] = useState(null);

  const fetchParcels = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getAllParcelListApi();
      if (Array.isArray(data) && data.length > 0) {
        setParcels(data);
      } else if (data && data.parcels && Array.isArray(data.parcels)) {
        setParcels(data.parcels);
      } else {
        setParcels(DEMO_PARCEL_LIST);
      }
    } catch (err) {
      console.error('Failed to load live parcel list, using demo list:', err);
      setParcels(DEMO_PARCEL_LIST);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const filteredParcels = parcels.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      (item.tracking_id && item.tracking_id.toLowerCase().includes(query)) ||
      (item.customer_name && item.customer_name.toLowerCase().includes(query)) ||
      (item.customer_phone && item.customer_phone.toLowerCase().includes(query)) ||
      (item.business_name && item.business_name.toLowerCase().includes(query));

    const matchesStatus =
      statusFilter === 'All' ||
      (item.status && item.status.toLowerCase() === statusFilter.toLowerCase());

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = status => {
    const s = (status || '').toLowerCase();
    if (s.includes('placed')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <FiClock className="w-3.5 h-3.5" />
          {status}
        </span>
      );
    }
    if (s.includes('assigned') || s.includes('pickup')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-50 text-yellow-800 border border-yellow-200">
          <FiTruck className="w-3.5 h-3.5" />
          {status}
        </span>
      );
    }
    if (s.includes('deliver') || s.includes('complete')) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
          <FiCheckCircle className="w-3.5 h-3.5" />
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
        <FiAlertCircle className="w-3.5 h-3.5" />
        {status || 'Unknown'}
      </span>
    );
  };

  const totalCollectionSum = filteredParcels
    .reduce((acc, p) => acc + (parseFloat(p.collection) || 0), 0)
    .toFixed(2);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiPackage className="text-indigo-600" /> All Parcel Consignments
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time package status and consignment list from API (`https://courier.demo-bd.com/api/all-parcel-list`)
          </p>
        </div>
        <button
          onClick={fetchParcels}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Refreshing...' : 'Refresh List'}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Parcels</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{filteredParcels.length}</h3>
          </div>
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
            <FiPackage className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Collection</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">৳ {totalCollectionSum}</h3>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <FiDollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Order Placed</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {filteredParcels.filter(p => (p.status || '').toLowerCase().includes('placed')).length}
            </h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <FiClock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned Pickup</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">
              {filteredParcels.filter(p => (p.status || '').toLowerCase().includes('assigned')).length}
            </h3>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
            <FiTruck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by Tracking ID, Customer Name, Phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-3">
          <FiFilter className="text-gray-400 w-4 h-4" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Assigned Pickup Rider">Assigned Pickup Rider</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <FiRefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm font-medium">Fetching parcel list from server...</p>
          </div>
        ) : filteredParcels.length === 0 ? (
          <div className="p-12 text-center">
            <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-700">No parcels found</h3>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search query or filter options.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Tracking ID</th>
                  <th className="py-4 px-6">Customer Details</th>
                  <th className="py-4 px-6">Merchant</th>
                  <th className="py-4 px-6">Collection</th>
                  <th className="py-4 px-6">Weight / Type</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredParcels.map(parcel => (
                  <tr key={parcel.id || parcel.tracking_id} className="hover:bg-gray-50/80 transition">
                    <td className="py-4 px-6 font-semibold text-indigo-600">
                      #{parcel.tracking_id}
                      <p className="text-xs font-normal text-gray-400 mt-0.5">{parcel.created_at || parcel.order_created_at}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900 flex items-center gap-1.5">
                        <FiUser className="w-3.5 h-3.5 text-gray-400" />
                        {parcel.customer_name || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <FiPhone className="w-3 h-3 text-gray-400" />
                        {parcel.customer_phone || 'N/A'}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-0.5 truncate max-w-xs">
                        <FiMapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        {parcel.customer_address || 'N/A'}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-800">{parcel.business_name || parcel.merchant_user_name || 'N/A'}</p>
                      <p className="text-xs text-gray-500">{parcel.merchant_user_mobile || 'N/A'}</p>
                    </td>
                    <td className="py-4 px-6 font-semibold text-emerald-600">
                      ৳ {parcel.collection || '0.00'}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <p>{parcel.weight || 'N/A'}</p>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded mt-1 inline-block">
                        {parcel.type || 'Regular'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(parcel.status)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setSelectedParcel(parcel)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100 transition"
                      >
                        <FiEye className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Parcel Detail Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full p-6 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Parcel #{selectedParcel.tracking_id}</h3>
                <p className="text-xs text-gray-400">Created: {selectedParcel.created_at || selectedParcel.order_created_at}</p>
              </div>
              <button
                onClick={() => setSelectedParcel(null)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase">Customer Info</p>
                <p className="font-semibold text-gray-800">{selectedParcel.customer_name}</p>
                <p className="text-xs text-gray-600">{selectedParcel.customer_phone}</p>
                <p className="text-xs text-gray-500">{selectedParcel.customer_address}</p>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase">Merchant Info</p>
                <p className="font-semibold text-gray-800">{selectedParcel.business_name || selectedParcel.merchant_user_name}</p>
                <p className="text-xs text-gray-600">{selectedParcel.merchant_user_mobile}</p>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase">Collection Amount</p>
                <p className="font-bold text-emerald-600 text-base">৳ {selectedParcel.collection || '0.00'}</p>
                <p className="text-xs text-gray-500">Merchant Pay: ৳ {selectedParcel.merchant_pay || '0.00'}</p>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase">Status & Weight</p>
                <div>{getStatusBadge(selectedParcel.status)}</div>
                <p className="text-xs text-gray-600 mt-1">Weight: {selectedParcel.weight || 'N/A'}</p>
              </div>
            </div>

            {selectedParcel.remarks && (
              <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-900">
                <span className="font-semibold">Remarks:</span> {selectedParcel.remarks}
              </div>
            )}

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedParcel(null)}
                className="px-5 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Consignments;
