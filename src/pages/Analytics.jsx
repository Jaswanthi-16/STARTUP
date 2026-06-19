import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';

import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import StatsCards from '../components/analytics/StatsCards';
import PieChartCard from '../components/analytics/PieChartCard';
import FunnelChartCard from '../components/analytics/FunnelChartCard';
import BarChartCard from '../components/analytics/BarChartCard';
import LineChartCard from '../components/analytics/LineChartCard';
import RevenueChartCard from '../components/analytics/RevenueChartCard';
import LeadSourceChart from '../components/analytics/LeadSourceChart';
import SalesVelocityCard from '../components/analytics/SalesVelocityCard';
import ForecastCard from '../components/analytics/ForecastCard';
import ActivityHeatmap from '../components/analytics/ActivityHeatmap';
import TopPerformersCard from '../components/analytics/TopPerformersCard';
import EmptyAnalyticsState from '../components/analytics/EmptyAnalyticsState';
import LoadingSkeleton from '../components/analytics/LoadingSkeleton';

const Analytics = () => {
  const { 
    dateRange, 
    setDateRange, 
    isEmpty, 
    kpis, 
    charts, 
    filteredLeads 
  } = useAnalytics();
  
  const [loading, setLoading] = useState(true);

  // Simulate a quick load to show skeleton, just for polish
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-2">Track sales performance and growth trends.</p>
        </div>
        <LoadingSkeleton />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-2">Track sales performance and growth trends.</p>
        </div>
        <EmptyAnalyticsState />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-2">Track sales performance and growth trends.</p>
        </div>
        <AnalyticsFilters dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      {/* KPIs */}
      <StatsCards kpis={kpis} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <PieChartCard data={charts.statusDistribution} totalLeads={kpis.totalLeads} />
        <FunnelChartCard data={charts.funnelData} />

        <BarChartCard data={charts.monthlyLeads} />
        <LineChartCard data={charts.conversionByMonth} />

        <RevenueChartCard data={charts.revenueByMonth} />
        <LeadSourceChart data={charts.leadSources} />

        <ActivityHeatmap data={charts.activityHeatmap} />
        <TopPerformersCard data={charts.topPerformers} />
      </div>

      {/* Bottom Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
        <ForecastCard forecastRevenue={kpis.forecastRevenue} />
        <SalesVelocityCard velocity={kpis.salesVelocity} hasWonDeals={kpis.wonLeadsCount > 0} />
      </div>
    </div>
  );
};

export default Analytics;
