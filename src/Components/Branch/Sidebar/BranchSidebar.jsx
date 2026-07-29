import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiPackage,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiX,
  FiUser,
  FiDownload,
  FiUpload,
  FiPlusSquare,
  FiSearch,
  FiTruck,
  FiUserCheck,
  FiFileText,
  FiBox,
  FiDollarSign,
  FiActivity,
  FiCreditCard,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const BranchSidebar = ({ isOpen, toggleSidebar, logout }) => {
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
      path: '/branch/dashboard',
    },
    {
      name: 'Staff Management',
      icon: <FiUsers className="w-5 h-5" />,
      submenu: [
        {
          name: 'Rider ',
          path: '/branch/dashboard/riders',
          icon: <FiTruck />,
        },
        {
          name: 'In Charge',
          path: '/branch/dashboard/in-charge',
          icon: <FiUserCheck />,
        },
      ],
    },
    {
      name: 'Parcel Management',
      icon: <FiPackage className="w-5 h-5" />,
      submenu: [
        {
          name: 'Consignments',
          path: '/branch/dashboard/consignments',
          icon: <FiDownload />,
        },
        {
          name: 'Add Parcel',
          path: '/branch/dashboard/add-parcel',
          icon: <FiUpload />,
        },
        {
          name: 'Bulk Import',
          path: '/branch/dashboard/bulk-import',
          icon: <FiPlusSquare />,
        },
        {
          name: 'Order Export',
          path: '/branch/dashboard/order-export',
          icon: <FiSearch />,
        },
      ],
    },
    {
      name: 'Operation',
      icon: <FiActivity className="w-5 h-5" />,
      submenu: [
        {
          name: 'Consignments Request',
          path: '/branch/dashboard/consignments-request',
          icon: <FiDownload />,
        },
        {
          name: 'Consignments Receive',
          path: '/branch/dashboard/consignments-receive',
          icon: <FiUpload />,
        },
        {
          name: 'Transit Parcel',
          path: '/branch/dashboard/transit-parcel',
          icon: <FiPlusSquare />,
        },
        {
          name: 'Destination Hub',
          path: '/branch/dashboard/destination-hub',
          icon: <FiSearch />,
        },
        {
          name: 'Delivery Parcel',
          path: '/branch/dashboard/delivery-parcel',
          icon: <FiSearch />,
        },
        {
          name: 'Collect Amount Rider',
          path: '/branch/dashboard/collect-amount-rider',
          icon: <FiSearch />,
        },

        {
          name: 'Return Processing',
          path: '/branch/dashboard/return-processing',
          icon: <FiSearch />,
        },
        {
          name: 'Reschedule Parcel',
          path: '/branch/dashboard/reschedule-parcel',
          icon: <FiSearch />,
        },
      ],
    },
    {
      name: 'Payment Processing',
      icon: <FiCreditCard className="w-5 h-5" />,
      submenu: [
        {
          name: 'Collection Amount',
          path: '/branch/dashboard/collection-amount',
          icon: <FiDownload />,
        },
        {
          name: 'Payment Amount',
          path: '/branch/dashboard/payment-amount',
          icon: <FiUpload />,
        },
      ],
    },

    {
      name: 'Parcel Re Assign',
      icon: <FiTruck className="w-5 h-5" />,
      submenu: [
        {
          name: 'Pickup Re Assign',
          path: '/branch/dashboard/pickup-re-assign',
          icon: <FiDownload />,
        },
        {
          name: 'Delivery Re Assign',
          path: '/branch/dashboard/delivery-re-assign',
          icon: <FiUpload />,
        },
        {
          name: 'Hub Fulfillment',
          path: '/branch/dashboard/hub-fulfillment',
          icon: <FiPlusSquare />,
        },
      ],
    },

    {
      name: 'Reports',
      icon: <FiBarChart2 className="w-5 h-5" />,
      submenu: [
        {
          name: 'Rider History',
          path: '/branch/dashboard/rider-history',
          icon: <FiFileText />,
        },
        {
          name: 'Transaction History',
          path: '/branch/dashboard/transaction-history',
          icon: <FiBox />,
        },
        {
          name: 'Rider Collect History',
          path: '/branch/dashboard/rider-collect-history',
          icon: <FiDollarSign />,
        },
        {
          name: 'Transfer History',
          path: '/branch/dashboard/transfer-history',
          icon: <FiDollarSign />,
        },
        {
          name: 'Return History',
          path: '/branch/dashboard/return-history',
          icon: <FiDollarSign />,
        },
      ],
    },
  ];

  const submenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.2 } },
    open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  };

  const iconVariants = {
    rotate: { rotate: 180, transition: { duration: 0.2 } },
    normal: { rotate: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-xs bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`bg-branch-sidebar text-text-secondary h-screen fixed z-50 transition-all duration-300 ease-in-out flex flex-col
           ${isOpen ? 'w-64' : 'w-20'} ${
          isOpen ? 'block ' : 'hidden lg:flex '
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#4361ee] flex justify-between items-center">
          {isOpen ? (
            <>
              <div>
                <h1 className="text-xl font-bold">Branch Panel</h1>
                <p className="text-sm text-text-secondary">
                  Courier Branch Management
                </p>
              </div>
              <button
                onClick={toggleSidebar}
                className="text-text-secondary hover:text-text-secondary lg:hidden"
              >
                <FiX className="h-6 w-6" />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="text-text-secondary hover:text-text-secondary"
            >
              <FiUser className="h-6 w-6 text-text-secondary" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-1">
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => {
                        if (!isOpen) toggleSidebar();
                        toggleMenu(item.name);
                      }}
                      className={`w-full flex items-center justify-between p-4 text-left hover:bg-[#4361ee] transition-colors ${
                        openMenu === item.name
                          ? 'bg-[#4361ee] border-l-4 border-white'
                          : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        {isOpen && <span>{item.name}</span>}
                      </div>
                      {isOpen && (
                        <motion.div
                          variants={iconVariants}
                          animate={openMenu === item.name ? 'rotate' : 'normal'}
                        >
                          <FiChevronDown className="w-4 h-4" />
                        </motion.div>
                      )}
                    </button>

                    <AnimatePresence>
                      {isOpen && openMenu === item.name && (
                        <motion.ul
                          className="bg-[#002855] ml-4 overflow-hidden"
                          variants={submenuVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                        >
                          {item.submenu.map((subItem, subIndex) => (
                            <motion.li
                              key={subIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{
                                duration: 0.2,
                                delay: subIndex * 0.05,
                              }}
                            >
                              <Link
                                to={subItem.path}
                                className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-[#4361ee] transition-colors ${
                                  isActive(subItem.path)
                                    ? 'bg-[#4361ee] border-l-4 border-white'
                                    : ''
                                }`}
                              >
                                <span className="text-text-secondary">
                                  {subItem.icon}
                                </span>
                                {subItem.name}
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
                    className={`flex items-center p-4 hover:bg-[#4361ee] transition-colors ${
                      isActive(item.path)
                        ? 'bg-[#4361ee] border-l-4 border-white'
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
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={logout}
            className={`flex items-center w-full p-3 hover:bg-slate-700 rounded-lg transition-colors text-red-400 hover:text-red-300 ${
              !isOpen ? 'justify-center' : ''
            }`}
          >
            <FiLogOut className="w-5 h-5" />
            {isOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default BranchSidebar;
