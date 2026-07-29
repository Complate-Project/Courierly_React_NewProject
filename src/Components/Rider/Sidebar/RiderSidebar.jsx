import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiPackage,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiX,
  FiTruck,
  FiClock,
  FiCheckCircle,
  FiRefreshCw,
  FiTrello,
  FiBarChart2,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const RiderSidebar = ({ isOpen, toggleSidebar, logout }) => {
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
      path: '/rider/dashboard',
    },
    {
      name: 'Pickup Parcel',
      icon: <FiPackage className="w-5 h-5" />,
      path: '/rider/pickup',
    },

    {
      name: 'Delivery Parcel',
      icon: <FiTruck className="w-5 h-5" />,
      path: '/rider/delivery-parcel',
    },
    {
      name: 'Reschedule Order',
      icon: <FiRefreshCw className="w-5 h-5" />,
      path: '/rider/reschedule-order',
    },
    {
      name: 'Transfer Order',
      icon: <FiTrello className="w-5 h-5" />,
      path: '/rider/transfer-order',
    },
    {
      name: 'Return Parcel',
      icon: <FiPackage className="w-5 h-5" />,
      path: '/rider/return-parcel',
    },
    {
      name: 'Report',
      icon: <FiBarChart2 className="w-5 h-5" />,
      submenu: [
        {
          name: 'Parcel History',
          path: '/rider/reports/parcel-history',
          icon: <FiClock className="w-4 h-4" />,
        },
        {
          name: 'Transfer History',
          path: '/rider/reports/transfer-history',
          icon: <FiTruck className="w-4 h-4" />,
        },
        {
          name: 'Return History',
          path: '/rider/reports/return-history',
          icon: <FiCheckCircle className="w-4 h-4" />,
        },
      ],
    },
  ];

  // Animation variants
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
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-xs bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-rider-sidebar text-text-secondary h-screen fixed z-50 transition-all duration-300 ease-in-out flex flex-col
           ${isOpen ? 'w-[230px]' : 'w-20'} ${
          isOpen ? 'block ' : 'hidden lg:flex '
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          {isOpen ? (
            <>
              <div>
                <h1 className="text-xl font-bold text-secondary">
                  Rider Panel
                </h1>
                <p className="text-sm text-text-inverse">Delivery Management</p>
              </div>
              <button
                onClick={toggleSidebar}
                className="text-slate-300 hover:text-secondary lg:hidden"
              >
                <FiX className="h-6 w-6" />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="text-slate-300 hover:text-secondary"
            >
              <FiUser className="h-6 w-6 text-secondary" />
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
                    {/* Parent Button */}
                    <button
                      onClick={() => {
                        if (!isOpen) toggleSidebar();
                        toggleMenu(item.name);
                      }}
                      className={`w-full flex items-center justify-between p-4 text-left hover:bg-slate-700 transition-colors ${
                        openMenu === item.name ? 'bg-slate-700' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-blue-400">{item.icon}</span>
                        {isOpen && (
                          <span className="text-slate-100">{item.name}</span>
                        )}
                      </div>
                      {isOpen && (
                        <motion.div
                          variants={iconVariants}
                          animate={openMenu === item.name ? 'rotate' : 'normal'}
                        >
                          <FiChevronDown className="w-4 h-4 text-slate-400" />
                        </motion.div>
                      )}
                    </button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {isOpen && openMenu === item.name && (
                        <motion.ul
                          className="bg-slate-900 ml-6 overflow-hidden border-l border-slate-700"
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
                                className={`flex items-center gap-3 px-4 py-3 text-sm hover:bg-slate-700 transition-colors ${
                                  isActive(subItem.path)
                                    ? 'bg-blue-600 border-l-4 border-blue-400'
                                    : ''
                                }`}
                              >
                                <span className="text-blue-300">
                                  {subItem.icon}
                                </span>
                                <span className="text-slate-200">
                                  {subItem.name}
                                </span>
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
                    className={`flex items-center p-4 hover:bg-slate-700 transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-600 border-l-4 border-blue-400'
                        : ''
                    }`}
                    onClick={!isOpen ? toggleSidebar : undefined}
                  >
                    <span className="text-blue-400 mr-3">{item.icon}</span>
                    {isOpen && (
                      <span className="text-slate-100">{item.name}</span>
                    )}
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

export default RiderSidebar;
