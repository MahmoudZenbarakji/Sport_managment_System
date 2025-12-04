/** @format */

import React from 'react';
import NavItem from '../Shared/NavItem';

const Sidebar = () => {
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  const isAdmin = role === 'admin';
  const isCoach = role === 'coach';

  const adminNavItems = [
  { to: '/category', label: 'Category' },
  { to: '/stadium', label: 'Stadium' },
  { to: '/user', label: 'User' },
  { to: '/requests', label: 'Requests' },
  { to: '/notifications', label: 'Notifications' },
];

  const coachNavItems = [
    { to: '/training-sessions', label: 'Training Sessions' },
  ];

  const navItems = isAdmin ? adminNavItems : coachNavItems;

  return (
    <div className="w-64 min-h-screen bg-black p-4 shadow-2xl flex flex-col border-r border-gray-900">
      <div className="text-3xl font-extrabold text-[#E9622b] mb-10 pb-4 border-b border-gray-900">
        Dashboard
      </div>

      {/* 2. Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavItem key={item.to} to={item.to} label={item.label} />
        ))}
      </nav>

      <div className="pt-4 border-t border-gray-900 text-gray-400">
        <p className="text-sm">
          Logged in as {isAdmin ? 'Admin' : isCoach ? 'Coach' : 'User'}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
