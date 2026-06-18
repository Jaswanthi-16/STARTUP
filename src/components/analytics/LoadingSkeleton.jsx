import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg transition-colors duration-200"></div>
          <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg transition-colors duration-200"></div>
        </div>
        <div className="h-10 w-40 bg-slate-200 dark:bg-slate-700 rounded-lg transition-colors duration-200"></div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 dark:border-slate-700 shadow-sm p-6 h-32 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded transition-colors duration-200"></div>
              <div className="h-8 w-8 bg-slate-200 dark:bg-slate-700 rounded-lg transition-colors duration-200"></div>
            </div>
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded transition-colors duration-200"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 dark:border-slate-700 shadow-sm p-6 h-[400px] transition-colors duration-200">
          <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-6 transition-colors duration-200"></div>
          <div className="h-64 w-64 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto transition-colors duration-200"></div>
        </div>
        <div className="bg-white dark:bg-slate-800 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 dark:border-slate-700 shadow-sm p-6 h-[400px] transition-colors duration-200">
          <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-6 transition-colors duration-200"></div>
          <div className="h-64 w-full bg-slate-200 dark:bg-slate-700 rounded transition-colors duration-200"></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoadingSkeleton);
