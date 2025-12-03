import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Settings, LogOut } from 'lucide-react';

const userAvatarUrl = 'https://via.placeholder.com/150/E9622B/ffffff?text=DD';

const TopBar = () => {
  const navigate = useNavigate();
  const ACCENT_COLOR = 'text-[#E9622b]';

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    
    // Navigate to login page
    navigate('/login');
  };

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

        <div className="h-6 w-px bg-gray-700"></div>

        <div className="flex items-center space-x-3">
          <div className="flex flex-col text-right">
            <span className="text-sm font-semibold text-white">
              {(() => {
                const user = localStorage.getItem('user');
                if (user) {
                  try {
                    return JSON.parse(user).name || 'User';
                  } catch {
                    return 'User';
                  }
                }
                return 'User';
              })()}
            </span>

            <span className="text-xs text-gray-400">
              {localStorage.getItem('role') === 'admin' ? 'Admin' : localStorage.getItem('role') === 'coach' ? 'Coach' : 'User'}
            </span>
          </div>

          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-[#E9622b]"
            src={userAvatarUrl}
            alt="User Avatar"
          />
        </div>

        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 flex items-center space-x-2 rounded-lg bg-[#E9622b] hover:bg-[#d8551f] text-white transition-colors duration-200"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default TopBar;
