import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getCandidateData(userId: string) {
  const candidate = await prisma.candidateProfile.findUnique({
    where: { userId },
    include: {
      applications: {
        include: {
          job: {
            include: {
              employerProfile: {
                select: {
                  companyName: true,
                },
              },
            },
          },
        },
        orderBy: { appliedAt: 'desc' },
        take: 5,
      },
    },
  });
  return candidate;
}

export default async function CandidateDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'CANDIDATE') {
    redirect('/login');
  }

  const candidate = await getCandidateData(session.user.id);

  const statusColors: Record<string, string> = {
    APPLIED: 'bg-blue-100 text-blue-700',
    SCREENING: 'bg-purple-100 text-purple-700',
    INTERVIEW: 'bg-orange-100 text-orange-700',
    OFFER: 'bg-green-100 text-green-700',
    HIRED: 'bg-brand-100 text-brand-700',
    REJECTED: 'bg-red-100 text-red-700',
  };

  return (
    <div>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-orange-600 rounded-2xl p-8 mb-6 text-white">
        <h2 className="font-display text-2xl font-bold mb-2">
          Welcome back, {candidate?.firstName || 'Candidate'}!
        </h2>
        <p className="text-white/80">Track your applications and discover new opportunities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-surface-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-surface-900">{candidate?.profileCompletion || 0}%</div>
          <div className="text-sm text-surface-500">Profile Complete</div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-surface-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-surface-900">{candidate?.applications?.length || 0}</div>
          <div className="text-sm text-surface-500">Applications</div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-surface-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-surface-900">
            {candidate?.applications?.filter((a: { status: string }) => a.status === 'INTERVIEW').length || 0}
          </div>
          <div className="text-sm text-surface-500">Interviews</div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-surface-100">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-surface-900">
            {candidate?.applications?.filter((a: { status: string }) => a.status === 'OFFER').length || 0}
          </div>
          <div className="text-sm text-surface-500">Offers</div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-surface-100">
        <div className="p-5 border-b border-surface-100 flex items-center justify-between">
          <h2 className="font-semibold text-surface-900">Recent Applications</h2>
          <a href="/dashboard/candidate/applications" className="text-brand-600 font-medium hover:text-brand-700 text-sm">
            View all
          </a>
        </div>

        {candidate?.applications && candidate.applications.length > 0 ? (
          <div className="divide-y divide-surface-100">
            {candidate.applications.map((app: any) => (
              <div key={app.id} className="p-5 flex items-center justify-between hover:bg-surface-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-400 to-orange-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {app.job.title[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-surface-900">{app.job.title}</h3>
                    <p className="text-sm text-surface-500">{app.job.employerProfile?.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || 'bg-surface-100 text-surface-600'}`}>
                    {app.status}
                  </span>
                  <span className="text-sm text-surface-400">
                    {new Date(app.appliedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-semibold text-surface-900 mb-2">No applications yet</h3>
            <p className="text-surface-500 mb-6">Start applying to jobs to see them here</p>
            <a href="/jobs" className="btn-primary">Browse Jobs</a>
          </div>
        )}
      </div>
    </div>
  );
}
