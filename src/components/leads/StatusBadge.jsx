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
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'Contacted':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Qualified':
      case 'Won':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Meeting Scheduled':
      case 'Proposal Sent':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Lost':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyles(status)}`}>
      {status}
    </span>
  );
}
