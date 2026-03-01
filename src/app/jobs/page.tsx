import Link from 'next/link';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getJobs() {
  const jobs = await prisma.job.findMany({
    where: { status: 'ACTIVE' },
    include: {
      employerProfile: {
        select: {
          companyName: true,
          companyLogoUrl: true,
          industry: true,
        },
      },
      _count: {
        select: { applications: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  return jobs;
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <header className="bg-surface-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-display text-xl font-bold text-surface-900">Avsar</span>
            </Link>
            <span className="text-surface-400">/</span>
            <span className="text-surface-600 font-medium">Jobs</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-surface-700 hover:text-brand-600 font-medium">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-surface-900 mb-2">
            Browse Jobs
          </h1>
          <p className="text-surface-500">
            Find your next opportunity in the UAE
          </p>
        </div>

        {/* Filters */}
        <div className="card-premium p-6 mb-8">
          <form className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Job title or keyword"
                className="input-premium"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">Location</label>
              <select className="input-premium">
                <option value="">All Locations</option>
                <option value="Dubai">Dubai</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">Work Type</label>
              <select className="input-premium">
                <option value="">All Types</option>
                <option value="ON_SITE">On Site</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">Experience</label>
              <select className="input-premium">
                <option value="">Any Experience</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
          </form>
        </div>

        {/* Jobs List */}
        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="card-premium p-6 hover:border-brand-300 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-display text-xl font-semibold text-surface-900">
                        {job.title}
                      </h2>
                      {job.isFeatured && (
                        <span className="px-2 py-1 bg-brand-100 text-brand-700 text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-surface-500 mb-4">
                      <span className="flex items-center gap-1">
                        🏢 {job.employerProfile.companyName}
                      </span>
                      <span className="flex items-center gap-1">
                        📍 {job.location || 'UAE'}
                      </span>
                      <span className="flex items-center gap-1">
                        💼 {job.workType}
                      </span>
                      <span className="flex items-center gap-1">
                        👥 {job._count.applications} applicants
                      </span>
                    </div>
                    <p className="text-surface-600 text-sm line-clamp-2">
                      {job.description.slice(0, 200)}...
                    </p>
                  </div>
                  <div className="ml-6">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="btn-secondary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 card-premium">
            <div className="text-5xl mb-4">💼</div>
            <h2 className="font-display text-xl font-semibold text-surface-900 mb-2">
              No jobs available yet
            </h2>
            <p className="text-surface-500 mb-6">
              Check back later for new opportunities
            </p>
            <Link href="/register?role=employer" className="btn-primary">
              Post a Job
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
