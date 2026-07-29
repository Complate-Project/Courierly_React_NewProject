import React, { useState } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Outlet, useNavigate } from 'react-router-dom';
import RiderSidebar from '../Components/Rider/Sidebar/RiderSidebar';
import Navbar from '../Components/Rider/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import useTitle from '../Hooks/useTitle';

const RiderLayout = () => {
  useTitle('Rider Dashboard');
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Security check
  if (userRole !== 'rider') {
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <RiderSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        logout={logout}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-56' : 'lg:ml-20'
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar}></Navbar>

        {/* Main Content (Outlet) */}
        <main className="flex-1 w-full  overflow-y-auto">
          <div className="bg-gray-50 shadow rounded-xl p-6 min-h-full">
            <Outlet></Outlet>
          </div>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RiderLayout;
