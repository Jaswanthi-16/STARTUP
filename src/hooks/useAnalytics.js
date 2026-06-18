import { useState, useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import * as helpers from '../utils/analyticsHelpers';

export function useAnalytics() {
  const { leads } = useLeads();
  const [dateRange, setDateRange] = useState('Last 30 Days');

  // Filter leads based on selected date range
  const filteredLeads = useMemo(() => {
    if (!leads) return [];
    
    const now = new Date();
    let startDate = new Date(0); // Epoch

    if (dateRange === 'Last 7 Days') {
      startDate = new Date(now.setDate(now.getDate() - 7));
    } else if (dateRange === 'Last 30 Days') {
      startDate = new Date(now.setDate(now.getDate() - 30));
    } else if (dateRange === 'Last 90 Days') {
      startDate = new Date(now.setDate(now.getDate() - 90));
    } else if (dateRange === 'This Year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    }
    // "Custom Range" logic could be added here if we had custom start/end state

    return leads.filter((lead) => {
      if (!lead.createdAt) return false;
      const created = new Date(lead.createdAt);
      return created >= startDate;
    });
  }, [leads, dateRange]);

  // Calculate all KPIs and Chart Data, memoized
  const analyticsData = useMemo(() => {
    return {
      kpis: {
        totalLeads: filteredLeads.length,
        conversionRate: helpers.getConversionRate(filteredLeads),
        pipelineValue: helpers.getPipelineValue(filteredLeads),
        wonRevenue: helpers.getWonRevenue(filteredLeads),
        averageSalesCycle: helpers.getAverageSalesCycle(filteredLeads),
        lostRate: helpers.getLostRate(filteredLeads),
        salesVelocity: helpers.getSalesVelocity(filteredLeads),
        forecastRevenue: helpers.getForecastRevenue(filteredLeads),
      },
      charts: {
        statusDistribution: helpers.getStatusDistribution(filteredLeads),
        monthlyLeads: helpers.getMonthlyLeads(filteredLeads),
        conversionByMonth: helpers.getConversionByMonth(filteredLeads),
        revenueByMonth: helpers.getRevenueByMonth(filteredLeads),
        leadSources: helpers.getLeadSourceStats(filteredLeads),
        funnelData: helpers.getFunnelData(filteredLeads),
        topPerformers: helpers.getTopPerformers(filteredLeads),
        activityHeatmap: helpers.getActivityHeatmapData(filteredLeads),
      }
    };
  }, [filteredLeads]);

  return {
    dateRange,
    setDateRange,
    ...analyticsData,
    isEmpty: leads.length === 0,
    filteredLeads,
  };
}
