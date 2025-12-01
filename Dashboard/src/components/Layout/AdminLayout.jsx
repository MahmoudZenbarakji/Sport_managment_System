import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar'; 
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex bg-black min-h-screen"> 
      
      {/* 1. Sidebar */}
      <Sidebar />

      {/* 2. Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* 2.1 TopBar */}
        <TopBar /> 
        <main className="flex-1 p-10 text-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;