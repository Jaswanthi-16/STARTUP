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
      const responseData = await leadService.getLeads(params);
      const dataPayload = responseData.data || responseData;
      setLeads(dataPayload.leads || dataPayload || []);
      if (dataPayload.pagination) {
        setPagination(dataPayload.pagination);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addLead = async (leadData) => {
    try {
      const responseData = await leadService.createLead(leadData);
      // The backend returns the lead object directly in `responseData.data`
      const newLead = responseData.data?.lead || responseData.data || responseData;
      setLeads((prev) => [newLead, ...(Array.isArray(prev) ? prev : [])]);
      toast.success('Lead added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add lead');
      throw error;
    }
  };

  const updateLead = async (id, updates) => {
    try {
      const responseData = await leadService.updateLead(id, updates);
      // The backend returns the lead object directly in `responseData.data`
      const updatedLead = responseData.data?.lead || responseData.data || responseData;
      setLeads((prev) =>
        (Array.isArray(prev) ? prev : []).map((lead) => (lead._id === id || lead.id === id ? updatedLead : lead))
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
      setLeads((prev) => (Array.isArray(prev) ? prev : []).filter((lead) => lead._id !== id && lead.id !== id));
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
