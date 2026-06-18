import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../common/Card';

const TopPerformersCard = ({ data }) => {
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white dark:text-white">Top Performers</h3>
        <Trophy className="w-5 h-5 text-yellow-500" />
      </CardHeader>
      
      <CardContent className="flex-1 pb-6">
        {data.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 dark:text-slate-400 py-12">
            No won deals yet.
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((rep, index) => (
              <div key={rep.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/50 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-200
                    ${index === 0 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500' : 
                      index === 1 ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 dark:text-slate-400' : 
                      index === 2 ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500' : 
                      'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}
                  >
                    {index < 3 ? <Medal className="w-4 h-4" /> : index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white dark:text-white">{rep.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-400">{rep.deals} Deals Won</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900 dark:text-white dark:text-white">{formatCurrency(rep.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(TopPerformersCard);
