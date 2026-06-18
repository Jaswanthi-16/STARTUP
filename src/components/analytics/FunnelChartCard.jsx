import React, { useMemo } from 'react';
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '../common/Card';
import { useTheme } from '../../context/ThemeContext';

const FunnelChartCard = ({ data }) => {
  const { isDarkMode } = useTheme();
  // Calculate stage metrics (conversions & drop-offs)
  const funnelMetrics = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    const firstValue = data[0]?.value || 0;
    
    return data.map((item, idx) => {
      const value = item.value;
      const prevValue = idx > 0 ? data[idx - 1].value : value;
      
      const convRate = firstValue ? Math.round((value / firstValue) * 100) : 0;
      const dropOffRate = prevValue ? Math.round(((prevValue - value) / prevValue) * 100) : 0;
      
      return {
        ...item,
        convRate,
        dropOffRate
      };
    });
  }, [data]);

  return (
    <Card className="h-[450px] flex flex-col justify-between">
      <CardHeader>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white dark:text-white">Sales Funnel</h3>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col sm:flex-row items-center gap-6 pb-6 overflow-hidden">
        {/* Recharts Funnel visualization */}
        <div className="flex-1 w-full h-[250px] sm:h-full min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip 
                formatter={(value, name, props) => {
                  const stage = props.payload;
                  return [`${value} Leads (${stage.convRate}% Conv)`, stage.name];
                }}
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: isDarkMode ? '1px solid #334155' : 'none', 
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  color: isDarkMode ? '#f8fafc' : '#0f172a'
                }}
                itemStyle={{ color: isDarkMode ? '#f8fafc' : '#0f172a' }}
              />
              <Funnel
                dataKey="value"
                data={funnelMetrics}
                isAnimationActive
              >
                <LabelList position="right" fill={isDarkMode ? '#cbd5e1' : '#475569'} stroke="none" dataKey="name" fontStyle="bold" fontSize={11} />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed funnel conversion metrics table */}
        <div className="w-full sm:w-[220px] shrink-0 space-y-3">
          {funnelMetrics.map((stage, idx) => (
            <div key={stage.name} className="flex flex-col p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800/50 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 dark:text-slate-300 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: stage.fill }}></span>
                  {stage.name}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white dark:text-white">{stage.value}</span>
              </div>
              <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-400">
                <span>Conv: {stage.convRate}%</span>
                {idx > 0 && <span className="text-red-500">Drop: -{stage.dropOffRate}%</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(FunnelChartCard);
