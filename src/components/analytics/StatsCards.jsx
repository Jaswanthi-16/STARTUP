import React from 'react';
import { Users, Target, CircleDollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card';

const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400">{title}</h3>
        <div className="p-2 bg-slate-50 dark:bg-slate-900 dark:bg-slate-800 rounded-lg transition-colors duration-200">
          <Icon className="w-5 h-5 text-slate-600 dark:text-slate-300 dark:text-slate-400" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-white">{value}</h4>
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400 dark:text-slate-400'}`}>
            {trend}
          </span>
        )}
      </div>
    </Card>
  );
};

const StatsCards = ({ kpis }) => {
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const cards = [
    { title: 'Total Leads', value: kpis.totalLeads, icon: Users, trend: '+12%' },
    { title: 'Conversion Rate', value: `${kpis.conversionRate}%`, icon: Target, trend: '+2%' },
    { title: 'Pipeline Value', value: formatCurrency(kpis.pipelineValue), icon: CircleDollarSign },
    { title: 'Won Revenue', value: formatCurrency(kpis.wonRevenue), icon: TrendingUp },
    { title: 'Avg Sales Cycle', value: `${kpis.averageSalesCycle} Days`, icon: Clock },
    { title: 'Lost Rate', value: `${kpis.lostRate}%`, icon: AlertCircle },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} />
      ))}
    </div>
  );
};

export default React.memo(StatsCards);
