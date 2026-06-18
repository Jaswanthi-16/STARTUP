import React from 'react';

const FILTERS = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

export default function FilterBar({ activeFilter, onFilterChange, leads = [] }) {
  const getFilterCount = (filter) => {
    if (filter === 'All') return leads.length;
    return leads.filter(lead => lead.status === filter).length;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTERS.map(filter => {
        const count = getFilterCount(filter);
        const isActive = activeFilter === filter;
        
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
              ${isActive 
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950' 
                : 'bg-white dark:bg-slate-800 dark:bg-slate-900 text-slate-600 dark:text-slate-300 dark:text-slate-300 border border-slate-200 dark:border-slate-700 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/80 hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-700'
              }
            `}
          >
            {filter} <span className={`ml-1 text-xs ${isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>({count})</span>
          </button>
        );
      })}
    </div>
  );
}
