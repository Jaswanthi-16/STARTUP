import React from 'react';
import { Plus, Users, Download } from 'lucide-react';

/**
 * QuickActions component provides quick access buttons for common tasks.
 *
 * @returns {JSX.Element} The QuickActions component
 */
export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-slate-800 dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-800 dark:border-slate-800/80 h-full transition-colors duration-200">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-medium transition-colors cursor-pointer">
          <Plus className="w-4 h-4" />
          Add New Lead
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 dark:bg-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 dark:text-slate-200 border border-slate-200 dark:border-slate-700 dark:border-slate-700 py-2.5 px-4 rounded-xl font-medium transition-colors cursor-pointer">
          <Users className="w-4 h-4 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
          View All Leads
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 dark:bg-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 dark:text-slate-200 border border-slate-200 dark:border-slate-700 dark:border-slate-700 py-2.5 px-4 rounded-xl font-medium transition-colors cursor-pointer">
          <Download className="w-4 h-4 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
          Export Data
        </button>
      </div>
    </div>
  );
}
