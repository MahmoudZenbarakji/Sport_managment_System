/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, label, icon: Icon }) => {
  const ACCENT_COLOR_BG = 'bg-[#E9622b]';
  const ACCENT_COLOR_TEXT = 'text-[#E9622b]';

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-3 my-2 rounded-lg transition-colors duration-200 
         
         ${
           isActive
             ? `${ACCENT_COLOR_BG} text-white shadow-lg`
             : `text-gray-400 hover:${ACCENT_COLOR_BG} hover:text-white`
         }`
      }>
      {Icon && <Icon className="w-5 h-5 mr-3" />}

      <span className="text-lg font-medium">{label}</span>
    </NavLink>
  );
};

export default NavItem;
