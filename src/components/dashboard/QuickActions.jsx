import React from 'react';
import { Plus, Users, Download } from 'lucide-react';

/**
 * QuickActions component provides quick access buttons for common tasks.
 *
 * @returns {JSX.Element} The QuickActions component
 */
export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 h-full">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add New Lead
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2.5 px-4 rounded-lg font-medium transition-colors">
          <Users className="w-4 h-4 text-slate-500" />
          View All Leads
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2.5 px-4 rounded-lg font-medium transition-colors">
          <Download className="w-4 h-4 text-slate-500" />
          Export Data
        </button>
      </div>
    </div>
  );
}
