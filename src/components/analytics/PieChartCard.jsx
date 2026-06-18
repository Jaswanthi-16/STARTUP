import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Sector } from 'recharts';
import { STATUS_COLORS } from '../../constants/analyticsColors';
import { Card, CardHeader, CardContent } from '../common/Card';
import { useTheme } from '../../context/ThemeContext';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

const PieChartCard = ({ data, totalLeads }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { isDarkMode } = useTheme();

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <Card className="h-[450px] flex flex-col justify-between">
      <CardHeader>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white dark:text-white">Lead Status Distribution</h3>
      </CardHeader>
      <CardContent className="flex-1 relative pb-6">
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-30px]">
          <span className="text-3xl font-extrabold text-slate-900 dark:text-white dark:text-white transition-colors duration-200">{totalLeads}</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider transition-colors duration-200">Total Leads</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#CBD5E1'} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} Leads`, name]}
              contentStyle={{ 
                borderRadius: '12px', 
                border: isDarkMode ? '1px solid #334155' : 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                color: isDarkMode ? '#f8fafc' : '#0f172a'
              }}
              itemStyle={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              formatter={(value, entry) => {
                 const d = data.find(item => item.name === value);
                 if (!d) return value;
                 const pct = totalLeads ? Math.round((d.value / totalLeads) * 100) : 0;
                 return (
                   <span className="text-slate-700 dark:text-slate-200 dark:text-slate-300 font-medium ml-1 transition-colors duration-200">
                     {value} <span className="text-slate-500 dark:text-slate-400 dark:text-slate-400 ml-1">{d.value} ({pct}%)</span>
                   </span>
                 );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default React.memo(PieChartCard);
