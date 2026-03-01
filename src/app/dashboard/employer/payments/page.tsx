'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Payment {
  id: string;
  type: string;
  amount: number;
  fee: number;
  total: number;
  currency: string;
  status: string;
  candidate?: { firstName: string; lastName: string };
  createdAt: Date;
  paidAt: Date | null;
  invoiceUrl: string | null;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    type: 'HIRE_FEE',
    amount: 60000,
    fee: 7200,
    total: 67200,
    currency: 'AED',
    status: 'COMPLETED',
    candidate: { firstName: 'Ahmed', lastName: 'Al-Rashid' },
    createdAt: new Date('2026-02-15'),
    paidAt: new Date('2026-02-16'),
    invoiceUrl: '#',
  },
  {
    id: '2',
    type: 'HIRE_FEE',
    amount: 48000,
    fee: 5760,
    total: 53760,
    currency: 'AED',
    status: 'PENDING',
    candidate: { firstName: 'Fatima', lastName: 'Hassan' },
    createdAt: new Date('2026-02-20'),
    paidAt: null,
    invoiceUrl: null,
  },
  {
    id: '3',
    type: 'UNLOCK_CONTACT',
    amount: 500,
    fee: 0,
    total: 500,
    currency: 'AED',
    status: 'COMPLETED',
    createdAt: new Date('2026-02-18'),
    paidAt: new Date('2026-02-18'),
    invoiceUrl: '#',
  },
];

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState({ totalPending: 0, totalPaid: 0, totalPayments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPayments(mockPayments);
      setStats({
        totalPending: 53760,
        totalPaid: 67760,
        totalPayments: 3,
      });
      setLoading(false);
    }, 500);
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-AE', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatAmount = (amount: number) => `AED ${amount.toLocaleString()}`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'PROCESSING': return 'bg-blue-100 text-blue-700';
      case 'FAILED': return 'bg-red-100 text-red-700';
      default: return 'bg-surface-100 text-surface-600';
    }
  };

  const getTypeIcon = (type: string) => {
    if (type === 'HIRE_FEE') {
      return (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">Payments</h1>
        <p className="text-surface-500">Manage your hiring fees and invoices</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-surface-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-surface-500">Pending Payments</div>
              <div className="text-2xl font-bold text-yellow-600">{formatAmount(stats.totalPending)}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-surface-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-surface-500">Total Paid</div>
              <div className="text-2xl font-bold text-green-600">{formatAmount(stats.totalPaid)}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-surface-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <div className="text-sm text-surface-500">Total Transactions</div>
              <div className="text-2xl font-bold text-brand-600">{stats.totalPayments}</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-surface-100 overflow-hidden">
        <div className="p-6 border-b border-surface-100">
          <h2 className="font-semibold text-surface-900">Payment History</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-surface-900 mb-2">No payments yet</h3>
            <p className="text-surface-500">Payments will appear here when you hire candidates</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-50 border-b border-surface-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Type</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Candidate</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Amount</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Fee (12%)</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Total</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <motion.tr
                    key={payment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-surface-100 hover:bg-surface-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-surface-500">{getTypeIcon(payment.type)}</span>
                        <span className="font-medium text-surface-900">
                          {payment.type === 'HIRE_FEE' ? 'Hiring Fee' : 'Candidate Unlock'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-surface-600">
                      {payment.candidate ? `${payment.candidate.firstName} ${payment.candidate.lastName}` : '-'}
                    </td>
                    <td className="px-6 py-4 font-medium text-surface-900">{formatAmount(payment.amount)}</td>
                    <td className="px-6 py-4 text-surface-600">{formatAmount(payment.fee)}</td>
                    <td className="px-6 py-4 font-bold text-brand-600">{formatAmount(payment.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-surface-500 text-sm">{formatDate(payment.createdAt)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
