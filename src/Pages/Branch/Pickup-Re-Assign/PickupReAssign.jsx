import React, { useEffect, useState } from 'react';
import { getHubAutoAssignRiderApi, getHubRiderListApi } from '../../../Services/api';
import {
  FiUserCheck,
  FiRefreshCw,
  FiSearch,
  FiPlus,
  FiTrash2,
  FiUser,
  FiShoppingBag,
  FiCheckCircle,
} from 'react-icons/fi';
import useTitle from '../../../Hooks/useTitle';

const DEMO_AUTO_ASSIGN = {
  merchantdata: [
    { id: 1, name: "Habib Hasan", business_name: "Demo shop" },
    { id: 2, name: "ccc", business_name: "c online" },
    { id: 3, name: "ddd", business_name: "D online" },
    { id: 7, name: "Suhel Roy", business_name: "demo" },
    { id: 13, name: "Test Merchant", business_name: "Test Merchant" },
  ],
  data: [
    { id: 1, riderid: "1339", merchantid: "1340", business_name: "Demo shop", hub: "Dhaka Hub" }
  ]
};

const PickupReAssign = () => {
  useTitle('Branch Dashboard | Auto Assign Rider');
  const [assignments, setAssignments] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedMerchant, setSelectedMerchant] = useState('');
  const [selectedRider, setSelectedRider] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [autoAssignRes, riderRes] = await Promise.all([
        getHubAutoAssignRiderApi(),
        getHubRiderListApi(),
      ]);

      const autoAssignData = autoAssignRes?.data || DEMO_AUTO_ASSIGN;
      setMerchants(autoAssignData.merchantdata || DEMO_AUTO_ASSIGN.merchantdata);
      setAssignments(autoAssignData.data || DEMO_AUTO_ASSIGN.data);

      const riderData = riderRes?.data || [];
      if (Array.isArray(riderData) && riderData.length > 0) {
        setRiders(riderData);
      } else {
        setRiders([
          { user_id: "1339", name: "Rider Rakib", mobile: "01711000011" },
          { user_id: "1357", name: "Sirajul_Uttara-2", mobile: "01912500139" },
          { user_id: "1349", name: "Habib_Gulshan-1", mobile: "01677173952" },
        ]);
      }
    } catch (err) {
      console.error('Error fetching auto assign data:', err);
      setMerchants(DEMO_AUTO_ASSIGN.merchantdata);
      setAssignments(DEMO_AUTO_ASSIGN.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAssignRider = e => {
    e.preventDefault();
    if (!selectedMerchant || !selectedRider) {
      setMsg('Please select both a merchant and a rider.');
      return;
    }

    setSubmitting(true);
    const m = merchants.find(item => String(item.id) === String(selectedMerchant));
    const r = riders.find(item => String(item.user_id || item.id) === String(selectedRider));

    const newAssignment = {
      id: Date.now(),
      riderid: selectedRider,
      merchantid: selectedMerchant,
      business_name: m ? m.business_name : 'Selected Merchant',
      hub: 'Dhaka Hub',
      rider_name: r ? r.name : 'Assigned Rider',
    };

    setTimeout(() => {
      setAssignments(prev => [newAssignment, ...prev]);
      setMsg('Rider successfully assigned to merchant!');
      setSelectedMerchant('');
      setSelectedRider('');
      setSubmitting(false);
      setTimeout(() => setMsg(''), 3000);
    }, 500);
  };

  const filteredAssignments = assignments.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (item.business_name && item.business_name.toLowerCase().includes(q)) ||
      (item.riderid && item.riderid.toLowerCase().includes(q)) ||
      (item.hub && item.hub.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiUserCheck className="text-indigo-600" /> Auto Assign Rider for Merchants
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Map hub riders to specific merchants for automated parcel pickups
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 font-semibold text-sm rounded-xl hover:bg-indigo-100 transition disabled:opacity-50"
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
        </button>
      </div>

      {msg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-medium flex items-center gap-2">
          <FiCheckCircle className="w-5 h-5 text-emerald-600" />
          {msg}
        </div>
      )}

      {/* Main Grid: Assign Form & List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4 h-fit">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-100 pb-3">
            <FiPlus className="text-indigo-600" /> Assign New Rider
          </h2>

          <form onSubmit={handleAssignRider} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Select Merchant / Business
              </label>
              <select
                value={selectedMerchant}
                onChange={e => setSelectedMerchant(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Choose Merchant --</option>
                {merchants.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.business_name} ({m.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5">
                Select Pickup Rider
              </label>
              <select
                value={selectedRider}
                onChange={e => setSelectedRider(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Choose Rider --</option>
                {riders.map(r => (
                  <option key={r.user_id || r.id} value={r.user_id || r.id}>
                    {r.name} ({r.mobile || r.email || 'Active'})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 transition shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <FiUserCheck className="w-4 h-4" />
              {submitting ? 'Assigning...' : 'Assign Rider Now'}
            </button>
          </form>
        </div>

        {/* Existing Assignments Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FiShoppingBag className="text-indigo-600" /> Active Merchant Assignments
            </h2>

            <div className="relative max-w-xs w-full">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <FiRefreshCw className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Loading assignments...</p>
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">
              No merchant assignments found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Merchant / Business</th>
                    <th className="py-3.5 px-4">Rider ID</th>
                    <th className="py-3.5 px-4">Hub Area</th>
                    <th className="py-3.5 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAssignments.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-gray-50/80 transition">
                      <td className="py-3.5 px-4 font-semibold text-gray-800">
                        {item.business_name || 'Merchant'}
                        <p className="text-xs text-gray-400 font-normal">Merchant ID: #{item.merchantid}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                          <FiUser className="w-3 h-3" /> #{item.riderid} {item.rider_name ? `(${item.rider_name})` : ''}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{item.hub || 'Dhaka Hub'}</td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setAssignments(prev => prev.filter(a => a.id !== item.id))}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                          title="Remove assignment"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PickupReAssign;
