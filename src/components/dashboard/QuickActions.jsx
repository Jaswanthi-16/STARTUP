import React from 'react';
import { Plus, Users, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../../context/LeadContext';
import toast from 'react-hot-toast';

/**
 * QuickActions component provides quick access buttons for common tasks.
 *
 * @returns {JSX.Element} The QuickActions component
 */
export default function QuickActions() {
  const navigate = useNavigate();
  const { leads } = useLeads();

  const handleExport = () => {
    try {
      if (!leads || leads.length === 0) {
        toast.error('No leads to export');
        return;
      }
      
      const headers = ['Name', 'Company', 'Email', 'Phone', 'Status', 'Value', 'Date Added'];
      const csvContent = [
        headers.join(','),
        ...leads.map(lead => [
          `"${lead.name || ''}"`,
          `"${lead.company || ''}"`,
          `"${lead.email || ''}"`,
          `"${lead.phone || ''}"`,
          `"${lead.status || ''}"`,
          `"${lead.value || ''}"`,
          `"${lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ''}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'startup-crm-leads.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Data exported successfully');
    } catch (error) {
      toast.error('Failed to export data');
      console.error('Export error:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-800 dark:border-slate-800/80 h-full transition-colors duration-200">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-white mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button 
          onClick={() => navigate('/leads', { state: { openAddModal: true } })}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-medium transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add New Lead
        </button>
        <button 
          onClick={() => navigate('/leads')}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 dark:bg-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 dark:text-slate-200 border border-slate-200 dark:border-slate-700 dark:border-slate-700 py-2.5 px-4 rounded-xl font-medium transition-colors cursor-pointer"
        >
          <Users className="w-4 h-4 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
          View All Leads
        </button>
        <button 
          onClick={handleExport}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-800 dark:bg-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 dark:text-slate-200 border border-slate-200 dark:border-slate-700 dark:border-slate-700 py-2.5 px-4 rounded-xl font-medium transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4 text-slate-500 dark:text-slate-400 dark:text-slate-400" />
          Export Data
        </button>
      </div>
    </div>
  );
}
