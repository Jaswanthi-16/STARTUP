import React from 'react';
import { SearchX, Users } from 'lucide-react';

export default function EmptyState({ isFiltered = false }) {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-800 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 dark:border-slate-800 border-dashed animate-in fade-in duration-300">
        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <SearchX className="w-6 h-6 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white dark:text-white mb-1">No leads found</h3>
        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 max-w-sm">
          We couldn't find any leads matching your current search and filter criteria. Try adjusting them or clear filters.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-800 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 dark:border-slate-800 border-dashed animate-in fade-in duration-300">
      <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center mb-4">
        <Users className="w-6 h-6 text-blue-500 dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-medium text-slate-900 dark:text-white dark:text-white mb-1">No leads yet</h3>
      <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 max-w-sm">
        You haven't added any leads to your CRM yet. Click the "Add Lead" button to get started.
      </p>
    </div>
  );
}
