import React, { useState, useEffect } from 'react';
import { useAuth } from '../Hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';
import BranchSidebar from '../Components/Branch/Sidebar/BranchSidebar';
import Navbar from '../Components/Branch/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import useTitle from '../Hooks/useTitle';

const BranchLayout = () => {
  useTitle('Branch Dashboard');
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // ✅ Prevent redirect loop — use useEffect
  useEffect(() => {
    if (userRole !== 'branch') {
      navigate('/login');
    }
  }, [userRole, navigate]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <BranchSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        logout={logout}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar} />

        {/* Main Content (Outlet) */}
        <main className="flex-1 w-full bg-gray-50  overflow-y-auto">
          <div className=" p-4 min-h-full">
            <Outlet />
          </div>
        </main>
        {/* footer */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default BranchLayout;
