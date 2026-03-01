import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const { role } = session.user;

  if (role === 'CANDIDATE') {
    redirect('/dashboard/candidate');
  } else if (role === 'EMPLOYER') {
    redirect('/dashboard/employer');
  }

  // Default - show role selection
  return (
    <div className="min-h-screen bg-surface-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-3xl font-bold text-surface-900 mb-8">
          Welcome, {session.user.name}
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/dashboard/candidate" className="card-premium p-6 hover-brand-300:border">
            <div className="text-4xl mb-4">👤</div>
            <h2 className="font-display text-xl font-semibold text-surface-900 mb-2">
              Candidate Portal
            </h2>
            <p className="text-surface-500">
              Browse jobs, track applications, and manage your profile
            </p>
          </Link>

          <Link href="/dashboard/employer" className="card-premium p-6 hover:border-brand-300">
            <div className="text-4xl mb-4">🏢</div>
            <h2 className="font-display text-xl font-semibold text-surface-900 mb-2">
              Employer Portal
            </h2>
            <p className="text-surface-500">
              Post jobs, manage candidates, and track your hiring pipeline
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
