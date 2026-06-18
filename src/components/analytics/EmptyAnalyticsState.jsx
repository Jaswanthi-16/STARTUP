import React from 'react';
import { BarChart3, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyAnalyticsState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 dark:border-slate-700 shadow-sm h-[600px] transition-colors duration-200">
      <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6 transition-colors duration-200">
        <BarChart3 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-white mb-2">No analytics available yet</h2>
      <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 mb-8 max-w-md text-center">
        Add your first lead to start tracking business performance, conversion rates, and revenue forecasts.
      </p>
      <Link
        to="/leads"
        className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Lead
      </Link>
    </div>
  );
};

export default React.memo(EmptyAnalyticsState);
