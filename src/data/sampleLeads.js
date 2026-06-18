/**
 * Sample leads data to pre-populate the CRM if localStorage is empty.
 * @type {Array<import('../context/LeadContext').Lead>}
 */
export const sampleLeads = [
  {
    id: 'lead-1',
    name: 'Rahul Sharma',
    company: 'TechCorp India',
    email: 'rahul.sharma@techcorp.in',
    phone: '+91 98765 43210',
    status: 'New',
    source: 'Website',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Priya Patel',
    company: 'Innovate Solutions',
    email: 'priya.p@innovatesolutions.com',
    phone: '+91 91234 56789',
    status: 'New',
    source: 'LinkedIn',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'lead-3',
    name: 'Amit Kumar',
    company: 'Global Enterprises',
    email: 'akumar@globalent.in',
    phone: '+91 99887 76655',
    status: 'Contacted',
    source: 'Referral',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'lead-4',
    name: 'Sneha Reddy',
    company: 'NextGen Systems',
    email: 'sneha.reddy@nextgensys.io',
    phone: '+91 98712 34567',
    status: 'Meeting Scheduled',
    source: 'Email Campaign',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: 'lead-5',
    name: 'Vikram Singh',
    company: 'Apex Technologies',
    email: 'vsingh@apextech.co.in',
    phone: '+91 90123 45678',
    status: 'Won',
    source: 'Cold Call',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: 'lead-6',
    name: 'Neha Gupta',
    company: 'Creative Designs',
    email: 'neha@creativedesigns.in',
    phone: '+91 96543 21098',
    status: 'Lost',
    source: 'Other',
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  }
];
