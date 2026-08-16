import React, { useEffect, useState } from 'react';
import { getHubRiderListApi } from '../../../Services/api';
import {
  FiUserPlus,
  FiSearch,
  FiRefreshCw,
  FiEye,
  FiEdit,
  FiCheck,
  FiUser,
  FiGrid,
  FiSliders,
  FiDownload,
  FiX,
} from 'react-icons/fi';
import useTitle from '../../../Hooks/useTitle';

const DEMO_RIDER_LIST = [
  {
    id: 18,
    name: "Sirajul_Uttara-2",
    email: "sirajul@gmail.com",
    mobile: "01912500139",
    district: "Dhaka",
    area: "Dhaka Hub",
    r_delivery_charge: "0",
    r_pickup_charge: "0",
    r_return_charge: "0",
    status: "Active",
  },
  {
    id: 10,
    name: "Habib_Gulshan-1",
    email: "habib@gmail.com",
    mobile: "01677173952",
    district: "Dhaka",
    area: "Dhaka Hub",
    r_delivery_charge: "0",
    r_pickup_charge: "0",
    r_return_charge: "0",
    status: "Active",
  },
  {
    id: 9,
    name: "Siyam_Badda",
    email: "siyam@gmail.com",
    mobile: "01312889716",
    district: "Dhaka",
    area: "Dhaka Hub",
    r_delivery_charge: "0",
    r_pickup_charge: "0",
    r_return_charge: "0",
    status: "Active",
  },
  {
    id: 7,
    name: "Shivlu_Khilkhet",
    email: "shivlu@gmail.com",
    mobile: "01819000759",
    district: "Dhaka",
    area: "Dhaka Hub",
    r_delivery_charge: "0",
    r_pickup_charge: "0",
    r_return_charge: "0",
    status: "Active",
  },
];

const Rider = () => {
  useTitle('Branch Dashboard | Rider List');
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRider, setSelectedRider] = useState(null);

  const fetchRiders = async () => {
    setLoading(true);
    try {
      const { data } = await getHubRiderListApi();
      if (Array.isArray(data) && data.length > 0) {
        setRiders(data);
      } else if (data && data.riders && Array.isArray(data.riders)) {
        setRiders(data.riders);
      } else {
        setRiders(DEMO_RIDER_LIST);
      }
    } catch (err) {
      console.error('Failed to fetch hub rider list, using demo list:', err);
      setRiders(DEMO_RIDER_LIST);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const filteredRiders = riders.filter(r => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.mobile && r.mobile.toLowerCase().includes(q)) ||
      (r.district && r.district.toLowerCase().includes(q)) ||
      (r.area && r.area.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-4 sm:p-6 space-y-5 max-w-full">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiUser className="text-emerald-600" /> Rider List
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage and view all registered branch rider accounts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchRiders}
            disabled={loading}
            className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition"
            title="Refresh Rider List"
          >
            <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white font-semibold text-sm rounded-xl hover:bg-emerald-700 transition shadow-sm">
            <FiUserPlus className="w-4 h-4" /> + Rider Register
          </button>
        </div>
      </div>

      {/* Toolbar / Search & Quick Options */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>Export Basic</option>
            <option>Export CSV</option>
            <option>Export Excel</option>
          </select>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-lg">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by Rider Name, Email, Mobile..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-1 border-l border-gray-200 pl-2">
            <button
              onClick={fetchRiders}
              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition"
              title="Reload"
            >
              <FiRefreshCw className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition"
              title="Grid View"
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded-lg transition"
              title="Columns"
            >
              <FiSliders className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Rider Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <FiRefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-3" />
            <p className="text-gray-500 text-sm font-medium">Loading hub riders...</p>
          </div>
        ) : filteredRiders.length === 0 ? (
          <div className="p-12 text-center">
            <FiUser className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-gray-700">No riders found</h3>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wider">
                  <th className="py-3.5 px-3 text-center w-12">
                    <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  </th>
                  <th className="py-3.5 px-3 text-center w-12">SL.</th>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Mobile</th>
                  <th className="py-3.5 px-4">District</th>
                  <th className="py-3.5 px-4">Branch</th>
                  <th className="py-3.5 px-3 text-center">Delivery Charge(TK)</th>
                  <th className="py-3.5 px-3 text-center">Pickup Charge(TK)</th>
                  <th className="py-3.5 px-3 text-center">Return Charge(TK)</th>
                  <th className="py-3.5 px-3 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredRiders.map((rider, index) => (
                  <tr key={rider.id || index} className="hover:bg-gray-50/80 transition">
                    <td className="py-3 px-3 text-center">
                      <input type="checkbox" className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                    </td>
                    <td className="py-3 px-3 text-center font-medium text-gray-500">{index + 1}.</td>
                    <td className="py-3 px-4 font-semibold text-gray-800">{rider.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-600">{rider.email || 'N/A'}</td>
                    <td className="py-3 px-4 font-medium text-gray-800">{rider.mobile || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-600">{rider.district || 'Dhaka'}</td>
                    <td className="py-3 px-4 text-gray-600">{rider.area || 'Dhaka Hub'}</td>
                    <td className="py-3 px-3 text-center text-gray-700">{rider.r_delivery_charge ?? '0'}</td>
                    <td className="py-3 px-3 text-center text-gray-700">{rider.r_pickup_charge ?? '0'}</td>
                    <td className="py-3 px-3 text-center text-gray-700">{rider.r_return_charge ?? '0'}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {rider.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-2 px-3 align-middle">
                      <div className="flex flex-col gap-1 items-center justify-center w-20 mx-auto">
                        <button
                          onClick={() => setSelectedRider(rider)}
                          className="w-16 py-1 bg-[#22b9df] text-white rounded text-[11px] font-semibold hover:bg-cyan-600 transition shadow-sm text-center"
                        >
                          View
                        </button>
                        <button className="w-16 py-1 bg-[#1e73be] text-white rounded text-[11px] font-semibold hover:bg-blue-700 transition shadow-sm text-center">
                          Edit
                        </button>
                        <button className="w-16 py-1 bg-[#008a00] text-white rounded text-[11px] font-semibold hover:bg-emerald-700 transition shadow-sm text-center">
                          Active
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Rider Detail Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <FiUser className="text-emerald-600" /> Rider Profile: {selectedRider.name}
              </h3>
              <button
                onClick={() => setSelectedRider(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-semibold">Rider Name</p>
                <p className="font-semibold text-gray-800 mt-0.5">{selectedRider.name}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-semibold">Mobile</p>
                <p className="font-semibold text-gray-800 mt-0.5">{selectedRider.mobile}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-semibold">Email</p>
                <p className="font-semibold text-gray-800 mt-0.5">{selectedRider.email}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-semibold">District / Branch</p>
                <p className="font-semibold text-gray-800 mt-0.5">{selectedRider.district} ({selectedRider.area})</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-semibold">Delivery Charge</p>
                <p className="font-semibold text-gray-800 mt-0.5">৳ {selectedRider.r_delivery_charge || '0'}</p>
              </div>

              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-xs text-gray-400 uppercase font-semibold">Pickup Charge</p>
                <p className="font-semibold text-gray-800 mt-0.5">৳ {selectedRider.r_pickup_charge || '0'}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRider(null)}
                className="px-5 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-200 transition"
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

export default Rider;
