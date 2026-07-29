import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import AdminSidebar from '../Components/Admin/Sidebar/AdminSidebar';
import Navbar from '../Components/Admin/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import useTitle from '../Hooks/useTitle';

const AdminLayout = () => {
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useTitle('Admin Dashboard');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (userRole !== 'admin') {
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        logout={handleLogout}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={toggleSidebar}></Navbar>

        {/* Outlet for child routes */}
        <main className="flex-1 w-full overflow-hidden p-6">
          <div className="h-full">
            <Outlet />
          </div>
        </main>

        {/* footer */}
        <Footer></Footer>
      </div>
    </div>
  );
};

export default AdminLayout;
