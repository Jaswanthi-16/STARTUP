import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * DarkModeToggle component provides a toggle switch with Sun/Moon icons,
 * an animated switch slide, and visual text indicators.
 * 
 * @returns {JSX.Element}
 */
export default function DarkModeToggle({ minimal = false }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none cursor-pointer min-h-[44px] min-w-[44px] ${minimal ? 'w-auto justify-center' : 'w-full'}`}
      aria-label="Toggle dark mode"
    >
      <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-200">
        {isDarkMode ? (
          <>
            <Moon size={18} className="text-blue-400" />
            {!minimal && <span className="text-sm font-medium">Dark Mode</span>}
          </>
        ) : (
          <>
            <Sun size={18} className="text-amber-500" />
            {!minimal && <span className="text-sm font-medium">Light Mode</span>}
          </>
        )}
      </div>
      
      {/* Animated switch track - Hidden in minimal mode */}
      {!minimal && (
        <div className={`w-9 h-5.5 rounded-full flex items-center p-0.5 transition-colors duration-300 ${
          isDarkMode ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
        }`}>
          {/* Animated switch handle */}
          <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isDarkMode ? 'translate-x-3.5' : 'translate-x-0'
          }`} />
        </div>
      )}
    </button>
  );
}
