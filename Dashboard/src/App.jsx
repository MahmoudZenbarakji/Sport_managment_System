// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import AdminLayout from './components/Layout/AdminLayout';

// Pages
import Category from './components/Pages/Category';
import Stadium from './components/Pages/Stadium';
import User from './components/Pages/User';
import Requests from './components/Pages/Requests';
import Notifications from './components/Pages/Notifications';
import Coaches from './components/Pages/Coaches';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          
          <Route index element={<Navigate to="/category" replace />} />
          
          <Route path="category" element={<Category />} />
          <Route path="stadium" element={<Stadium />} />
          <Route path="user" element={<User />} />
          <Route path="user/coaches" element={<Coaches />} />
          <Route path="requests" element={<Requests />} />
          <Route path="notifications" element={<Notifications />} />
          
          <Route path="*" element={<div className="text-4xl text-text-light">404 - Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;