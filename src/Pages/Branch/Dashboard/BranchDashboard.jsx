import React, { useState, useEffect } from 'react';
import {
  FiPackage,
  FiTruck,
  FiDollarSign,
  FiUsers,
  FiClock,
  FiAlertCircle,
  FiRefreshCw,
  FiCheckCircle,
  FiXCircle,
  FiPauseCircle,
} from 'react-icons/fi';
import useTitle from '../../../Hooks/useTitle';
import { getHubDashboardApi } from '../../../Services/api';

const BranchDashboard = () => {
  useTitle('Branch Dashboard');
  const [timeRange, setTimeRange] = useState('today');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getHubDashboardApi();
      if (res.data) {
        setDashboardData(res.data);
      } else {
        setError('Failed to load hub dashboard data.');
      }
    } catch (err) {
      console.error('Error fetching hub dashboard data:', err);
      setError('An error occurred while fetching hub dashboard stats.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = dashboardData || {
    today_pickup_request_list: 0,
    today_pickup_request: 0,
    today_delivery_request: 0,
    today_return_request: 0,
    today_pickup_cancel: 0,
    today_pickup_done: 0,
    today_delivery_done: 0,
    today_returned: 0,
    today_hold_rescheduled: 0,
    today_payment_processing: 0,
    today_rider_collection: 0,
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-main">
              Branch Dashboard
            </h1>
            <p className="text-text-muted">
              Welcome back! Here's your hub overview for today.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button
              onClick={fetchDashboardData}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-main bg-bg border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              {['Today', 'Weekly', 'Monthly', 'Yearly'].map(period => (
                <button
                  key={period}
                  onClick={() => setTimeRange(period.toLowerCase())}
                  className={`px-4 py-2 text-sm font-medium border-r border-gray-300 last:border-r-0 transition-colors ${
                    timeRange === period.toLowerCase()
                      ? 'bg-btn-secondary hover:bg-btn-secondary-hover text-white'
                      : 'bg-bg text-text-muted hover:bg-gray-50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Pickup Requests */}
        <div className="bg-bg rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Pickup Requests</p>
              <p className="text-2xl font-bold text-text-main mt-2">
                {stats.today_pickup_request}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FiPackage className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-xs text-gray-500">
            <span>Done: {stats.today_pickup_done}</span>
            <span>Cancelled: {stats.today_pickup_cancel}</span>
          </div>
        </div>

        {/* Delivery Requests */}
        <div className="bg-bg rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">Delivery Requests</p>
              <p className="text-2xl font-bold text-text-main mt-2">
                {stats.today_delivery_request}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FiTruck className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-xs text-gray-500">
            <span>Delivered: {stats.today_delivery_done}</span>
            <span>Hold/Resched: {stats.today_hold_rescheduled}</span>
          </div>
        </div>

        {/* Rider Collection */}
        <div className="bg-bg rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">
                Rider Collection
              </p>
              <p className="text-2xl font-bold text-text-main mt-2">
                ৳{Number(stats.today_rider_collection || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-xs text-gray-500">
            <span>Processing: ৳{Number(stats.today_payment_processing || 0).toLocaleString()}</span>
          </div>
        </div>

        {/* Return Requests */}
        <div className="bg-bg rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-muted">
                Return Requests
              </p>
              <p className="text-2xl font-bold text-text-main mt-2">
                {stats.today_return_request}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex justify-between text-xs text-gray-500">
            <span>Returned: {stats.today_returned}</span>
          </div>
        </div>
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pickup & Delivery Operations */}
        <div className="bg-bg rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FiClock className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-text-main">Pickup & Delivery Status</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted flex items-center gap-2">
                <FiCheckCircle className="text-green-500" /> Today Pickup Done
              </span>
              <span className="font-semibold text-green-600">{stats.today_pickup_done}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted flex items-center gap-2">
                <FiXCircle className="text-red-500" /> Pickup Cancelled
              </span>
              <span className="font-semibold text-red-600">{stats.today_pickup_cancel}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted flex items-center gap-2">
                <FiCheckCircle className="text-green-500" /> Today Delivery Done
              </span>
              <span className="font-semibold text-green-600">{stats.today_delivery_done}</span>
            </div>
          </div>
        </div>

        {/* Returns & Holds */}
        <div className="bg-bg rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FiAlertCircle className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-text-main">Returns & Holds</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted flex items-center gap-2">
                <FiPauseCircle className="text-yellow-500" /> Hold / Rescheduled
              </span>
              <span className="font-semibold text-yellow-600">{stats.today_hold_rescheduled}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted flex items-center gap-2">
                <FiAlertCircle className="text-purple-500" /> Today Returned
              </span>
              <span className="font-semibold text-purple-600">{stats.today_returned}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-muted">Return Requests</span>
              <span className="font-semibold text-text-main">{stats.today_return_request}</span>
            </div>
          </div>
        </div>

        {/* Payments Summary */}
        <div className="bg-bg rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-text-main mb-4">Financial Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Rider Collection:</span>
              <span className="font-medium text-emerald-600">৳{Number(stats.today_rider_collection || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Payment Processing:</span>
              <span className="font-medium text-blue-600">৳{Number(stats.today_payment_processing || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Pickup Request List:</span>
              <span className="font-medium">{stats.today_pickup_request_list}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-text-muted text-center">
          Need to check something specific? Use the sidebar menu to access detailed reports and management tools.
        </p>
      </div>
    </div>
  );
};

export default BranchDashboard;

