import React from 'react';

/**
 * StatusBadge component displays a pill-shaped badge for a lead's status.
 *
 * @param {Object} props - Component props
 * @param {string} props.status - The status of the lead
 * @returns {JSX.Element} The StatusBadge component
 */
export default function StatusBadge({ status }) {
  const getBadgeStyles = (status) => {
    switch (status) {
      case 'New':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 dark:text-slate-300 border-slate-200 dark:border-slate-700 dark:border-slate-700';
      case 'Contacted':
        return 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50';
      case 'Meeting Scheduled':
        return 'bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-900/50';
      case 'Proposal Sent':
        return 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50';
      case 'Won':
        return 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/50';
      case 'Lost':
        return 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50';
      default:
        return 'bg-slate-50 dark:bg-slate-900 dark:bg-slate-800 text-slate-700 dark:text-slate-200 dark:text-slate-400 border-slate-200 dark:border-slate-700 dark:border-slate-800/80';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyles(status)}`}>
      {status}
    </span>
  );
}
