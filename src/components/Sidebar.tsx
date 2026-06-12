import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, PlusCircle, X } from 'lucide-react';
import { useUIStore } from '../store/uiStore';

export const Sidebar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useUIStore();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Skills List', path: '/skills', icon: List },
    { name: 'New Skill', path: '/skills/new', icon: PlusCircle },
  ];

  const activeLinkClasses = 'bg-indigo-700 text-white';
  const normalLinkClasses = 'text-indigo-200 hover:bg-indigo-600 hover:text-white';

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-indigo-800 text-white shadow-xl transform transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0 lg:w-64 lg:flex lg:flex-col lg:z-auto`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16 px-4 bg-indigo-900 lg:hidden">
          <span className="text-xl font-semibold">AgentCraft</span>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={closeSidebar} // Close sidebar on link click for mobile
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${isActive ? activeLinkClasses : normalLinkClasses}`
              }
              aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 text-xs text-indigo-300 border-t border-indigo-700">
          &copy; {new Date().getFullYear()} AgentCraft
        </div>
      </aside>
    </>
  );
};
