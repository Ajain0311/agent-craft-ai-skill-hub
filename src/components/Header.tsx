import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, Brain, Menu } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useUIStore } from '../store/uiStore';

export const Header: React.FC = () => {
  const { currentUser } = useUserStore();
  const { toggleSidebar } = useUIStore();

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link
          to="/"
          className="flex items-center space-x-2 text-xl font-bold text-purple-400 hover:text-purple-300 transition-colors"
        >
          <Brain className="h-7 w-7" />
          <span>AgentCraft</span>
        </Link>
      </div>

      <nav className="hidden lg:flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              isActive ? 'bg-gray-700 text-purple-300' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/skills"
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
              isActive ? 'bg-gray-700 text-purple-300' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`
          }
        >
          <Brain className="h-5 w-5" />
          <span>Skills</span>
        </NavLink>
      </nav>

      <div className="flex items-center space-x-3">
        {currentUser ? (
          <div className="flex items-center space-x-2 group relative">
            {currentUser.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt={`${currentUser.name}'s avatar`}
                className="h-8 w-8 rounded-full object-cover border-2 border-purple-500 cursor-pointer"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm cursor-pointer">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="hidden md:inline text-gray-200 font-medium">{currentUser.name}</span>
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button type="button" className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
