import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  // Sync external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-10 py-2 border border-slate-300 dark:border-slate-600 dark:border-slate-700 rounded-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors duration-200"
        placeholder="Search by name, company, or email..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        aria-label="Search leads"
      />
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-300 focus:outline-none cursor-pointer"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
