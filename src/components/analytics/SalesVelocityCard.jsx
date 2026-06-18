import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';
import { Card } from '../common/Card';

const SalesVelocityCard = ({ velocity }) => {
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white flex flex-col justify-between h-[180px] border-none shadow-md">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-indigo-100">Sales Velocity</h3>
          <div className="p-2 bg-white dark:bg-slate-800/20 rounded-lg backdrop-blur-sm">
            <Zap className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-indigo-100 text-xs">Estimated revenue generated per day</p>
      </div>
      <div className="mt-4">
        <div className="flex items-end justify-between">
          <h4 className="text-3xl font-extrabold">{formatCurrency(velocity)}<span className="text-lg font-medium text-indigo-200">/day</span></h4>
          <span className="flex items-center text-sm font-semibold text-green-300 bg-white dark:bg-slate-800/10 px-2 py-1 rounded">
            <TrendingUp className="w-3 h-3 mr-1" />
            +8%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(SalesVelocityCard);
