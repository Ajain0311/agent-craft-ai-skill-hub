import React from 'react';
import { Menu, Bot } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-700 to-purple-800 text-white shadow-lg z-20 relative">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 mr-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link to="/" className="flex items-center text-xl font-bold tracking-tight">
          <Bot className="h-7 w-7 mr-2 text-indigo-200" />
          AgentCraft
        </Link>
      </div>
      {/* Could add user profile/settings here later */}
      <div className="hidden sm:block">
        {/* Placeholder for future right-side header content */}
      </div>
    </header>
  );
};
