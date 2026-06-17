import React from 'react';
import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';

/**
 * Dashboard page assembling stats, pipeline overview, recent leads, and quick actions.
 *
 * @returns {JSX.Element} The Dashboard page component
 */
export default function Dashboard() {
  // Sample Data for Phase 8
  const sampleLeads = [
    { id: 1, name: 'Alice Smith', company: 'TechCorp', status: 'New', dateAdded: '2023-10-25T10:00:00Z' },
    { id: 2, name: 'Bob Jones', company: 'Global Ind.', status: 'Contacted', dateAdded: '2023-10-26T14:30:00Z' },
    { id: 3, name: 'Charlie Brown', company: 'StartUp Inc', status: 'Qualified', dateAdded: '2023-10-27T09:15:00Z' },
    { id: 4, name: 'Diana Prince', company: 'Amazonia', status: 'New', dateAdded: '2023-10-28T16:45:00Z' },
    { id: 5, name: 'Evan Wright', company: 'Wright Co', status: 'Lost', dateAdded: '2023-10-29T11:20:00Z' },
    { id: 6, name: 'Fiona Gallagher', company: 'Shamrock', status: 'Qualified', dateAdded: '2023-10-30T13:10:00Z' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your leads today.</p>
        </div>

        {/* Stats Grid - 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Leads" 
            value="1,284" 
            icon={Users} 
            change={12.5} 
            color="text-blue-600" 
          />
          <StatsCard 
            title="Conversion Rate" 
            value="18.2%" 
            icon={TrendingUp} 
            change={2.1} 
            color="text-green-600" 
          />
          <StatsCard 
            title="Active Opportunities" 
            value="43" 
            icon={Activity} 
            change={-5.4} 
            color="text-amber-500" 
          />
          <StatsCard 
            title="Estimated Revenue" 
            value="$124,500" 
            icon={DollarSign} 
            change={8.4} 
            color="text-emerald-600" 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column (takes 2/3 space on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <PipelineOverview leads={sampleLeads} />
            <RecentLeads leads={sampleLeads} />
          </div>

          {/* Right Column (takes 1/3 space on large screens) */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActions />
          </div>
          
        </div>
        
      </div>
    </div>
  );
}
