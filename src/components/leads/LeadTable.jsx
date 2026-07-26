import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * LeadTable component displays all leads in a tabular format.
 *
 * @param {Object} props - Component props
 * @param {Array} props.leads - Array of lead data objects
 * @param {Function} props.onEdit - Function to handle editing a lead
 * @param {Function} props.onDelete - Function to handle deleting a lead
 * @returns {JSX.Element} The LeadTable component
 */
export default function LeadTable({ leads, onEdit, onDelete }) {
  if (leads.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 dark:border-slate-800/80 p-8 text-center text-slate-500 dark:text-slate-400 dark:text-slate-400 transition-colors duration-200">
        No leads found. Create one to get started.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 dark:border-slate-800/80 overflow-x-auto transition-colors duration-200">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-900 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 dark:text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 dark:border-slate-800/80">
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Company</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Source</th>
            <th className="px-6 py-4 font-medium">Date Added</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
          {leads.map((lead) => (
            <tr key={lead._id || lead.id} className="hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white dark:text-white">{lead.name}</td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-300 dark:text-slate-300">{lead.company}</td>
              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-300 dark:text-slate-300">{lead.email}</td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-300 dark:text-slate-300">{lead.source}</td>
              <td className="px-6 py-4 text-slate-500 dark:text-slate-400 dark:text-slate-400">
                {new Date(lead.createdAt || lead.dateAdded || Date.now()).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(lead)}
                    aria-label={`Edit ${lead.name}`}
                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-md transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(lead._id || lead.id)}
                    aria-label={`Delete ${lead.name}`}
                    className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
