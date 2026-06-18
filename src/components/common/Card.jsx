import React from 'react';

/**
 * Premium Card component conforming to SaaS UI Design Standards.
 */
export const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-2xl border border-slate-200 dark:border-slate-700 dark:border-slate-800/80 bg-white dark:bg-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white dark:text-slate-100 shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Premium CardHeader component for SaaS dashboards.
 */
export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`p-6 pb-3 flex flex-col space-y-1.5 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Premium CardContent component for SaaS dashboards.
 */
export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 pt-0 min-h-0 ${className}`}>
      {children}
    </div>
  );
};
