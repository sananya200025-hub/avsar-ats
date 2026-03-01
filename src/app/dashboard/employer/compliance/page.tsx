'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ComplianceItem {
  id: string;
  candidateName: string;
  documentType: string;
  status: 'pending' | 'approved' | 'expired' | 'missing';
  expiryDate?: Date;
  uploadedAt?: Date;
}

const mockComplianceItems: ComplianceItem[] = [
  { id: '1', candidateName: 'Ahmed Al-Rashid', documentType: 'Emirates ID', status: 'approved', expiryDate: new Date('2027-06-15'), uploadedAt: new Date('2026-01-15') },
  { id: '2', candidateName: 'Ahmed Al-Rashid', documentType: 'Visa', status: 'approved', expiryDate: new Date('2027-06-15'), uploadedAt: new Date('2026-01-15') },
  { id: '3', candidateName: 'Fatima Hassan', documentType: 'Emirates ID', status: 'pending', uploadedAt: new Date('2026-02-20') },
  { id: '4', candidateName: 'Fatima Hassan', documentType: 'Labor Contract', status: 'missing' },
  { id: '5', candidateName: 'Omar Ahmed', documentType: 'Medical Certificate', status: 'expired', expiryDate: new Date('2026-01-10'), uploadedAt: new Date('2025-01-10') },
  { id: '6', candidateName: 'Sarah Johnson', documentType: 'Emirates ID', status: 'approved', expiryDate: new Date('2028-03-20'), uploadedAt: new Date('2026-01-20') },
];

export default function CompliancePage() {
  const [items, setItems] = useState<ComplianceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setItems(mockComplianceItems);
      setLoading(false);
    }, 500);
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const stats = {
    total: items.length,
    approved: items.filter(i => i.status === 'approved').length,
    pending: items.filter(i => i.status === 'pending').length,
    expired: items.filter(i => i.status === 'expired').length,
    missing: items.filter(i => i.status === 'missing').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'missing': return 'bg-gray-100 text-gray-700';
      default: return 'bg-surface-100 text-surface-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'expired':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'missing':
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        );
    }
  };

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">Compliance</h1>
        <p className="text-surface-500">Track candidate documents and compliance status</p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
      >
        {[
          { label: 'Total Documents', value: stats.total, color: 'bg-brand-100 text-brand-600' },
          { label: 'Approved', value: stats.approved, color: 'bg-green-100 text-green-600' },
          { label: 'Pending', value: stats.pending, color: 'bg-yellow-100 text-yellow-600' },
          { label: 'Expired', value: stats.expired, color: 'bg-red-100 text-red-600' },
          { label: 'Missing', value: stats.missing, color: 'bg-gray-100 text-gray-600' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-surface-100"
          >
            <div className={`text-2xl font-bold ${stat.color.split(' ')[1]}`}>{stat.value}</div>
            <div className="text-sm text-surface-500">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-2 mb-6"
      >
        {['all', 'approved', 'pending', 'expired', 'missing'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-brand-500 text-white'
                : 'bg-white text-surface-600 hover:bg-surface-100 border border-surface-200'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-surface-100 overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-surface-50 border-b border-surface-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Candidate</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Document Type</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Expiry Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filteredItems.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="hover:bg-surface-50"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-surface-900">{item.candidateName}</div>
                  </td>
                  <td className="px-6 py-4 text-surface-600">{item.documentType}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-surface-500">
                    {item.expiryDate ? item.expiryDate.toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4">
                    {item.status === 'missing' ? (
                      <button className="text-sm text-brand-600 font-medium hover:text-brand-700">
                        Request
                      </button>
                    ) : item.status === 'expired' ? (
                      <button className="text-sm text-red-600 font-medium hover:text-red-700">
                        Renew
                      </button>
                    ) : (
                      <button className="text-sm text-surface-500 hover:text-surface-700">
                        View
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Alert for expired/missing */}
      {(stats.expired > 0 || stats.missing > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 className="font-medium text-red-800">Attention Required</h4>
              <p className="text-sm text-red-600 mt-1">
                {stats.expired > 0 && `${stats.expired} document(s) have expired and need renewal. `}
                {stats.missing > 0 && `${stats.missing} document(s) are missing and need to be uploaded.`}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
