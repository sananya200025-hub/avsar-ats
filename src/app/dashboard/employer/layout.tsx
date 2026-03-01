'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard/employer',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'Jobs',
    href: '/dashboard/employer/jobs',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Pipeline',
    href: '/dashboard/employer/pipeline',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    name: 'CV Pool',
    href: '/dashboard/employer/cv-pool',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'Team',
    href: '/dashboard/employer/team',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    name: 'Analytics',
    href: '/dashboard/employer/analytics',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: 'Compliance',
    href: '/dashboard/employer/compliance',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: 'Payments',
    href: '/dashboard/employer/payments',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
];

const mockStats = {
  activeJobs: 12,
  totalApplications: 248,
  interviewsScheduled: 18,
  hiresThisMonth: 5,
  avgTimeToHire: '8 days',
  costPerHire: 'AED 4,200',
  responseRate: '87%',
  candidateQuality: '4.2/5',
};

const mockRecentActivity = [
  { type: 'application', message: 'New application for Senior Developer', time: '2 min ago', avatar: 'S', status: 'unread' },
  { type: 'interview', message: 'Interview scheduled with Ahmed Al-Rashid', time: '15 min ago', avatar: 'A', status: 'unread' },
  { type: 'hired', message: 'Offer accepted by Fatima Hassan', time: '1 hour ago', avatar: 'F', status: 'read' },
  { type: 'application', message: 'New application for UX Designer', time: '2 hours ago', avatar: 'M', status: 'read' },
  { type: 'screening', message: 'Candidate passed initial screening', time: '3 hours ago', avatar: 'K', status: 'read' },
];

const mockUpcomingInterviews = [
  { candidate: 'Sarah Johnson', position: 'Senior Developer', time: 'Today, 2:00 PM', avatar: 'S', type: 'Technical' },
  { candidate: 'Omar Ahmed', position: 'Product Manager', time: 'Today, 4:30 PM', avatar: 'O', type: 'HR' },
  { candidate: 'Layla Mohammed', position: 'UX Designer', time: 'Tomorrow, 11:00 AM', avatar: 'L', type: 'Portfolio' },
];

export default function EmployerDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-white border-r border-surface-200 fixed h-full z-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full flex flex-col"
        >
          <div className="p-6 border-b border-surface-200">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 bg-gradient-to-br from-brand-500 to-orange-500 rounded-xl flex items-center justify-center"
              >
                <span className="text-white font-bold text-xl">A</span>
              </motion.div>
              <span className="font-display text-2xl font-bold text-surface-900">Avsar</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarLinks.map((link, index) => {
              const isActive = pathname === link.href || (link.href !== '/dashboard/employer' && pathname.startsWith(link.href));
              return (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-600 font-medium'
                        : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                    }`}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-surface-200">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-brand-500 to-orange-500 rounded-xl p-4 text-white"
            >
              <div className="text-sm font-medium mb-1">Need Help?</div>
              <div className="text-xs opacity-80 mb-3">Check our hiring guides</div>
              <Link href="/contact" className="block text-center text-sm font-medium bg-white/20 rounded-lg py-2 hover:bg-white/30 transition-colors">
                Contact Support
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-surface-white border-b border-surface-200 sticky top-0 z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="px-8 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <h1 className="font-display text-xl font-semibold text-surface-900">Employer Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-surface-100 rounded-lg relative"
                >
                  <svg className="w-5 h-5 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full"
                  />
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-surface-200 overflow-hidden"
                    >
                      <div className="p-4 border-b border-surface-200">
                        <h3 className="font-semibold text-surface-900">Notifications</h3>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {mockRecentActivity.map((activity, i) => (
                          <div key={i} className={`p-4 border-b border-surface-100 hover:bg-surface-50 transition-colors ${activity.status === 'unread' ? 'bg-brand-50/50' : ''}`}>
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-sm font-medium text-brand-600">
                                {activity.avatar}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm text-surface-700">{activity.message}</p>
                                <p className="text-xs text-surface-400 mt-1">{activity.time}</p>
                              </div>
                              {activity.status === 'unread' && (
                                <div className="w-2 h-2 bg-brand-500 rounded-full" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-surface-200">
                        <button className="w-full text-center text-sm text-brand-600 font-medium hover:text-brand-700">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-surface-900">TechCorp UAE</div>
                  <div className="text-xs text-surface-500">Premium Plan</div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-10 h-10 bg-gradient-to-br from-brand-500 to-orange-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-white font-semibold">T</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-brand-600 to-orange-600 rounded-2xl p-8 mb-8 text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-2xl font-bold mb-2"
                >
                  Welcome back, TechCorp UAE!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/80"
                >
                  You have 5 new applications today. Keep up the great hiring!
                </motion.p>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <Link
                  href="/dashboard/employer/jobs/new"
                  className="px-6 py-3 bg-white text-brand-600 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
                >
                  + Post New Job
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Active Jobs', value: mockStats.activeJobs, icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'bg-brand-100 text-brand-600', trend: '+2' },
              { label: 'Applications', value: mockStats.totalApplications, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color: 'bg-blue-100 text-blue-600', trend: '+18' },
              { label: 'Interviews', value: mockStats.interviewsScheduled, icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'bg-purple-100 text-purple-600', trend: '+3' },
              { label: 'Hires', value: mockStats.hiresThisMonth, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-green-100 text-green-600', trend: '+3' },
              { label: 'Avg Time to Hire', value: mockStats.avgTimeToHire, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-orange-100 text-orange-600', trend: '-2 days' },
              { label: 'Cost per Hire', value: mockStats.costPerHire, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-red-100 text-red-600', trend: '-15%' },
              { label: 'Response Rate', value: mockStats.responseRate, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'bg-cyan-100 text-cyan-600', trend: '+5%' },
              { label: 'Quality Score', value: mockStats.candidateQuality, icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'bg-yellow-100 text-yellow-600', trend: '+0.3' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl p-5 shadow-sm border border-surface-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                    </svg>
                  </div>
                  <span className="text-xs font-medium bg-green-50 text-green-600 px-2 py-1 rounded-full">{stat.trend}</span>
                </div>
                <div className="text-2xl font-bold text-surface-900">{stat.value}</div>
                <div className="text-sm text-surface-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm border border-surface-100"
            >
              <div className="p-5 border-b border-surface-100">
                <h3 className="font-semibold text-surface-900">Recent Activity</h3>
              </div>
              <div className="p-5 space-y-4">
                {mockRecentActivity.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${activity.status === 'unread' ? 'bg-brand-100 text-brand-600' : 'bg-surface-100 text-surface-600'}`}>
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-surface-700 truncate">{activity.message}</p>
                      <p className="text-xs text-surface-400">{activity.time}</p>
                    </div>
                    {activity.status === 'unread' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-brand-500 rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="p-5 border-t border-surface-100">
                <button className="text-sm text-brand-600 font-medium hover:text-brand-700">
                  View all activity
                </button>
              </div>
            </motion.div>

            {/* Upcoming Interviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="bg-white rounded-xl shadow-sm border border-surface-100"
            >
              <div className="p-5 border-b border-surface-100 flex items-center justify-between">
                <h3 className="font-semibold text-surface-900">Upcoming Interviews</h3>
                <span className="text-xs bg-brand-50 text-brand-600 px-2 py-1 rounded-full">3 today</span>
              </div>
              <div className="p-5 space-y-4">
                {mockUpcomingInterviews.map((interview, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-surface-50 rounded-lg"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-gradient-to-br from-brand-500 to-orange-500 rounded-full flex items-center justify-center text-white font-medium"
                    >
                      {interview.avatar}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-surface-900">{interview.candidate}</p>
                      <p className="text-xs text-surface-500">{interview.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-surface-500">{interview.time}</p>
                      <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">{interview.type}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-5 border-t border-surface-100">
                <Link href="/dashboard/employer/pipeline" className="text-sm text-brand-600 font-medium hover:text-brand-700">
                  View pipeline
                </Link>
              </div>
            </motion.div>

            {/* Hiring Funnel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-surface-100"
            >
              <div className="p-5 border-b border-surface-100">
                <h3 className="font-semibold text-surface-900">Hiring Funnel</h3>
              </div>
              <div className="p-5">
                {[
                  { stage: 'Applied', count: 248, percentage: 100, color: 'bg-blue-500' },
                  { stage: 'Screening', count: 124, percentage: 50, color: 'bg-purple-500' },
                  { stage: 'Interview', count: 45, percentage: 18, color: 'bg-orange-500' },
                  { stage: 'Offer', count: 12, percentage: 5, color: 'bg-green-500' },
                  { stage: 'Hired', count: 5, percentage: 2, color: 'bg-brand-500' },
                ].map((stage, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-surface-700">{stage.stage}</span>
                      <span className="text-sm font-medium text-surface-900">{stage.count}</span>
                    </div>
                    <div className="h-2 bg-surface-100 rounded-full overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.percentage}%` }}
                        transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
                        className={`h-full ${stage.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
