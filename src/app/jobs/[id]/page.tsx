'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  location: string;
  workType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  experienceLevel: string;
  skills: string[];
  status: string;
  isFeatured: boolean;
  createdAt: Date;
  employerProfile: {
    companyName: string;
    companyLogoUrl: string | null;
    industry: string;
    companySize: string;
    companyDescription: string | null;
    website: string | null;
    location: string;
  };
  _count: {
    applications: number;
  };
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const resolvedParams = await params;
        const response = await fetch(`/api/jobs/${resolvedParams.id}`);
        const data = await response.json();
        if (data.success) {
          setJob(data.data);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [params]);

  const handleApply = async () => {
    setApplying(true);
    // Simulate application
    await new Promise(resolve => setTimeout(resolve, 1500));
    setApplying(false);
    setShowApplyModal(false);
    alert('Application submitted successfully!');
  };

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Not specified';
    if (min && max) return `AED ${min.toLocaleString()} - AED ${max.toLocaleString()}`;
    if (min) return `From AED ${min.toLocaleString()}`;
    return `Up to AED ${max?.toLocaleString()}`;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="bg-surface-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-display text-xl font-bold text-surface-900">Avsar</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-surface-600 hover:text-brand-600 font-medium">Home</Link>
            <Link href="/jobs" className="text-surface-600 hover:text-brand-600 font-medium">Jobs</Link>
            <Link href="/about" className="text-surface-600 hover:text-brand-600 font-medium">About</Link>
            <Link href="/process" className="text-surface-600 hover:text-brand-600 font-medium">Process</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-surface-700 hover:text-brand-600 font-medium">Sign In</Link>
            <Link href="/register" className="px-4 py-2 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : job ? (
        <>
          {/* Job Header */}
          <div className="bg-gradient-to-br from-brand-600 to-orange-600 text-white py-16">
            <div className="max-w-7xl mx-auto px-6">
              <Link href="/jobs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Jobs
              </Link>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="font-display text-3xl md:text-4xl font-bold">{job.title}</h1>
                    {job.isFeatured && (
                      <span className="px-3 py-1 bg-white/20 text-white text-sm font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-white/80">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {job.employerProfile.companyName}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location || 'UAE'}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {job.workType}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>

          {/* Job Content */}
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Job Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="font-display text-xl font-bold text-surface-900 mb-4">Job Description</h2>
                  <div className="prose prose-surface max-w-none">
                    <p className="text-surface-600 whitespace-pre-line">{job.description}</p>
                  </div>
                </motion.div>

                {/* Requirements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="font-display text-xl font-bold text-surface-900 mb-4">Requirements</h2>
                  <div className="prose prose-surface max-w-none">
                    <p className="text-surface-600 whitespace-pre-line">{job.requirements || 'No specific requirements listed.'}</p>
                  </div>
                </motion.div>

                {/* Responsibilities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="font-display text-xl font-bold text-surface-900 mb-4">Responsibilities</h2>
                  <div className="prose prose-surface max-w-none">
                    <p className="text-surface-600 whitespace-pre-line">{job.responsibilities || 'No specific responsibilities listed.'}</p>
                  </div>
                </motion.div>

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-8 shadow-lg"
                  >
                    <h2 className="font-display text-xl font-bold text-surface-900 mb-4">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Job Overview */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="font-display text-lg font-bold text-surface-900 mb-4">Job Overview</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-surface-500">Salary</span>
                      <span className="font-semibold text-surface-900">{formatSalary(job.salaryMin, job.salaryMax)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-surface-500">Experience</span>
                      <span className="font-semibold text-surface-900">{job.experienceLevel || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-surface-500">Work Type</span>
                      <span className="font-semibold text-surface-900">{job.workType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-surface-500">Location</span>
                      <span className="font-semibold text-surface-900">{job.location || 'UAE'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-surface-500">Applicants</span>
                      <span className="font-semibold text-surface-900">{job._count.applications}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Company Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="font-display text-lg font-bold text-surface-900 mb-4">About {job.employerProfile.companyName}</h3>
                  <div className="space-y-4">
                    <p className="text-surface-600 text-sm">
                      {job.employerProfile.companyDescription || `${job.employerProfile.companyName} is a leading company in the ${job.employerProfile.industry} industry.`}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-500">Industry</span>
                      <span className="font-medium text-surface-900">{job.employerProfile.industry}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-500">Company Size</span>
                      <span className="font-medium text-surface-900">{job.employerProfile.companySize || 'N/A'}</span>
                    </div>
                    {job.employerProfile.website && (
                      <a
                        href={job.employerProfile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 text-sm font-medium"
                      >
                        Visit Website
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.div>

                {/* Share */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <h3 className="font-display text-lg font-bold text-surface-900 mb-4">Share this Job</h3>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 bg-surface-100 text-surface-600 rounded-lg hover:bg-surface-200 transition-colors text-sm font-medium">
                      Copy Link
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-surface-900 mb-4">Job Not Found</h1>
          <p className="text-surface-500 mb-6">The job you are looking for does not exist.</p>
          <Link href="/jobs" className="btn-primary">Browse Jobs</Link>
        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowApplyModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display text-xl font-bold text-surface-900 mb-2">Apply for {job?.title}</h3>
            <p className="text-surface-500 mb-6">Submit your application to {job?.employerProfile.companyName}</p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Full Name</label>
                <input type="text" className="input-premium" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Email</label>
                <input type="email" className="input-premium" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Phone</label>
                <input type="tel" className="input-premium" placeholder="+971 50 123 4567" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Cover Letter</label>
                <textarea className="input-premium" rows={4} placeholder="Tell us why you're a great fit..."></textarea>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 py-3 border border-surface-200 rounded-xl font-medium hover:bg-surface-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={applying}
                className="flex-1 py-3 bg-brand-500 text-white rounded-xl font-medium hover:bg-brand-600 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {applying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-surface-900 text-surface-400 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-display text-xl font-bold text-surface-200">Avsar</span>
            </div>
            <div className="text-sm">
              © 2026 Avsar ATS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
