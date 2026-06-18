import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../constants/analyticsColors';
import { Card, CardHeader, CardContent } from '../common/Card';
import { useTheme } from '../../context/ThemeContext';

const LineChartCard = ({ data }) => {
  const { isDarkMode } = useTheme();
  return (
    <Card className="h-[400px] flex flex-col justify-between">
      <CardHeader>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white dark:text-white">Monthly Conversion Trend</h3>
      </CardHeader>
      <CardContent className="flex-1 w-full pb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#E2E8F0'} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
            <Tooltip
              contentStyle={{ 
                borderRadius: '12px', 
                border: isDarkMode ? '1px solid #334155' : 'none', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                color: isDarkMode ? '#f8fafc' : '#0f172a'
              }}
              formatter={(value) => [`${value}%`, 'Conversion Rate']}
              labelStyle={{ fontWeight: 'bold', color: isDarkMode ? '#f8fafc' : '#0F172A', marginBottom: '4px' }}
              itemStyle={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}
            />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke={CHART_COLORS.success} 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default React.memo(LineChartCard);
