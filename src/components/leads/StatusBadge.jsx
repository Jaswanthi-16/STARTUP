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
        return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'Contacted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Meeting Scheduled':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Proposal Sent':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Won':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Lost':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyles(status)}`}>
      {status}
    </span>
  );
}
