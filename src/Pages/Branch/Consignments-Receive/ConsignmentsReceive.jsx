import React, { useEffect, useState } from 'react';
import {
  getAllParcelListApi,
  hubPickupBulkCollectionApi,
  hubPickupSingleCollectionApi,
} from '../../../Services/api';
import {
  FiPackage,
  FiSearch,
  FiRefreshCw,
  FiCheckSquare,
  FiSquare,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiUser,
  FiPhone,
  FiMapPin,
  FiLayers,
  FiBox,
} from 'react-icons/fi';
import useTitle from '../../../Hooks/useTitle';

const ConsignmentsReceive = () => {
  useTitle('Consignments Receive - Hub Collection');
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bulkSubmitting, setBulkSubmitting] = useState(false);
  const [allSubmitting, setAllSubmitting] = useState(false);
  const [singleSubmittingId, setSingleSubmittingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [trackingInput, setTrackingInput] = useState('');
  const [responseMsg, setResponseMsg] = useState(null);

  const fetchParcels = async () => {
    setLoading(true);
    try {
      const { data } = await getAllParcelListApi();
      if (Array.isArray(data) && data.length > 0) {
        setParcels(data);
      } else if (data && data.parcels && Array.isArray(data.parcels)) {
        setParcels(data.parcels);
      } else {
        setParcels([]);
      }
    } catch (err) {
      console.error('Failed to fetch parcels:', err);
      setParcels([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const filteredParcels = parcels.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      (item.tracking_id && item.tracking_id.toLowerCase().includes(query)) ||
      (item.customer_name && item.customer_name.toLowerCase().includes(query)) ||
      (item.customer_phone && item.customer_phone.toLowerCase().includes(query)) ||
      (item.business_name && item.business_name.toLowerCase().includes(query))
    );
  });

  const handleSelectAll = () => {
    if (selectedIds.length === filteredParcels.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredParcels.map(p => p.tracking_id).filter(Boolean));
    }
  };

  const handleToggleSelect = trackingId => {
    if (selectedIds.includes(trackingId)) {
      setSelectedIds(selectedIds.filter(id => id !== trackingId));
    } else {
      setSelectedIds([...selectedIds, trackingId]);
    }
  };

  const handleAddTrackingInput = e => {
    e.preventDefault();
    const cleanInput = trackingInput.trim();
    if (!cleanInput) return;

    const idsToAdd = cleanInput
      .split(/[\s,]+/)
      .map(id => id.trim())
      .filter(id => id.length > 0);

    const updated = Array.from(new Set([...selectedIds, ...idsToAdd]));
    setSelectedIds(updated);
    setTrackingInput('');
  };

  // 1. Single Pickup Collection Handler (POST /api/hub-pickup-single-collection)
  const handleSingleCollection = async trackingId => {
    if (!trackingId) return;

    setSingleSubmittingId(trackingId);
    setResponseMsg(null);

    try {
      const res = await hubPickupSingleCollectionApi(trackingId);
      console.log('Single Collection Response:', res);
      if (res.data) {
        console.log('Single Collection Order Data:', res.data.order);
        setResponseMsg({
          type: res.data.success ? 'success' : 'error',
          message: res.data.message || 'Single Collection Completed',
          updated: res.data.order ? [res.data.order.tracking_id] : [trackingId],
          order: res.data.order || null,
        });

        if (res.data.success) {
          setSelectedIds(selectedIds.filter(id => id !== trackingId));
          fetchParcels();
        }
      }
    } catch (err) {
      console.error('Single collection error:', err);
      setResponseMsg({
        type: 'error',
        message: 'An error occurred during single collection submission.',
      });
    } finally {
      setSingleSubmittingId(null);
    }
  };

  // 2. Selected Bulk Pickup Collection Handler (POST /api/hub-pickup-bulk-collection)
  const handleSelectedBulkCollection = async () => {
    if (selectedIds.length === 0) return;

    setBulkSubmitting(true);
    setResponseMsg(null);

    try {
      const res = await hubPickupBulkCollectionApi(selectedIds);
      if (res.data) {
        setResponseMsg({
          type: res.data.success ? 'success' : 'error',
          message: res.data.message || 'Selected Bulk Collection Completed',
          updated: res.data.updated || [],
          not_found: res.data.not_found || [],
        });

        if (res.data.success) {
          setSelectedIds([]);
          fetchParcels();
        }
      }
    } catch (err) {
      console.error('Bulk collection error:', err);
      setResponseMsg({
        type: 'error',
        message: 'An error occurred during bulk collection submission.',
      });
    } finally {
      setBulkSubmitting(false);
    }
  };

  // 3. ALL Collection Handler (Collect ALL Parcels in List via POST /api/hub-pickup-bulk-collection)
  const handleAllCollection = async () => {
    const allTrackingIds = filteredParcels.map(p => p.tracking_id).filter(Boolean);
    if (allTrackingIds.length === 0) return;

    setAllSubmitting(true);
    setResponseMsg(null);

    try {
      const res = await hubPickupBulkCollectionApi(allTrackingIds);
      if (res.data) {
        setResponseMsg({
          type: res.data.success ? 'success' : 'error',
          message: res.data.message || 'All Parcels Collected Successfully',
          updated: res.data.updated || [],
          not_found: res.data.not_found || [],
        });

        if (res.data.success) {
          setSelectedIds([]);
          fetchParcels();
        }
      }
    } catch (err) {
      console.error('All collection error:', err);
      setResponseMsg({
        type: 'error',
        message: 'An error occurred during collecting all parcels.',
      });
    } finally {
      setAllSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiLayers className="text-indigo-600" /> Consignments Receive - Hub Collection
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Receive single, selected bulk, or ALL parcels via POST APIs (`/api/hub-pickup-single-collection` & `/api/hub-pickup-bulk-collection`)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchParcels}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
          >
            <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          {/* Selected Bulk Collection Button */}
          <button
            onClick={handleSelectedBulkCollection}
            disabled={bulkSubmitting || selectedIds.length === 0}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
          >
            <FiCheckCircle className={`w-4 h-4 ${bulkSubmitting ? 'animate-spin' : ''}`} />
            {bulkSubmitting ? 'Collecting Selected...' : `Collect Selected (${selectedIds.length})`}
          </button>

          {/* ALL Collection Button */}
          <button
            onClick={handleAllCollection}
            disabled={allSubmitting || filteredParcels.length === 0}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium text-sm rounded-xl hover:bg-emerald-700 transition shadow-sm disabled:opacity-50"
          >
            <FiPackage className={`w-4 h-4 ${allSubmitting ? 'animate-spin' : ''}`} />
            {allSubmitting ? 'Collecting All...' : `Collect ALL (${filteredParcels.length})`}
          </button>
        </div>
      </div>

      {/* Response Alert */}
      {responseMsg && (
        <div
          className={`p-4 rounded-xl border text-sm space-y-2 ${
            responseMsg.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2 font-semibold">
            {responseMsg.type === 'success' ? (
              <FiCheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <FiAlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            {responseMsg.message}
          </div>

          {responseMsg.updated && responseMsg.updated.length > 0 && (
            <p className="text-xs">
              <span className="font-semibold">Successfully collected tracking IDs:</span>{' '}
              {responseMsg.updated.join(', ')}
            </p>
          )}

          {responseMsg.order && (
            <div className="mt-3 p-4 bg-white rounded-xl border border-green-200 text-gray-800 space-y-2 text-xs shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="font-bold text-indigo-600 text-sm">
                  Tracking ID: #{responseMsg.order.tracking_id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 text-[11px]">
                  {responseMsg.order.status || 'Received by Pickup Branch'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-1">
                <div>
                  <span className="text-gray-400 font-medium block">Customer</span>
                  <span className="font-semibold">{responseMsg.order.customer_name || 'N/A'}</span>
                  <span className="text-gray-500 block">{responseMsg.order.customer_phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Address & Area</span>
                  <span className="font-semibold">{responseMsg.order.customer_address || 'N/A'}</span>
                  <span className="text-gray-500 block">{responseMsg.order.area || responseMsg.order.district}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Collection & Weight</span>
                  <span className="font-semibold text-emerald-600">৳ {responseMsg.order.collection}</span>
                  <span className="text-gray-500 block">{responseMsg.order.weight || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-medium block">Shop / Type</span>
                  <span className="font-semibold">{responseMsg.order.shop || 'Demo shop'}</span>
                  <span className="text-gray-500 block">{responseMsg.order.type || 'Regular'}</span>
                </div>
              </div>
            </div>
          )}

          {responseMsg.not_found && responseMsg.not_found.length > 0 && (
            <p className="text-xs text-red-700">
              <span className="font-semibold">Not found tracking IDs:</span>{' '}
              {responseMsg.not_found.join(', ')}
            </p>
          )}
        </div>
      )}

      {/* Manual Tracking ID Entry & Scanner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Manual Tracking ID Entry / Barcode Scanner</h3>
        <form onSubmit={handleAddTrackingInput} className="flex gap-3">
          <input
            type="text"
            placeholder="Enter tracking IDs (e.g. CLab134025156)"
            value={trackingInput}
            onChange={e => setTrackingInput(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 transition"
          >
            Add to Selection
          </button>
          <button
            type="button"
            onClick={() => {
              const clean = trackingInput.trim();
              if (clean) {
                handleSingleCollection(clean);
                setTrackingInput('');
              }
            }}
            className="px-4 py-2.5 bg-emerald-600 text-white font-medium text-sm rounded-xl hover:bg-emerald-700 transition"
          >
            Single Collect
          </button>
        </form>

        {selectedIds.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-gray-500">Selected Tracking IDs:</span>
            {selectedIds.map(id => (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100 font-medium"
              >
                {id}
                <button
                  type="button"
                  onClick={() => handleToggleSelect(id)}
                  className="text-indigo-400 hover:text-indigo-600 font-bold ml-1"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={() => setSelectedIds([])}
              className="text-xs text-red-600 hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Controls & Search */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search parcels..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="flex items-center gap-3 text-sm">
          <button
            onClick={handleSelectAll}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium text-gray-700 transition"
          >
            {selectedIds.length === filteredParcels.length && filteredParcels.length > 0 ? (
              <FiCheckSquare className="w-4 h-4 text-indigo-600" />
            ) : (
              <FiSquare className="w-4 h-4 text-gray-400" />
            )}
            Select All
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <FiRefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm font-medium">Loading consignments...</p>
          </div>
        ) : filteredParcels.length === 0 ? (
          <div className="p-12 text-center">
            <FiPackage className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-700">No parcels found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6 text-center w-12">
                    <button onClick={handleSelectAll}>
                      {selectedIds.length === filteredParcels.length && filteredParcels.length > 0 ? (
                        <FiCheckSquare className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <FiSquare className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </th>
                  <th className="py-4 px-6">Tracking ID</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Merchant</th>
                  <th className="py-4 px-6">Collection Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredParcels.map(parcel => {
                  const isSelected = selectedIds.includes(parcel.tracking_id);
                  const isSingleLoading = singleSubmittingId === parcel.tracking_id;

                  return (
                    <tr
                      key={parcel.id || parcel.tracking_id}
                      className={`transition ${
                        isSelected ? 'bg-indigo-50/50' : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <td className="py-4 px-6 text-center">
                        <button onClick={() => handleToggleSelect(parcel.tracking_id)}>
                          {isSelected ? (
                            <FiCheckSquare className="w-4 h-4 text-indigo-600 mx-auto" />
                          ) : (
                            <FiSquare className="w-4 h-4 text-gray-400 mx-auto" />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 font-semibold text-indigo-600">
                        #{parcel.tracking_id}
                        <p className="text-xs font-normal text-gray-400 mt-0.5">
                          {parcel.created_at || parcel.order_created_at}
                        </p>
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
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-gray-800">{parcel.business_name || parcel.merchant_user_name || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{parcel.merchant_user_mobile || 'N/A'}</p>
                      </td>
                      <td className="py-4 px-6 font-semibold text-emerald-600">
                        ৳ {parcel.collection || '0.00'}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          <FiClock className="w-3.5 h-3.5" />
                          {parcel.status || 'Order Placed'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleSingleCollection(parcel.tracking_id)}
                          disabled={isSingleLoading}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold transition disabled:opacity-50"
                        >
                          <FiBox className={`w-3.5 h-3.5 ${isSingleLoading ? 'animate-spin' : ''}`} />
                          {isSingleLoading ? 'Receiving...' : 'Single Receive'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsignmentsReceive;
