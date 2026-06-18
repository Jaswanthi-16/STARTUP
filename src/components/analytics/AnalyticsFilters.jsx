import React from 'react';
import { Calendar } from 'lucide-react';

const AnalyticsFilters = ({ dateRange, setDateRange }) => {
  const options = ['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Year', 'Custom Range'];

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="bg-white dark:bg-slate-800 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:border-slate-700 text-slate-700 dark:text-slate-200 dark:text-slate-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 block w-full p-2.5 transition-colors duration-200"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(AnalyticsFilters);
