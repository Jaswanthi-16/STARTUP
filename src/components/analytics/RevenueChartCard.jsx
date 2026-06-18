import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../constants/analyticsColors';
import { Card, CardHeader, CardContent } from '../common/Card';
import { useTheme } from '../../context/ThemeContext';

const RevenueChartCard = ({ data }) => {
  const { isDarkMode } = useTheme();
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { notation: "compact", compactDisplay: "short" }).format(val);

  return (
    <Card className="h-[400px] flex flex-col justify-between">
      <CardHeader>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white dark:text-white">Revenue Analytics</h3>
      </CardHeader>
      <CardContent className="flex-1 w-full pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#E2E8F0'} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} tickFormatter={formatCurrency} />
            <Tooltip
              contentStyle={{ 
                borderRadius: '12px', 
                border: isDarkMode ? '1px solid #334155' : 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                color: isDarkMode ? '#f8fafc' : '#0f172a'
              }}
              formatter={(value) => [new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value), 'Revenue']}
              labelStyle={{ fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#0F172A', marginBottom: '4px' }}
              itemStyle={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke={CHART_COLORS.success} 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              strokeWidth={3}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default React.memo(RevenueChartCard);
