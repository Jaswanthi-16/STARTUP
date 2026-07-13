import React, { createContext, useContext, useState, useCallback } from 'react';
import leadService from '../services/leadService';
import toast from 'react-hot-toast';

const LeadContext = createContext(undefined);

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchLeads = useCallback(async (params) => {
    setIsLoading(true);
    try {
      const data = await leadService.getLeads(params);
      // Depending on your API, leads might be in data, data.data, or data.leads
      setLeads(data.data || data.leads || data);
      if (data.pagination) {
        setPagination(data.pagination);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addLead = async (leadData) => {
    try {
      const newLead = await leadService.createLead(leadData);
      setLeads((prev) => [newLead, ...prev]);
      toast.success('Lead added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add lead');
      throw error;
    }
  };

  const updateLead = async (id, updates) => {
    try {
      const updatedLead = await leadService.updateLead(id, updates);
      setLeads((prev) =>
        prev.map((lead) => (lead._id === id || lead.id === id ? updatedLead : lead))
      );
      toast.success('Lead updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update lead');
      throw error;
    }
  };

  const deleteLead = async (id) => {
    try {
      await leadService.deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead._id !== id && lead.id !== id));
      toast.success('Lead deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
      throw error;
    }
  };

  const getLeadById = (id) => {
    return leads.find((lead) => lead._id === id || lead.id === id);
  };

  const value = {
    leads,
    isLoading,
    pagination,
    fetchLeads,
    addLead,
    updateLead,
    deleteLead,
    getLeadById,
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}

export { LeadContext };
