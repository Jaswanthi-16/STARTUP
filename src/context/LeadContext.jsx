import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { sampleLeads } from '../data/sampleLeads';

/**
 * @typedef {Object} Lead
 * @property {string} id - Unique identifier for the lead
 * @property {string} name - Full name of the lead
 * @property {string} company - Company the lead works for
 * @property {string} email - Email address
 * @property {string} phone - Phone number
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status - Current status in the pipeline
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source - Where the lead came from
 * @property {number} value - The monetary value of the lead
 * @property {string} createdAt - ISO date string of when the lead was added
 */

const LeadContext = createContext(undefined);

/**
 * LeadProvider component that wraps the app to provide lead state management.
 * @param {Object} props - React props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element}
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads);

  /**
   * Adds a new lead to the state
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData - Data for the new lead
   */
  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    if (newLead.status === 'Won') {
      newLead.wonAt = new Date().toISOString();
    }
    setLeads((prev) => [newLead, ...prev]);
  };

  /**
   * Updates an existing lead
   * @param {string} id - ID of the lead to update
   * @param {Partial<Lead>} updates - Properties to update
   */
  const updateLead = (id, updates) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === id) {
          const updatedLead = { ...lead, ...updates };
          if (updates.status === 'Won' && lead.status !== 'Won') {
            updatedLead.wonAt = new Date().toISOString();
          }
          return updatedLead;
        }
        return lead;
      })
    );
  };

  /**
   * Deletes a lead by ID
   * @param {string} id - ID of the lead to delete
   */
  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  /**
   * Gets a specific lead by ID
   * @param {string} id - ID of the lead to retrieve
   * @returns {Lead | undefined} The lead object if found, otherwise undefined
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id);
  };

  const value = {
    leads,
    addLead,
    updateLead,
    deleteLead,
    getLeadById,
  };

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

/**
 * Custom hook to consume the LeadContext
 * @returns {{
 *   leads: Lead[],
 *   addLead: (leadData: Omit<Lead, 'id' | 'createdAt'>) => void,
 *   updateLead: (id: string, updates: Partial<Lead>) => void,
 *   deleteLead: (id: string) => void,
 *   getLeadById: (id: string) => Lead | undefined
 * }}
 * @throws {Error} If used outside of LeadProvider
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}

export { LeadContext };
