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
import Login from './components/Pages/Login';
import TrainingSession from './components/Pages/TrainingSession';

// Simple auth route guard (allows admin and coach)
const ProtectedRoute = ({ children }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  if (!token || (role !== 'admin' && role !== 'coach')) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Coach-only route guard
const CoachRoute = ({ children }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  if (!token || role !== 'coach') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Index route redirect based on role
const IndexRedirect = () => {
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
  return <Navigate to={role === 'coach' ? '/training-sessions' : '/category'} replace />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Index route - redirect based on role */}
          <Route index element={<IndexRedirect />} />
          
          <Route path="category" element={<Category />} />
          <Route path="stadium" element={<Stadium />} />
          <Route path="user" element={<User />} />
          <Route path="user/coaches" element={<Coaches />} />
          <Route path="requests" element={<Requests />} />
          <Route path="notifications" element={<Notifications />} />
          
          {/* Coach-only route */}
          <Route 
            path="training-sessions" 
            element={
              <CoachRoute>
                <TrainingSession />
              </CoachRoute>
            } 
          />
          
          <Route path="*" element={<div className="text-4xl text-text-light">404 - Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;