import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Menu, X } from 'lucide-react';
import DarkModeToggle from './common/DarkModeToggle';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define navigation links with icons
  const links = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/leads', label: 'Lead Management', icon: Users },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-40">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Startup CRM</h2>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -mr-2 text-slate-600 dark:text-slate-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Side Drawer (opened by hamburger) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative flex flex-col w-64 max-w-[80%] h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-xl transition-all">
            <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Startup CRM</h2>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-2 text-slate-600 dark:text-slate-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium min-h-[44px] ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-semibold border-l-4 border-blue-600 pl-3'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                    }`
                  }
                >
                  <link.icon size={20} />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 z-40 safe-area-pb">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] transition-colors duration-200 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`
            }
          >
            <link.icon size={24} />
          </NavLink>
        ))}
      </nav>

      {/* Tablet & Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-300 md:w-20 lg:w-64 z-30 justify-between">
        <div>
          <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="hidden lg:block text-2xl font-bold text-slate-800 dark:text-white">Startup CRM</h2>
            <div className="lg:hidden font-bold text-xl text-blue-600 dark:text-blue-400">S</div>
          </div>
          <nav className="p-3 lg:px-4 lg:py-6 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                title={link.label}
                className={({ isActive }) =>
                  `flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-4 py-3 rounded-xl transition-all duration-200 font-medium min-h-[44px] ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 font-semibold lg:border-l-4 lg:border-blue-600 lg:pl-3'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                <link.icon size={22} />
                <span className="hidden lg:block whitespace-nowrap">{link.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-3 lg:p-6 border-t border-slate-100 dark:border-slate-800">
          <div className="lg:hidden flex justify-center">
            {/* Minimal Dark mode toggle for tablet */}
            <DarkModeToggle minimal />
          </div>
          <div className="hidden lg:block">
            <DarkModeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
