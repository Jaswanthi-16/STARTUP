import React from 'react';
import { Edit2, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import StatusBadge from './StatusBadge';

/**
 * LeadCard component displays a single lead's information in a card format.
 *
 * @param {Object} props - Component props
 * @param {Object} props.lead - The lead data object
 * @param {Function} props.onEdit - Function to handle editing the lead
 * @param {Function} props.onDelete - Function to handle deleting the lead
 * @returns {JSX.Element} The LeadCard component
 */
export default function LeadCard({ lead, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-800 dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 dark:border-slate-800/80 p-5 flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-white">{lead.name}</h3>
          <div className="flex items-center text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-1 text-sm">
            <Building2 className="w-4 h-4 mr-1.5" />
            {lead.company}
          </div>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="space-y-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 dark:border-slate-800/80 text-sm text-slate-600 dark:text-slate-300 dark:text-slate-300">
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
          <a href={`mailto:${lead.email}`} className="hover:text-blue-600 dark:hover:text-blue-400 truncate">{lead.email}</a>
        </div>
        {lead.phone && (
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" />
            <a href={`tel:${lead.phone}`} className="hover:text-blue-600 dark:hover:text-blue-400">{lead.phone}</a>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={() => onEdit(lead)}
          aria-label={`Edit ${lead.name}`}
          className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-lg transition-colors cursor-pointer"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(lead.id)}
          aria-label={`Delete ${lead.name}`}
          className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
