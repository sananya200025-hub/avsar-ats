import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getEmployerData(userId: string) {
  const employer = await prisma.employerProfile.findUnique({
    where: { userId },
    include: {
      jobs: {
        where: { status: 'ACTIVE' },
        include: {
          applications: true,
        },
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  });
  return employer;
}

export default async function EmployerDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'EMPLOYER') {
    redirect('/login');
  }

  const employer = await getEmployerData(session.user.id);

  const totalApplications = employer?.jobs.reduce((sum: number, job: any) => sum + job.applications.length, 0) || 0;
  const interviews = employer?.jobs.reduce(
    (sum: number, job: any) => sum + job.applications.filter((a: any) => a.status === 'INTERVIEW').length,
    0
  ) || 0;
  const hires = employer?.jobs.reduce(
    (sum: number, job: any) => sum + job.applications.filter((a: any) => a.status === 'HIRED').length,
    0
  ) || 0;

  return (
    <div>
      {/* Active Jobs */}
      <div className="bg-white rounded-xl shadow-sm border border-surface-100">
        <div className="p-5 border-b border-surface-100 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-surface-900">
            Active Jobs
          </h2>
          <a href="/dashboard/employer/jobs" className="text-brand-600 font-medium hover:text-brand-700 text-sm">
            View all
          </a>
        </div>

        {employer?.jobs && employer.jobs.length > 0 ? (
          <div className="divide-y divide-surface-100">
            {employer.jobs.map((job: any) => (
              <div key={job.id} className="p-5 hover:bg-surface-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-surface-900">{job.title}</h3>
                      {job.isFeatured && (
                        <span className="px-2 py-0.5 bg-brand-100 text-brand-700 text-xs font-medium rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-surface-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location || 'UAE'}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.applications.length} applicants
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {job.applications.filter((a: any) => a.status === 'APPLIED').length} Applied
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                      {job.applications.filter((a: any) => a.status === 'INTERVIEW').length} Interview
                    </span>
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      {job.applications.filter((a: any) => a.status === 'HIRED').length} Hired
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-surface-900 mb-2">No active jobs</h3>
            <p className="text-surface-500 mb-6 text-sm">Post your first job to start receiving applications</p>
            <a href="/dashboard/employer/jobs/new" className="btn-primary">
              Post a Job
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
