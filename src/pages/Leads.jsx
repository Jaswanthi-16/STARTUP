import React, { useState, useMemo } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';
import SearchBar from '../components/common/SearchBar';
import FilterBar from '../components/common/FilterBar';
import EmptyState from '../components/common/EmptyState';
import { useLeads } from '../context/LeadContext';

export default function Leads() {
  const { leads = [], addLead, updateLead, deleteLead } = useLeads();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewMode, setViewMode] = useState('table');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesFilter =
        activeFilter === 'All' ||
        lead?.status === activeFilter;

      const query = searchQuery.toLowerCase();

      const matchesSearch =
        !query ||
        lead?.name?.toLowerCase().includes(query) ||
        lead?.company?.toLowerCase().includes(query) ||
        lead?.email?.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [leads, activeFilter, searchQuery]);

  const handleOpenModal = (lead = null) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  const handleSubmitLead = (leadData) => {
    try {
      if (selectedLead) {
        updateLead(selectedLead.id, leadData);
        toast.success('Lead updated successfully');
      } else {
        addLead(leadData);
        toast.success('Lead created successfully');
      }

      handleCloseModal();
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  const handleDeleteLead = (id) => {
    if (!id) return;

    if (window.confirm('Are you sure you want to delete this lead?')) {
      deleteLead(id);
      toast.success('Lead deleted successfully');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:bg-slate-900 p-6 md:p-8 transition-colors duration-200">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-white">
              Leads ({leads.length})
            </h1>
            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-400 mt-1">
              Manage your prospects and contacts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View toggles - hidden on mobile, visible on md and up */}
            <div className="hidden md:flex items-center bg-white dark:bg-slate-800 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:border-slate-700 rounded-lg p-1 transition-colors duration-200">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === 'table'
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700/50'
                  } transition-colors duration-200`}
              >
                <List size={18} />
              </button>

              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded min-h-[44px] min-w-[44px] flex items-center justify-center ${viewMode === 'grid'
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 dark:text-slate-400 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700/50'
                  } transition-colors duration-200`}
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg min-h-[44px]"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Lead</span>
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            leads={leads}
          />
        </div>

        {/* Empty Dataset */}
        {leads.length === 0 ? (
          <EmptyState
            title="No Leads Yet"
            description="Start by creating your first lead."
          />
        ) : filteredLeads.length === 0 ? (
          <EmptyState
            isFiltered
            title="No Results Found"
            description="Try changing your search or filters."
          />
        ) : (
          <>
            {/* Mobile View (Grid Only) */}
            <div className="block md:hidden">
              <div className="grid gap-4">
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onEdit={handleOpenModal}
                    onDelete={handleDeleteLead}
                  />
                ))}
              </div>
            </div>

            {/* Tablet & Desktop View */}
            <div className="hidden md:block">
              {viewMode === 'table' ? (
                <LeadTable
                  leads={filteredLeads}
                  onEdit={handleOpenModal}
                  onDelete={handleDeleteLead}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onEdit={handleOpenModal}
                      onDelete={handleDeleteLead}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 md:p-4 transition-colors duration-200">
            <div className="bg-white dark:bg-slate-800 dark:bg-slate-800 w-full h-full md:h-auto md:max-w-lg md:rounded-xl shadow-xl border-0 md:border border-transparent dark:border-slate-700 transition-colors duration-200 flex flex-col overflow-hidden">
              <div className="flex justify-between items-center p-5 border-b border-slate-200 dark:border-slate-700 dark:border-slate-700">
                <h2 className="font-semibold text-lg text-slate-900 dark:text-white dark:text-white">
                  {selectedLead ? 'Edit Lead' : 'Add New Lead'}
                </h2>

                <button
                  onClick={handleCloseModal}
                  className="text-2xl text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:text-slate-500 dark:hover:text-slate-300 transition-colors duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
                >
                  ×
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <LeadForm
                  initialData={selectedLead}
                  onSubmit={handleSubmitLead}
                  onCancel={handleCloseModal}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}