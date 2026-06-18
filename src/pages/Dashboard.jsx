import React from 'react';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';

/**
 * Dashboard page assembling stats, pipeline overview, recent leads, and quick actions.
 *
 * @returns {JSX.Element} The Dashboard page component
 */
export default function Dashboard() {
  const { leads = [] } = useLeads();

  // Dynamic KPI Calculations
  const totalLeads = leads.length;

  const wonLeads = leads.filter(l => l.status === 'Won');
  const conversionRate = totalLeads > 0
    ? Math.round((wonLeads.length / totalLeads) * 100)
    : 0;

  const activeLeads = leads.filter(l => l.status !== 'Won' && l.status !== 'Lost');
  const activeOpportunities = activeLeads.length;

  const wonRevenue = wonLeads.reduce((sum, l) => sum + Number(l.value || 0), 0);
  const formattedRevenue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(wonRevenue);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back! Here's what's happening with your leads today.</p>
        </div>

        {/* Stats Grid - 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatsCard
            title="Total Leads"
            value={totalLeads.toString()}
            icon={Users}
            change={12.5}
            color="text-blue-600"
          />
          <StatsCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={TrendingUp}
            change={2.1}
            color="text-green-600"
          />
          <StatsCard
            title="Active Opportunities"
            value={activeOpportunities.toString()}
            icon={Activity}
            change={-5.4}
            color="text-amber-500"
          />
          <StatsCard
            title="Won Revenue"
            value={formattedRevenue}
            icon={DollarSign}
            change={8.4}
            color="text-emerald-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6">

          {/* Left Column (takes 2/3 space on large screens) */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <PipelineOverview leads={leads} />
            <RecentLeads leads={leads} />
          </div>

          {/* Right Column (takes 1/3 space on large screens) */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            <QuickActions />
          </div>

        </div>

      </div>
    </div>
  );
}
