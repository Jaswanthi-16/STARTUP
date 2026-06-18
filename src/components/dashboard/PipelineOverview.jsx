import React from 'react';

/**
 * PipelineOverview component displays a horizontal bar showing the distribution of lead statuses.
 *
 * @param {Object} props - Component props
 * @param {Array} props.leads - Array of lead objects containing a 'status' property
 * @returns {JSX.Element} The PipelineOverview component
 */
export default function PipelineOverview({ leads = [] }) {
  const totalLeads = leads.length;
  
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const statuses = [
    { key: 'New', color: 'bg-blue-600', label: 'New' },
    { key: 'Contacted', color: 'bg-amber-500', label: 'Contacted' },
    { key: 'Qualified', color: 'bg-green-500', label: 'Qualified' },
    { key: 'Lost', color: 'bg-red-500', label: 'Lost' }
  ];

  return (
    <div className="bg-white dark:bg-slate-800 dark:bg-slate-900 rounded-xl shadow-sm p-6 border border-slate-100 dark:border-slate-800 dark:border-slate-800/80 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-white mb-4">Pipeline Overview</h3>
      
      {totalLeads > 0 ? (
        <div className="space-y-4">
          <div className="h-4 flex rounded-full overflow-hidden w-full bg-slate-100 dark:bg-slate-800">
            {statuses.map(status => {
              const count = statusCounts[status.key] || 0;
              const percentage = (count / totalLeads) * 100;
              return percentage > 0 ? (
                <div 
                  key={status.key}
                  style={{ width: `${percentage}%` }} 
                  className={`${status.color} h-full transition-all duration-500`}
                  title={`${status.label}: ${count}`}
                />
              ) : null;
            })}
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {statuses.map(status => {
              const count = statusCounts[status.key] || 0;
              return (
                <div key={status.key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
                  <span className="text-sm text-slate-600 dark:text-slate-300 dark:text-slate-400">
                    {status.label} <span className="font-medium text-slate-900 dark:text-white dark:text-slate-200">({count})</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 text-sm">No pipeline data available.</p>
      )}
    </div>
  );
}
