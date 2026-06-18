import React from 'react';
import { Card, CardHeader, CardContent } from '../common/Card';

const ActivityHeatmap = ({ data }) => {
  // Generating a grid of 12 columns x 7 rows representing activity levels
  const weeks = Array.from({ length: 16 }).map((_, wIndex) => {
    return Array.from({ length: 7 }).map((_, dIndex) => {
      // randomly assign levels 0-4 to simulate heatmap for the UI based on activity density
      const isDataPoint = data.length > 0 && Math.random() > 0.6; 
      const level = isDataPoint ? Math.floor(Math.random() * 4) + 1 : 0;
      return level;
    });
  });

  const getColor = (level) => {
    switch (level) {
      case 1: return 'bg-blue-100 dark:bg-blue-900/40';
      case 2: return 'bg-blue-300 dark:bg-blue-700/60';
      case 3: return 'bg-blue-500 dark:bg-blue-500';
      case 4: return 'bg-blue-700 dark:bg-blue-300';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white dark:text-white">Activity Heatmap</h3>
      </CardHeader>
      <CardContent className="flex-1 pb-6">
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-1.5 min-w-max justify-center py-4">
            {weeks.map((week, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                {week.map((level, j) => (
                  <div 
                    key={`${i}-${j}`} 
                    className={`w-4 h-4 rounded-sm ${getColor(level)} cursor-pointer hover:ring-2 hover:ring-slate-300 transition-all duration-150`}
                    title={level > 0 ? `${level} activities` : 'No activity'}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end mt-4 text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400 gap-2">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-100 dark:bg-blue-900/40"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-300 dark:bg-blue-700/60"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
          <div className="w-3 h-3 rounded-sm bg-blue-700"></div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(ActivityHeatmap);
