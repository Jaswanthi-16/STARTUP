import React from 'react';
import { NavLink } from 'react-router-dom';

// Sidebar component with active page highlighting
const Sidebar = () => {
  // Define navigation links
  const links = [
    { path: '/', label: 'Dashboard' },
    { path: '/leads', label: 'Lead Management' },
    { path: '/analytics', label: 'Analytics' }
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">Startup CRM</h2>
      </div>
      <nav className="flex-1 px-4 pb-4 space-y-2 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            // Tailwind classes for active and inactive states
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
