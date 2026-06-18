import React from 'react';
import { LineChart, TrendingUp } from 'lucide-react';
import { Card } from '../common/Card';

const ForecastCard = ({ forecastRevenue }) => {
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="p-6 flex flex-col justify-between h-[180px]">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400">Revenue Forecast</h3>
          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg transition-colors duration-200">
            <LineChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 text-xs">Predicted revenue next month</p>
      </div>
      <div className="mt-4">
        <div className="flex items-end justify-between">
          <h4 className="text-3xl font-extrabold text-slate-900 dark:text-white dark:text-white">{formatCurrency(forecastRevenue)}</h4>
          <div className="flex flex-col items-end">
            <span className="flex items-center text-sm font-semibold text-green-600 dark:text-green-400 mb-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              High Confidence
            </span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Based on last 6 months</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(ForecastCard);
