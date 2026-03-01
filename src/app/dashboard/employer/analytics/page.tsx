'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const mockAnalytics = {
  overview: {
    totalApplications: 1248,
    totalHires: 48,
    avgTimeToHire: 12,
    costPerHire: 4200,
  },
  monthlyApplications: [
    { month: 'Sep', count: 180 },
    { month: 'Oct', count: 220 },
    { month: 'Nov', count: 195 },
    { month: 'Dec', count: 150 },
    { month: 'Jan', count: 240 },
    { month: 'Feb', count: 263 },
  ],
  sourceBreakdown: [
    { source: 'Direct', percentage: 35, color: 'bg-brand-500' },
    { source: 'LinkedIn', percentage: 28, color: 'bg-blue-500' },
    { source: 'Indeed', percentage: 18, color: 'bg-green-500' },
    { source: 'Referral', percentage: 12, color: 'bg-purple-500' },
    { source: 'Other', percentage: 7, color: 'bg-orange-500' },
  ],
  topJobs: [
    { title: 'Senior Software Engineer', applications: 245, hires: 12 },
    { title: 'Product Manager', applications: 189, hires: 8 },
    { title: 'UX Designer', applications: 156, hires: 6 },
    { title: 'Data Analyst', applications: 134, hires: 5 },
  ],
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">Analytics</h1>
        <p className="text-surface-500">Track your hiring performance and metrics</p>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Total Applications', value: mockAnalytics.overview.totalApplications.toLocaleString(), trend: '+18%', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color: 'bg-brand-100 text-brand-600' },
          { label: 'Total Hires', value: mockAnalytics.overview.totalHires, trend: '+12%', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-100 text-green-600' },
          { label: 'Avg. Time to Hire', value: `${mockAnalytics.overview.avgTimeToHire} days`, trend: '-3 days', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-blue-100 text-blue-600' },
          { label: 'Cost per Hire', value: `AED ${mockAnalytics.overview.costPerHire.toLocaleString()}`, trend: '-8%', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-purple-100 text-purple-600' },
        ].map((stat, i) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-surface-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <div className="text-2xl font-bold text-surface-900">{stat.value}</div>
            <div className="text-sm text-surface-500">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Applications Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-surface-100"
        >
          <h3 className="font-semibold text-surface-900 mb-6">Monthly Applications</h3>
          <div className="flex items-end justify-between gap-2 h-48">
            {mockAnalytics.monthlyApplications.map((item, i) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(item.count / 300) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-brand-500 to-orange-500 rounded-t-lg"
                />
                <span className="text-xs text-surface-500">{item.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Source Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-surface-100"
        >
          <h3 className="font-semibold text-surface-900 mb-6">Application Sources</h3>
          <div className="space-y-4">
            {mockAnalytics.sourceBreakdown.map((source, i) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-surface-700">{source.source}</span>
                  <span className="text-sm font-medium text-surface-900">{source.percentage}%</span>
                </div>
                <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.percentage}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className={`h-full ${source.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-surface-100 lg:col-span-2"
        >
          <h3 className="font-semibold text-surface-900 mb-6">Top Performing Jobs</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left pb-4 text-sm font-medium text-surface-500">Job Title</th>
                <th className="text-right pb-4 text-sm font-medium text-surface-500">Applications</th>
                <th className="text-right pb-4 text-sm font-medium text-surface-500">Hires</th>
                <th className="text-right pb-4 text-sm font-medium text-surface-500">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {mockAnalytics.topJobs.map((job, i) => (
                <motion.tr
                  key={job.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <td className="py-4 font-medium text-surface-900">{job.title}</td>
                  <td className="py-4 text-right text-surface-600">{job.applications}</td>
                  <td className="py-4 text-right text-surface-600">{job.hires}</td>
                  <td className="py-4 text-right">
                    <span className="text-green-600 font-medium">
                      {((job.hires / job.applications) * 100).toFixed(1)}%
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}
