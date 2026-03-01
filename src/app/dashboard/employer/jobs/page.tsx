'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Job {
  id: string;
  title: string;
  location: string;
  workType: string;
  status: string;
  isFeatured: boolean;
  createdAt: Date;
  _count: {
    applications: number;
  };
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    location: 'Dubai, UAE',
    workType: 'Hybrid',
    status: 'ACTIVE',
    isFeatured: true,
    createdAt: new Date('2026-02-15'),
    _count: { applications: 45 },
  },
  {
    id: '2',
    title: 'Product Manager',
    location: 'Abu Dhabi, UAE',
    workType: 'On Site',
    status: 'ACTIVE',
    isFeatured: false,
    createdAt: new Date('2026-02-20'),
    _count: { applications: 28 },
  },
  {
    id: '3',
    title: 'UX Designer',
    location: 'Dubai, UAE',
    workType: 'Remote',
    status: 'ACTIVE',
    isFeatured: true,
    createdAt: new Date('2026-02-25'),
    _count: { applications: 52 },
  },
  {
    id: '4',
    title: 'Data Analyst',
    location: 'Sharjah, UAE',
    workType: 'On Site',
    status: 'DRAFT',
    isFeatured: false,
    createdAt: new Date('2026-02-28'),
    _count: { applications: 0 },
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 500);
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    return job.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      case 'DRAFT': return 'bg-gray-100 text-gray-700';
      case 'CLOSED': return 'bg-red-100 text-red-700';
      default: return 'bg-surface-100 text-surface-600';
    }
  };

  const getWorkTypeIcon = (type: string) => {
    switch (type) {
      case 'Remote': return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
      case 'Hybrid': return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      );
      default: return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
    }
  };

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 mb-1">Jobs</h1>
          <p className="text-surface-500 text-sm">Manage your job postings</p>
        </div>
        <Link
          href="/dashboard/employer/jobs/new"
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Post New Job
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {['all', 'ACTIVE', 'DRAFT', 'CLOSED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-brand-500 text-white'
                : 'bg-white text-surface-600 hover:bg-surface-100 border border-surface-200'
            }`}
          >
            {status === 'all' ? 'All Jobs' : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-surface-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-surface-900">{job.title}</h3>
                    {job.isFeatured && (
                      <span className="px-2 py-0.5 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-surface-500">
                    <span className="flex items-center gap-1">
                      {getWorkTypeIcon(job.workType)}
                      {job.workType}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job._count.applications} applicants
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="p-2 text-surface-500 hover:text-brand-600 hover:bg-surface-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>
                  <button className="p-2 text-surface-500 hover:text-brand-600 hover:bg-surface-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-surface-100">
          <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-surface-900 mb-2">No jobs found</h3>
          <p className="text-surface-500 mb-6 text-sm">Try adjusting your filters or post a new job</p>
          <Link href="/dashboard/employer/jobs/new" className="btn-primary">
            Post a Job
          </Link>
        </div>
      )}
    </div>
  );
}
