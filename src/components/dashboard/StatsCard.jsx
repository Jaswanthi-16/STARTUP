import React from 'react';

/**
 * StatsCard component displays a metric with an icon, value, and change percentage.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - The title of the metric
 * @param {string|number} props.value - The main metric value
 * @param {React.ElementType} props.icon - The Lucide React icon component
 * @param {number} props.change - The percentage change (+ or -)
 * @param {string} props.color - Tailwind text color class for the icon (e.g., 'text-blue-600')
 * @returns {JSX.Element} The StatsCard component
 */
export default function StatsCard({ title, value, icon: Icon, change, color }) {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`p-2 rounded-lg bg-slate-50 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <div className="flex items-center mt-2">
          <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-sm text-slate-400 ml-2">vs last month</span>
        </div>
      </div>
    </div>
  );
}
