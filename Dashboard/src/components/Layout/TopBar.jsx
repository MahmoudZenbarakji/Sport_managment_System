import React from 'react';

import { Bell, Search, Settings } from 'lucide-react';

const userAvatarUrl = 'https://via.placeholder.com/150/E9622B/ffffff?text=DD';

const TopBar = () => {
  const ACCENT_COLOR = 'text-[#E9622b]';

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-black text-white shadow-md border-b border-[#E9622b]">
      <div className="relative flex items-center w-80">
        <Search className={`w-5 h-5 absolute left-3 ${ACCENT_COLOR}`} />

        <input
          type="text"
          placeholder="Search"
          className="w-full h-10 pl-10 pr-4 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:ring-1 focus:ring-[#E9622b] focus:border-[#E9622b] transition-all duration-200"
        />
      </div>

      <div className="flex items-center space-x-5">
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200 relative">
          <Bell className={`w-6 h-6 ${ACCENT_COLOR}`} />

          <span className="absolute top-1 right-1 w-2 h-2 bg-[#E9622b] rounded-full border-2 border-gray-900"></span>
        </button>

        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors duration-200">
          <Settings className={`w-6 h-6 ${ACCENT_COLOR}`} />
        </button>

        <div className="h-6 w-px bg-black"></div>

        <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-white">
              Dimaa Daabous
            </span>

            <span className="text-xs text-gray-400">Admin</span>
          </div>

          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-[#E9622b]"
            src={userAvatarUrl}
            alt="Admin Avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
