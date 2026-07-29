import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiPackage,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiX,
  FiUser,
  FiTruck,
  FiMapPin,
  FiUserCheck,
  FiPlusSquare,
  FiFileText,
  FiTrendingUp,
  FiDollarSign,
  FiBriefcase,
  FiClipboard,
  FiGrid,
  FiMap,
  FiClock,
  FiSliders,
  FiCalendar,
  FiCheckSquare,
  FiLock,
  FiInbox,
  FiList,
  FiDownload,
  FiUpload,
  FiShare,
  FiRefreshCw,
  FiArrowUpRight,
  FiArrowDownRight,
  FiCreditCard,
  FiArchive,
} from 'react-icons/fi';
import { FaStore } from 'react-icons/fa6';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { AnimatePresence, motion } from 'framer-motion';

const AdminSidebar = ({ isOpen, toggleSidebar, logout }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = menuName => {
    setOpenMenu(prev => (prev === menuName ? null : menuName));
  };

  const isActive = path => location.pathname === path;

  const menuItems = [
    {
      name: 'Dashboard',
      icon: <FiHome className="w-5 h-5" />,
      path: '/admin/dashboard',
    },
    {
      name: 'Configuration',
      icon: <FiSettings className="w-5 h-5" />,
      submenu: [
        {
          name: 'Company Info',
          path: '/admin/dashboard/company-info',
          icon: <FiTruck />,
        },
        {
          name: 'Expense Type',
          path: '/admin/dashboard/expense-type',
          icon: <FiMapPin />,
        },
        {
          name: 'Income Type',
          path: '/admin/income-type',
          icon: <FiDollarSign />,
        },
        {
          name: 'Business Type',
          path: '/admin/business-type',
          icon: <FiBriefcase />,
        },
        {
          name: 'Reason Category',
          path: '/admin/reason-category',
          icon: <FiClipboard />,
        },
        {
          name: 'Order Category',
          path: '/admin/order-category',
          icon: <FiGrid />,
        },
        {
          name: 'Area Management',
          path: '/admin/area-management',
          icon: <FiMap />,
        },
        {
          name: 'District Management',
          path: '/admin/district-management',
          icon: <FiMap />,
        },
        {
          name: 'Branch Management',
          path: '/admin/branch-management',
          icon: <FiHome />,
        },
        {
          name: 'Charge Management',
          path: '/admin/charge-management',
          icon: <FiDollarSign />,
        },
        {
          name: 'Status Change for Rider',
          path: '/admin/status-change-rider',
          icon: <FiCheckSquare />,
        },
        {
          name: 'Notice Management',
          path: '/admin/notice-management',
          icon: <FiFileText />,
        },
        {
          name: 'Pickup Time ',
          path: '/admin/pickup-time',
          icon: <FiClock />,
        },
        {
          name: 'Slider Management',
          path: '/admin/slider-management',
          icon: <FiSliders />,
        },
        {
          name: 'Scheduler for Merchant',
          path: '/admin/scheduler-merchant',
          icon: <FiCalendar />,
        },
        {
          name: 'Auto Assign for Rider',
          path: '/admin/auto-assign-rider',
          icon: <FiCheckSquare />,
        },
      ],
    },
    {
      name: 'Team Management',
      icon: <FiUsers className="w-5 h-5" />,
      submenu: [
        {
          name: 'User Password Manage',
          path: '/admin/user-password',
          icon: <FiLock />,
        },
        {
          name: 'Merchant Information',
          path: '/admin/merchant-info',
          icon: <FiUser />,
        },
        {
          name: 'Branch Information',
          path: '/admin/branch-info',
          icon: <FiMapPin />,
        },
        {
          name: 'Rider Information',
          path: '/admin/rider-info',
          icon: <FiTruck />,
        },
        {
          name: 'Executive Information',
          path: '/admin/executive-info',
          icon: <FiUserCheck />,
        },
      ],
    },
    {
      name: 'Consignments',
      icon: <FiPackage className="w-5 h-5" />,
      submenu: [
        {
          name: 'Delivery Reports',
          path: '/admin/reports/delivery',
          icon: <FiFileText />,
        },
        {
          name: 'Financial Reports',
          path: '/admin/reports/financial',
          icon: <FiDollarSign />,
        },
        {
          name: 'Performance Reports',
          path: '/admin/reports/performance',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Pickup Request List',
          path: '/admin/pickup-requests',
          icon: <FiInbox />,
        },
        {
          name: 'Parcel Request List',
          path: '/admin/parcel-requests',
          icon: <FiPackage />,
        },
        { name: 'All Parcel List', path: '/admin/parcels', icon: <FiList /> },
        {
          name: 'Add Parcel',
          path: '/admin/parcels/new',
          icon: <FiPlusSquare />,
        },
        {
          name: 'Order Export',
          path: '/admin/orders/export',
          icon: <FiDownload />,
        },
        {
          name: 'Bulk Import',
          path: '/admin/orders/import',
          icon: <FiUpload />,
        },
      ],
    },
    {
      name: 'Fulfillment Operation',
      icon: <FaStore className="w-5 h-5" />,
      submenu: [
        {
          name: 'Delivery Reports',
          path: '/admin/reports/delivery',
          icon: <FiFileText />,
        },
        {
          name: 'Financial Reports',
          path: '/admin/reports/financial',
          icon: <FiDollarSign />,
        },
        {
          name: 'Performance Reports',
          path: '/admin/reports/performance',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Parcel Fulfillment',
          path: '/admin/parcel-fulfillment',
          icon: <FiPackage />,
        },
        {
          name: 'Transfer To Hub',
          path: '/admin/transfer-to-hub',
          icon: <FiShare />,
        },
        {
          name: 'Return To Hub',
          path: '/admin/return-to-hub',
          icon: <FiRefreshCw />,
        },
        {
          name: 'Delivery Processing for Branch',
          path: '/admin/delivery-branch',
          icon: <FiTruck />,
        },
        {
          name: 'Pickup Transfer',
          path: '/admin/pickup-transfer',
          icon: <FiArrowUpRight />,
        },
        {
          name: 'Delivery Transfer',
          path: '/admin/delivery-transfer',
          icon: <FiArrowDownRight />,
        },
      ],
    },
    {
      name: '3PL Operation',
      icon: <FiShare className="w-5 h-5" />,
      submenu: [
        {
          name: 'Delivery Reports',
          path: '/admin/reports/delivery',
          icon: <FiFileText />,
        },
        {
          name: 'Financial Reports',
          path: '/admin/reports/financial',
          icon: <FiDollarSign />,
        },
        {
          name: 'Performance Reports',
          path: '/admin/reports/performance',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Transfer To Redx',
          path: '/admin/transfer-redx',
          icon: <FiShare />,
        },
        {
          name: 'Transfer To Pathao',
          path: '/admin/transfer-pathao',
          icon: <FiShare />,
        },
        {
          name: '3PL Transfer List',
          path: '/admin/thirdparty-transfer',
          icon: <FiList />,
        },
        {
          name: '3PL Delivery & Cancel',
          path: '/admin/thirdparty-delivery',
          icon: <FiTruck />,
        },
      ],
    },
    {
      name: 'HR & Payroll',
      icon: <FiUsers className="w-5 h-5" />,
      submenu: [
        {
          name: 'Delivery Reports',
          path: '/admin/reports/delivery',
          icon: <FiFileText />,
        },
        {
          name: 'Rider Attendance',
          path: '/admin/rider-attendance',
          icon: <FiCalendar />,
        },
        {
          name: 'Employee Attendance',
          path: '/admin/employee-attendance',
          icon: <FiUsers />,
        },
        {
          name: 'Daily Attendance',
          path: '/admin/daily-attendance',
          icon: <FiClock />,
        },
        {
          name: 'Monthly Attendance',
          path: '/admin/monthly-attendance',
          icon: <FiCalendar />,
        },
        {
          name: 'Employee Wise Attendance',
          path: '/admin/employee-wise-attendance',
          icon: <FiGrid />,
        },
        {
          name: 'Branch Wise Attendance',
          path: '/admin/branch-wise-attendance',
          icon: <FiMapPin />,
        },
        {
          name: 'Branch Wise Monthly Attend',
          path: '/admin/branch-wise-monthly',
          icon: <FiMapPin />,
        },
      ],
    },
    {
      name: 'Accounts',
      icon: <FiCreditCard className="w-5 h-5" />,
      submenu: [
        {
          name: 'Delivery Reports',
          path: '/admin/reports/delivery',
          icon: <FiFileText />,
        },
        {
          name: 'Branch Collection',
          path: '/admin/branch-collection',
          icon: <FiDollarSign />,
        },
        {
          name: 'Invoice Processing',
          path: '/admin/invoice-processing',
          icon: <LiaFileInvoiceSolid />,
        },
        {
          name: 'Advance Payment',
          path: '/admin/advance-payment',
          icon: <FiDollarSign />,
        },
        {
          name: 'Merchant Payment',
          path: '/admin/merchant-payment',
          icon: <FiDollarSign />,
        },
        {
          name: 'Rider Payment Processing',
          path: '/admin/rider-payment',
          icon: <FiDollarSign />,
        },
        {
          name: 'Branch Payment Processing',
          path: '/admin/branch-payment',
          icon: <FiDollarSign />,
        },
        {
          name: 'Branch Payment',
          path: '/admin/branch-payments',
          icon: <FiDollarSign />,
        },
        {
          name: 'Rider Payment',
          path: '/admin/rider-payments',
          icon: <FiDollarSign />,
        },
        {
          name: 'Expense Management',
          path: '/admin/expense-management',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Income Management',
          path: '/admin/income-management',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Merchant Payment Update',
          path: '/admin/merchant-payment-update',
          icon: <FiDollarSign />,
        },
      ],
    },
    {
      name: 'Reports',
      icon: <FiFileText className="w-5 h-5" />,
      submenu: [
        {
          name: 'Delivery Reports',
          path: '/admin/reports/delivery',
          icon: <FiFileText />,
        },
        {
          name: 'Merchant Payment History',
          path: '/admin/reports/merchant-payment-history',
          icon: <FiDollarSign />,
        },
        {
          name: 'Merchant Revenue Report',
          path: '/admin/reports/merchant-revenue',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Revenue Report',
          path: '/admin/reports/revenue',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Hub Transaction History',
          path: '/admin/reports/hub-transaction',
          icon: <FiArchive />,
        },
        {
          name: 'Rider History',
          path: '/admin/reports/rider-history',
          icon: <FiClipboard />,
        },
        {
          name: 'Tickets Report',
          path: '/admin/reports/tickets',
          icon: <FiClipboard />,
        },
        {
          name: 'Expense Report',
          path: '/admin/reports/expense',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Income Report',
          path: '/admin/reports/income',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Income & Expense Summary ',
          path: '/admin/reports/income-expense-summary',
          icon: <FiTrendingUp />,
        },
        {
          name: 'Rider Collect History',
          path: '/admin/reports/rider-collect',
          icon: <FiDollarSign />,
        },
        {
          name: 'Transfer History',
          path: '/admin/reports/transfer-history',
          icon: <FiShare />,
        },
        {
          name: 'Merchant History',
          path: '/admin/reports/merchant-history',
          icon: <FiClipboard />,
        },
        {
          name: 'Hub History',
          path: '/admin/reports/hub-history',
          icon: <FiClipboard />,
        },
        {
          name: 'Merchant Adjustment',
          path: '/admin/reports/merchant-adjustment',
          icon: <FiDollarSign />,
        },
        {
          name: 'Advance Payment',
          path: '/admin/reports/advance-payment',
          icon: <FiDollarSign />,
        },
        {
          name: 'Return History',
          path: '/admin/reports/return-history',
          icon: <FiRefreshCw />,
        },
      ],
    },
  ];

  // Submenu animation
  const submenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const rotateVariants = {
    open: { rotate: 180, transition: { duration: 0.2 } },
    closed: { rotate: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-xs bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-admin-sidebar text-text-secondary h-screen fixed z-50 transition-all duration-300 ease-in-out flex flex-col
         ${isOpen ? 'w-64' : 'w-20'} ${isOpen ? 'block ' : 'hidden lg:flex '}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          {isOpen ? (
            <>
              <div>
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <p className="text-sm text-text-inverse">
                  Courier Management System
                </p>
              </div>
              <button
                onClick={toggleSidebar}
                className="text-text-inverse hover:text-white lg:hidden"
              >
                <FiX className="h-6 w-6" />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="text-text-inverse hover:text-white"
            >
              <FiUsers className="h-6 w-6 text-white" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul>
            {menuItems.map((item, idx) => (
              <li key={idx} className="mb-1">
                {item.submenu ? (
                  <>
                    {/* Parent Button */}
                    <button
                      onClick={() => {
                        if (!isOpen) toggleSidebar();
                        toggleMenu(item.name);
                      }}
                      className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-700 transition-colors ${
                        openMenu === item.name
                          ? 'bg-gray-700 border-l-4 border-blue-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        {isOpen && <span>{item.name}</span>}
                      </div>
                      {isOpen && (
                        <motion.div
                          variants={rotateVariants}
                          animate={openMenu === item.name ? 'open' : 'closed'}
                        >
                          <FiChevronDown className="w-4 h-4" />
                        </motion.div>
                      )}
                    </button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {isOpen && openMenu === item.name && (
                        <motion.ul
                          className="bg-[#0d0630] ml-4 overflow-hidden"
                          variants={submenuVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          {item.submenu.map((sub, i) => (
                            <motion.li key={i} variants={itemVariants}>
                              <Link
                                to={sub.path}
                                className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-700 transition-colors ${
                                  isActive(sub.path)
                                    ? 'bg-gray-700 border-l-4 border-blue-500'
                                    : ''
                                }`}
                              >
                                <span className="text-text-inverse">
                                  {sub.icon}
                                </span>
                                {sub.name}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center p-4 hover:bg-gray-700 transition-colors ${
                      isActive(item.path)
                        ? 'bg-gray-700 border-l-4 border-blue-500'
                        : ''
                    }`}
                    onClick={!isOpen ? toggleSidebar : undefined}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className={`flex items-center w-full p-2 hover:bg-gray-700 rounded transition-colors text-red-400 hover:text-red-300 ${
              !isOpen ? 'justify-center' : ''
            }`}
          >
            <FiLogOut className="w-5 h-5" />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
