// Pure functions to calculate analytics data from leads array.

/**
 * Helper to get short month name from a date string
 */
const getMonthName = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('default', { month: 'short' });
};

/**
 * Distribution of leads by status for pie chart
 */
export const getStatusDistribution = (leads = []) => {
  if (!leads || leads.length === 0) return [];
  const counts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).map((status) => ({
    name: status,
    value: counts[status],
  }));
};

/**
 * Monthly leads trend (Last 6 months)
 */
export const getMonthlyLeads = (leads = []) => {
  if (!leads || leads.length === 0) return [];
  
  // Initialize last 6 months with 0
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      name: d.toLocaleString('default', { month: 'short' }),
      leads: 0,
      monthNum: d.getMonth(),
      year: d.getFullYear()
    });
  }

  leads.forEach(lead => {
    if (!lead.createdAt) return;
    const date = new Date(lead.createdAt);
    const m = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    const targetMonth = months.find(x => x.name === m && x.year === year);
    if (targetMonth) {
      targetMonth.leads += 1;
    }
  });

  return months.map(m => ({ name: m.name, leads: m.leads }));
};

/**
 * Conversion rate by month (Won / Total) * 100
 */
export const getConversionByMonth = (leads = []) => {
  if (!leads || leads.length === 0) return [];
  
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      name: d.toLocaleString('default', { month: 'short' }),
      total: 0,
      won: 0,
      monthNum: d.getMonth(),
      year: d.getFullYear()
    });
  }

  leads.forEach(lead => {
    if (!lead.createdAt) return;
    const date = new Date(lead.createdAt);
    const m = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    const targetMonth = months.find(x => x.name === m && x.year === year);
    if (targetMonth) {
      targetMonth.total += 1;
      if (lead.status === 'Won') {
        targetMonth.won += 1;
      }
    }
  });

  return months.map(m => {
    const rate = m.total === 0 ? 0 : Math.round((m.won / m.total) * 100);
    return { name: m.name, rate };
  });
};

/**
 * Won Revenue by month
 */
export const getRevenueByMonth = (leads = []) => {
  if (!leads || leads.length === 0) return [];
  
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      name: d.toLocaleString('default', { month: 'short' }),
      revenue: 0,
      monthNum: d.getMonth(),
      year: d.getFullYear()
    });
  }

  leads.forEach(lead => {
    if (lead.status !== 'Won' || !lead.wonAt) return;
    const date = new Date(lead.wonAt);
    const m = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    
    const targetMonth = months.find(x => x.name === m && x.year === year);
    if (targetMonth) {
      targetMonth.revenue += Number(lead.value || 0);
    }
  });

  return months.map(m => ({ name: m.name, revenue: m.revenue }));
};

/**
 * Total pipeline value (sum of all active leads)
 * Active leads: Not Won, Not Lost
 */
export const getPipelineValue = (leads = []) => {
  if (!leads || leads.length === 0) return 0;
  return leads
    .filter(lead => lead.status !== 'Won' && lead.status !== 'Lost')
    .reduce((sum, lead) => sum + Number(lead.value || 0), 0);
};

/**
 * Total won revenue
 */
export const getWonRevenue = (leads = []) => {
  if (!leads || leads.length === 0) return 0;
  return leads
    .filter(lead => lead.status === 'Won')
    .reduce((sum, lead) => sum + Number(lead.value || 0), 0);
};

/**
 * Average sales cycle in days
 */
export const getAverageSalesCycle = (leads = []) => {
  if (!leads || leads.length === 0) return 0;
  const wonLeads = leads.filter(lead => lead.status === 'Won' && lead.createdAt && lead.wonAt);
  if (wonLeads.length === 0) return 0;

  const totalDays = wonLeads.reduce((sum, lead) => {
    const created = new Date(lead.createdAt).getTime();
    const won = new Date(lead.wonAt).getTime();
    const diffTime = Math.abs(won - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return sum + diffDays;
  }, 0);

  return Math.round(totalDays / wonLeads.length);
};

/**
 * Lost Rate (Lost Leads / Total Leads) * 100
 */
export const getLostRate = (leads = []) => {
  if (!leads || leads.length === 0) return 0;
  const lostLeads = leads.filter(lead => lead.status === 'Lost').length;
  return Math.round((lostLeads / leads.length) * 100);
};

/**
 * Conversion Rate (Won Leads / Total Leads) * 100
 */
export const getConversionRate = (leads = []) => {
  if (!leads || leads.length === 0) return 0;
  const wonLeads = leads.filter(lead => lead.status === 'Won').length;
  return Math.round((wonLeads / leads.length) * 100);
};

/**
 * Lead sources distribution
 */
export const getLeadSourceStats = (leads = []) => {
  if (!leads || leads.length === 0) return [];
  const counts = leads.reduce((acc, lead) => {
    const source = lead.source || 'Unknown';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts)
    .map((source) => ({
      name: source,
      value: counts[source],
    }))
    .sort((a, b) => b.value - a.value); // Sort descending
};

/**
 * Funnel Data (New -> Contacted -> Meeting -> Proposal -> Won)
 */
export const getFunnelData = (leads = []) => {
  if (!leads || leads.length === 0) return [];
  
  // A simplistic funnel: count how many leads reached AT LEAST that stage.
  // We'll define a hierarchy. If someone is 'Won', they went through 'Proposal', etc.
  // Based on the prompt: "Show conversion %, Show drop-off %, Show counts"
  const stageHierarchy = {
    'New': 1,
    'Contacted': 2,
    'Meeting': 3,
    'Meeting Scheduled': 3,
    'Proposal': 4,
    'Proposal Sent': 4,
    'Won': 5
  };

  const counts = {
    'New': 0,
    'Contacted': 0,
    'Meeting': 0,
    'Proposal': 0,
    'Won': 0
  };

  leads.forEach(lead => {
    // If a lead has a status that is not in hierarchy (e.g. Lost), we might just count them based on where they dropped off if we knew.
    // For simplicity, we count their current status and everything below it.
    // E.g., if status is 'Meeting' (3), we increment New, Contacted, Meeting.
    const level = stageHierarchy[lead.status] || 1; // Default to 1 if Lost but usually Lost can happen at any stage.
    
    // Increment counts for this level and all previous levels
    if (level >= 1) counts['New']++;
    if (level >= 2) counts['Contacted']++;
    if (level >= 3) counts['Meeting']++;
    if (level >= 4) counts['Proposal']++;
    if (level >= 5) counts['Won']++;
  });

  return [
    { name: 'New', value: counts['New'], fill: "#94A3B8" },
    { name: 'Contacted', value: counts['Contacted'], fill: "#2563EB" },
    { name: 'Meeting', value: counts['Meeting'], fill: "#F59E0B" },
    { name: 'Proposal', value: counts['Proposal'], fill: "#7C3AED" },
    { name: 'Won', value: counts['Won'], fill: "#22C55E" }
  ];
};

export const getSalesVelocity = (leads = []) => {
  if (!leads || leads.length === 0) return 0;
  
  // Changed to include all active leads (not just 'Won') 
  // so Sales Velocity updates immediately when a new lead is added
  const activeLeads = leads.filter(l => l.status !== 'Lost');
  if (activeLeads.length === 0) return 0;
  
  const totalRevenue = activeLeads.reduce((sum, l) => sum + Number(l.value || 0), 0);
  
  return Math.round(totalRevenue / 30);
};

/**
 * Forecast Revenue
 * Formula: Total Pipeline Value × 30%
 */
export const getForecastRevenue = (leads = []) => {
  const pipelineValue = getPipelineValue(leads);
  return Math.round(pipelineValue * 0.30);
};

/**
 * Top Performers (Rank by Won Revenue)
 */
export const getTopPerformers = (leads = []) => {
  if (!leads || leads.length === 0) return [];
  
  const repStats = {};
  
  leads.forEach(lead => {
    const owner = lead.owner || 'Unassigned';
    if (!repStats[owner]) {
      repStats[owner] = { name: owner, revenue: 0, deals: 0 };
    }
    
    if (lead.status === 'Won') {
      repStats[owner].revenue += Number(lead.value || 0);
      repStats[owner].deals += 1;
    }
  });

  return Object.values(repStats)
    .filter(rep => rep.revenue > 0)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5); // Top 5
};

/**
 * Activity Heatmap Data
 * Simulating GitHub style heatmap with daily activities
 */
export const getActivityHeatmapData = (leads = []) => {
  if (!leads || leads.length === 0) return [];
  
  // Format needed for heatmap is typically an array of { date, count }
  const activities = {};
  
  const addActivity = (dateStr) => {
    if (!dateStr) return;
    const date = new Date(dateStr).toISOString().split('T')[0];
    activities[date] = (activities[date] || 0) + 1;
  };
  
  leads.forEach(lead => {
    addActivity(lead.createdAt);
    if (lead.contactedAt) addActivity(lead.contactedAt);
    if (lead.meetingAt) addActivity(lead.meetingAt);
    if (lead.proposalAt) addActivity(lead.proposalAt);
    if (lead.wonAt) addActivity(lead.wonAt);
  });
  
  // Convert to array
  return Object.keys(activities).map(date => ({
    date,
    count: activities[date]
  }));
};
