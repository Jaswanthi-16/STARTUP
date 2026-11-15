import React from 'react';
import StatusBadge from '../leads/StatusBadge';

/**
 * RecentLeads component displays a table of the most recently added leads.
 *
 * @param {Object} props - Component props
 * @param {Array} props.leads - Array of lead objects
 * @returns {JSX.Element} The RecentLeads component
 */
export default function RecentLeads({ leads = [] }) {
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt || b.dateAdded || 0) - new Date(a.createdAt || a.dateAdded || 0))
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-800 dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 dark:border-slate-800/80 overflow-hidden transition-colors duration-200">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 dark:border-slate-800/80 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-white">Recent Leads</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 dark:text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Company</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead, index) => (
                <tr key={lead._id || lead.id || index} className="hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white dark:text-white">{lead.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300 dark:text-slate-400">{lead.company}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400 dark:text-slate-400">
                    {new Date(lead.createdAt || lead.dateAdded || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 dark:text-slate-400">
                  No recent leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
