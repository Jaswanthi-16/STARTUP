import React, { useState } from 'react';
import { Plus, LayoutGrid, List } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import LeadTable from '../components/leads/LeadTable';
import LeadCard from '../components/leads/LeadCard';
import LeadForm from '../components/leads/LeadForm';

/**
 * Leads page managing the state and display of all leads.
 * Includes modal for LeadForm.
 *
 * @returns {JSX.Element} The Leads page component
 */
export default function Leads() {
  const [leads, setLeads] = useState([
    {
      id: '1',
      name: 'Alice Smith',
      company: 'TechCorp',
      email: 'alice@techcorp.com',
      phone: '555-0101',
      status: 'New',
      source: 'Website',
      dateAdded: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Bob Jones',
      company: 'Global Ind.',
      email: 'bob@global.com',
      phone: '555-0102',
      status: 'Contacted',
      source: 'LinkedIn',
      dateAdded: new Date().toISOString()
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

  const handleOpenModal = (lead = null) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  const handleSubmitLead = (leadData) => {
    if (selectedLead) {
      // Update existing
      setLeads(leads.map(l => l.id === selectedLead.id ? { ...l, ...leadData } : l));
      toast.success('Lead updated successfully');
    } else {
      // Create new
      const newLead = {
        ...leadData,
        id: Math.random().toString(36).substr(2, 9),
        dateAdded: new Date().toISOString()
      };
      setLeads([newLead, ...leads]);
      toast.success('Lead created successfully');
    }
    handleCloseModal();
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(l => l.id !== id));
      toast.error('Lead deleted');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
            <p className="text-slate-500 mt-1">Manage your prospects and contacts.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md ${viewMode === 'table' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                aria-label="Table View"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                aria-label="Grid View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Lead
            </button>
          </div>
        </div>

        {/* Content */}
        {/* On mobile always stack, on desktop use selected viewMode */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-1 gap-4">
            {leads.map(lead => (
              <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDeleteLead} />
            ))}
          </div>
        </div>

        <div className="hidden sm:block">
          {viewMode === 'table' ? (
            <LeadTable leads={leads} onEdit={handleOpenModal} onDelete={handleDeleteLead} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {leads.map(lead => (
                <LeadCard key={lead.id} lead={lead} onEdit={handleOpenModal} onDelete={handleDeleteLead} />
              ))}
            </div>
          )}
        </div>

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div 
              className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h2 id="modal-title" className="text-lg font-semibold text-slate-900">
                  {selectedLead ? 'Edit Lead' : 'Add New Lead'}
                </h2>
                <button 
                  onClick={handleCloseModal}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label="Close"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </button>
              </div>
              <div className="p-6">
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
