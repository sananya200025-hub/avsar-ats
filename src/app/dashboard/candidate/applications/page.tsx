'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Application {
  id: string;
  status: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';
  appliedAt: Date;
  coverLetter?: string;
  job: {
    id: string;
    title: string;
    location: string;
    workType: string;
    salaryMin: number | null;
    salaryMax: number | null;
    employerProfile: {
      companyName: string;
      companyLogoUrl: string | null;
      industry: string;
    };
  };
}

const statusSteps = [
  { id: 'APPLIED', label: 'Applied', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-blue-500' },
  { id: 'SCREENING', label: 'Screening', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', color: 'bg-purple-500' },
  { id: 'INTERVIEW', label: 'Interview', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-orange-500' },
  { id: 'OFFER', label: 'Offer', icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', color: 'bg-green-500' },
  { id: 'HIRED', label: 'Hired', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', color: 'bg-brand-500' },
];

const mockApplications: Application[] = [
  {
    id: '1',
    status: 'INTERVIEW',
    appliedAt: new Date('2026-02-15'),
    coverLetter: 'I am excited to apply for this position...',
    job: {
      id: 'j1',
      title: 'Senior Software Engineer',
      location: 'Dubai, UAE',
      workType: 'Hybrid',
      salaryMin: 150000,
      salaryMax: 200000,
      employerProfile: {
        companyName: 'TechCorp UAE',
        companyLogoUrl: null,
        industry: 'Technology',
      },
    },
  },
  {
    id: '2',
    status: 'SCREENING',
    appliedAt: new Date('2026-02-20'),
    job: {
      id: 'j2',
      title: 'Product Manager',
      location: 'Abu Dhabi, UAE',
      workType: 'On Site',
      salaryMin: 120000,
      salaryMax: 160000,
      employerProfile: {
        companyName: 'Innovation Hub',
        companyLogoUrl: null,
        industry: 'Consulting',
      },
    },
  },
  {
    id: '3',
    status: 'APPLIED',
    appliedAt: new Date('2026-02-25'),
    job: {
      id: 'j3',
      title: 'UX Designer',
      location: 'Dubai, UAE',
      workType: 'Remote',
      salaryMin: 100000,
      salaryMax: 140000,
      employerProfile: {
        companyName: 'Creative Studio',
        companyLogoUrl: null,
        industry: 'Design',
      },
    },
  },
  {
    id: '4',
    status: 'OFFER',
    appliedAt: new Date('2026-02-10'),
    job: {
      id: 'j4',
      title: 'Data Analyst',
      location: 'Sharjah, UAE',
      workType: 'Hybrid',
      salaryMin: 80000,
      salaryMax: 120000,
      employerProfile: {
        companyName: 'DataDriven Inc',
        companyLogoUrl: null,
        industry: 'Analytics',
      },
    },
  },
  {
    id: '5',
    status: 'REJECTED',
    appliedAt: new Date('2026-02-01'),
    job: {
      id: 'j5',
      title: 'Backend Developer',
      location: 'Dubai, UAE',
      workType: 'On Site',
      salaryMin: 100000,
      salaryMax: 150000,
      employerProfile: {
        companyName: 'StartupXYZ',
        companyLogoUrl: null,
        industry: 'Technology',
      },
    },
  },
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setApplications(mockApplications);
      setLoading(false);
    }, 500);
  }, []);

  const filteredApps = applications.filter(app => {
    if (filter === 'all') return true;
    if (filter === 'active') return !['HIRED', 'REJECTED'].includes(app.status);
    return app.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPLIED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'SCREENING': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'INTERVIEW': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'OFFER': return 'bg-green-100 text-green-700 border-green-200';
      case 'HIRED': return 'bg-brand-100 text-brand-700 border-brand-200';
      case 'REJECTED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-surface-100 text-surface-600 border-surface-200';
    }
  };

  const getCurrentStepIndex = (status: string) => {
    return statusSteps.findIndex(s => s.id === status);
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
        <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">My Applications</h1>
        <p className="text-surface-500">Track the status of all your job applications</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'active', 'APPLIED', 'SCREENING', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-brand-500 text-white'
                : 'bg-white text-surface-600 hover:bg-surface-100 border border-surface-200'
            }`}
          >
            {status === 'all' ? 'All' : status === 'active' ? 'Active' : status.charAt(0) + status.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Applications Count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-surface-500">
          Showing {filteredApps.length} of {applications.length} applications
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-surface-100">
          <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-semibold text-surface-900 mb-2">No applications found</h3>
          <p className="text-surface-500 mb-6">Try adjusting your filters or apply to more jobs</p>
          <a href="/jobs" className="btn-primary">Browse Jobs</a>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-surface-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedApp(app)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-orange-400 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {app.job.employerProfile.companyName[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900 text-lg">{app.job.title}</h3>
                    <p className="text-surface-500">{app.job.employerProfile.companyName}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-surface-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {app.job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {app.job.workType}
                      </span>
                      <span>{formatSalary(app.job.salaryMin, app.job.salaryMax)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                  <p className="text-xs text-surface-400 mt-2">
                    Applied {new Date(app.appliedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              {app.status !== 'REJECTED' && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    {statusSteps.slice(0, -1).map((step, i) => (
                      <div key={step.id} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          i <= getCurrentStepIndex(app.status) ? step.color : 'bg-surface-100'
                        }`}>
                          <svg className={`w-4 h-4 ${i <= getCurrentStepIndex(app.status) ? 'text-white' : 'text-surface-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                          </svg>
                        </div>
                        {i < statusSteps.length - 2 && (
                          <div className={`w-16 h-0.5 ${
                            i < getCurrentStepIndex(app.status) ? step.color : 'bg-surface-100'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-surface-400">
                    <span>Applied</span>
                    <span>Screening</span>
                    <span>Interview</span>
                    <span>Offer</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedApp(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-orange-400 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    {selectedApp.job.employerProfile.companyName[0]}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-surface-900">{selectedApp.job.title}</h2>
                    <p className="text-surface-500">{selectedApp.job.employerProfile.companyName}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-surface-100 rounded-lg">
                  <svg className="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-50 rounded-lg">
                    <div className="text-sm text-surface-500 mb-1">Location</div>
                    <div className="font-medium text-surface-900">{selectedApp.job.location}</div>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-lg">
                    <div className="text-sm text-surface-500 mb-1">Work Type</div>
                    <div className="font-medium text-surface-900">{selectedApp.job.workType}</div>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-lg">
                    <div className="text-sm text-surface-500 mb-1">Salary Range</div>
                    <div className="font-medium text-surface-900">{formatSalary(selectedApp.job.salaryMin, selectedApp.job.salaryMax)}</div>
                  </div>
                  <div className="p-4 bg-surface-50 rounded-lg">
                    <div className="text-sm text-surface-500 mb-1">Industry</div>
                    <div className="font-medium text-surface-900">{selectedApp.job.employerProfile.industry}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-surface-900">Application Status</h3>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(selectedApp.status)}`}>
                    {selectedApp.status}
                  </span>
                </div>
                {selectedApp.status === 'INTERVIEW' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-orange-700 font-medium mb-1">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Interview Scheduled
                    </div>
                    <p className="text-sm text-orange-600">Check your email for interview details and timing.</p>
                  </div>
                )}
                {selectedApp.status === 'OFFER' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-700 font-medium mb-1">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Offer Received!
                    </div>
                    <p className="text-sm text-green-600">Congratulations! Review and accept your offer.</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <a href={`/jobs/${selectedApp.job.id}`} className="flex-1 btn-secondary text-center">
                  View Job
                </a>
                {selectedApp.status !== 'REJECTED' && selectedApp.status !== 'HIRED' && (
                  <button className="flex-1 btn-primary">
                    Follow Up
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
