import React, { useState, useEffect } from 'react';

const STATUS_OPTIONS = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
const SOURCE_OPTIONS = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

/**
 * LeadForm component for creating and editing leads.
 *
 * @param {Object} props - Component props
 * @param {Object} [props.initialData] - Initial data for editing an existing lead
 * @param {Function} props.onSubmit - Function called with form data on submission
 * @param {Function} props.onCancel - Function called to cancel the form
 * @returns {JSX.Element} The LeadForm component
 */
export default function LeadForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    status: 'New',
    source: 'Website',
    value: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        value: formData.value === '' ? 10000 : Number(formData.value)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200 dark:text-slate-300">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500/50 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:focus:border-blue-500 dark:focus:ring-blue-500'} px-3 py-2 text-sm dark:bg-slate-800 dark:text-white transition-colors duration-200`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-700 dark:text-slate-200 dark:text-slate-300">Company *</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${errors.company ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500/50 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:focus:border-blue-500 dark:focus:ring-blue-500'} px-3 py-2 text-sm dark:bg-slate-800 dark:text-white transition-colors duration-200`}
        />
        {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-200 dark:text-slate-300">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-500/50 dark:focus:border-red-400 dark:focus:ring-red-400' : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500 dark:border-slate-700 dark:focus:border-blue-500 dark:focus:ring-blue-500'} px-3 py-2 text-sm dark:bg-slate-800 dark:text-white transition-colors duration-200`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-200 dark:text-slate-300">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 dark:border-slate-700 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-colors duration-200"
        />
      </div>

      <div>
        <label htmlFor="value" className="block text-sm font-medium text-slate-700 dark:text-slate-200 dark:text-slate-300">Value (₹)</label>
        <input
          type="number"
          id="value"
          name="value"
          value={formData.value}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 dark:border-slate-700 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:bg-slate-800 dark:text-white transition-colors duration-200"
          min="0"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-slate-700 dark:text-slate-200 dark:text-slate-300">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 dark:border-slate-700 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 bg-white dark:bg-slate-800 dark:bg-slate-800 dark:text-white transition-colors duration-200"
          >
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="source" className="block text-sm font-medium text-slate-700 dark:text-slate-200 dark:text-slate-300">Source</label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-slate-300 dark:border-slate-600 dark:border-slate-700 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-500 dark:focus:ring-blue-500 bg-white dark:bg-slate-800 dark:bg-slate-800 dark:text-white transition-colors duration-200"
          >
            {SOURCE_OPTIONS.map(source => (
              <option key={source} value={source}>{source}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 dark:border-slate-800">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 dark:border-slate-600 dark:border-slate-700 bg-white dark:bg-slate-800 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors duration-200"
        >
          {initialData ? 'Update Lead' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
}
