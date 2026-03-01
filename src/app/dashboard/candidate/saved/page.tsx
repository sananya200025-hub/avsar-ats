'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SavedJob {
  id: string;
  title: string;
  location: string;
  workType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  experienceLevel: string;
  description: string;
  createdAt: Date;
  employerProfile: {
    companyName: string;
    industry: string;
  };
  savedAt: Date;
}

const mockSavedJobs: SavedJob[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    location: 'Dubai, UAE',
    workType: 'Hybrid',
    salaryMin: 150000,
    salaryMax: 200000,
    experienceLevel: 'Senior',
    description: 'We are looking for an experienced software engineer to join our team...',
    createdAt: new Date('2026-02-20'),
    employerProfile: {
      companyName: 'TechCorp UAE',
      industry: 'Technology',
    },
    savedAt: new Date('2026-02-22'),
  },
  {
    id: '2',
    title: 'Product Manager',
    location: 'Abu Dhabi, UAE',
    workType: 'On Site',
    salaryMin: 120000,
    salaryMax: 160000,
    experienceLevel: 'Mid-Level',
    description: 'Join our product team to lead innovative projects...',
    createdAt: new Date('2026-02-18'),
    employerProfile: {
      companyName: 'Innovation Hub',
      industry: 'Consulting',
    },
    savedAt: new Date('2026-02-19'),
  },
  {
    id: '3',
    title: 'UX Designer',
    location: 'Dubai, UAE',
    workType: 'Remote',
    salaryMin: 100000,
    salaryMax: 140000,
    experienceLevel: 'Mid-Level',
    description: 'Create beautiful and intuitive user experiences...',
    createdAt: new Date('2026-02-25'),
    employerProfile: {
      companyName: 'Creative Studio',
      industry: 'Design',
    },
    savedAt: new Date('2026-02-26'),
  },
];

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setSavedJobs(mockSavedJobs);
      setLoading(false);
    }, 500);
  }, []);

  const handleRemove = async (jobId: string) => {
    setRemovingId(jobId);
    await new Promise(resolve => setTimeout(resolve, 500));
    setSavedJobs(prev => prev.filter(j => j.id !== jobId));
    setRemovingId(null);
  };

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Not specified';
    if (min && max) return `AED ${min.toLocaleString()} - AED ${max.toLocaleString()}`;
    if (min) return `From AED ${min.toLocaleString()}`;
    return `Up to AED ${max?.toLocaleString()}`;
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">Saved Jobs</h1>
        <p className="text-surface-500">Jobs you have saved for later</p>
      </div>

      {/* Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-surface-500">
          {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : savedJobs.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-surface-100">
          <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-surface-900 mb-2">No saved jobs</h3>
          <p className="text-surface-500 mb-6">Save jobs you are interested in to view them here</p>
          <a href="/jobs" className="btn-primary">Browse Jobs</a>
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-surface-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-orange-400 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {job.employerProfile.companyName[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900 text-lg">{job.title}</h3>
                    <p className="text-surface-500">{job.employerProfile.companyName}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-surface-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.workType}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatSalary(job.salaryMin, job.salaryMax)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleRemove(job.id)}
                    disabled={removingId === job.id}
                    className={`p-2 rounded-lg transition-colors ${
                      removingId === job.id
                        ? 'bg-red-100 text-red-600'
                        : 'text-surface-400 hover:text-red-600 hover:bg-red-50'
                    }`}
                  >
                    {removingId === job.id ? (
                      <div className="w-5 h-5 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                  <span className="text-xs text-surface-400">
                    Saved {new Date(job.savedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Link href={`/jobs/${job.id}`} className="btn-primary flex-1 text-center">
                  View Details
                </Link>
                <button className="btn-secondary">
                  Apply Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
