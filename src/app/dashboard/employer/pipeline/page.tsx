'use client';

import { useState, useEffect } from 'react';

type ApplicationStatus = 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';

interface Application {
  id: string;
  status: ApplicationStatus;
  appliedAt: Date;
  coverLetter?: string;
  matchScore?: number;
  candidateProfile: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    location?: string;
    yearsOfExperience?: number;
    extractedSkills: string[];
    cvUrl?: string;
  };
  job: {
    id: string;
    title: string;
  };
}

const columns: { id: ApplicationStatus; title: string; color: string }[] = [
  { id: 'APPLIED', title: 'Applied', color: 'bg-blue-500' },
  { id: 'SCREENING', title: 'Screening', color: 'bg-purple-500' },
  { id: 'INTERVIEW', title: 'Interview', color: 'bg-orange-500' },
  { id: 'OFFER', title: 'Offer', color: 'bg-green-500' },
  { id: 'HIRED', title: 'Hired', color: 'bg-brand-500' },
];

const mockApplications: Application[] = [
  {
    id: '1',
    status: 'APPLIED',
    appliedAt: new Date('2026-02-28'),
    matchScore: 85,
    candidateProfile: {
      id: 'c1',
      firstName: 'Ahmed',
      lastName: 'Al-Rashid',
      email: 'ahmed@example.com',
      location: 'Dubai, UAE',
      yearsOfExperience: 5,
      extractedSkills: ['React', 'Node.js', 'TypeScript'],
    },
    job: { id: 'j1', title: 'Senior Software Engineer' },
  },
  {
    id: '2',
    status: 'SCREENING',
    appliedAt: new Date('2026-02-27'),
    matchScore: 72,
    candidateProfile: {
      id: 'c2',
      firstName: 'Fatima',
      lastName: 'Hassan',
      email: 'fatima@example.com',
      location: 'Abu Dhabi, UAE',
      yearsOfExperience: 3,
      extractedSkills: ['Python', 'Machine Learning', 'Data Analysis'],
    },
    job: { id: 'j1', title: 'Senior Software Engineer' },
  },
  {
    id: '3',
    status: 'INTERVIEW',
    appliedAt: new Date('2026-02-25'),
    matchScore: 90,
    candidateProfile: {
      id: 'c3',
      firstName: 'Omar',
      lastName: 'Ahmed',
      email: 'omar@example.com',
      location: 'Dubai, UAE',
      yearsOfExperience: 7,
      extractedSkills: ['Java', 'Spring', 'AWS'],
    },
    job: { id: 'j1', title: 'Senior Software Engineer' },
  },
  {
    id: '4',
    status: 'OFFER',
    appliedAt: new Date('2026-02-20'),
    matchScore: 95,
    candidateProfile: {
      id: 'c4',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@example.com',
      location: 'Sharjah, UAE',
      yearsOfExperience: 6,
      extractedSkills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    },
    job: { id: 'j1', title: 'Senior Software Engineer' },
  },
  {
    id: '5',
    status: 'HIRED',
    appliedAt: new Date('2026-02-15'),
    matchScore: 88,
    candidateProfile: {
      id: 'c5',
      firstName: 'Layla',
      lastName: 'Mohammed',
      email: 'layla@example.com',
      location: 'Dubai, UAE',
      yearsOfExperience: 4,
      extractedSkills: ['UX Design', 'Figma', 'User Research'],
    },
    job: { id: 'j2', title: 'UX Designer' },
  },
];

export default function PipelinePage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<string>('all');
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setApplications(mockApplications);
      setLoading(false);
    }, 500);
  }, []);

  const handleDragStart = (e: React.DragEvent, applicationId: string) => {
    setDraggedItem(applicationId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: ApplicationStatus) => {
    e.preventDefault();
    if (!draggedItem) return;

    setApplications(prev =>
      prev.map(app =>
        app.id === draggedItem ? { ...app, status: newStatus } : app
      )
    );
    setDraggedItem(null);
  };

  const filteredApplications = selectedJob === 'all'
    ? applications
    : applications.filter(app => app.job.id === selectedJob);

  const getApplicationsByStatus = (status: ApplicationStatus) => {
    return filteredApplications.filter(app => app.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-surface-500">Loading pipeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">Hiring Pipeline</h1>
          <p className="text-surface-500 text-sm">Drag and drop candidates between stages</p>
        </div>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="input-premium"
        >
          <option value="all">All Jobs</option>
          <option value="j1">Senior Software Engineer</option>
          <option value="j2">UX Designer</option>
        </select>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-8 px-8">
        {columns.map(column => (
          <div
            key={column.id}
            className="flex-shrink-0 w-72"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className={`${column.color} rounded-t-lg px-4 py-3`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{column.title}</h3>
                <span className="bg-white/20 text-white text-sm px-2 py-1 rounded-full">
                  {getApplicationsByStatus(column.id).length}
                </span>
              </div>
            </div>

            <div className="bg-surface-100 rounded-b-lg p-3 min-h-[500px]">
              {getApplicationsByStatus(column.id).length === 0 ? (
                <div className="text-center py-8 text-surface-400 text-sm">No candidates</div>
              ) : (
                <div className="space-y-3">
                  {getApplicationsByStatus(column.id).map(app => (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id)}
                      className="bg-surface-white rounded-lg p-4 shadow-sm border border-surface-200 cursor-move hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-brand-600 font-semibold">
                            {app.candidateProfile.firstName[0]}{app.candidateProfile.lastName[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-surface-900 truncate">
                            {app.candidateProfile.firstName} {app.candidateProfile.lastName}
                          </h4>
                          <p className="text-sm text-surface-500 truncate">
                            {app.candidateProfile.location}
                          </p>
                        </div>
                      </div>

                      <div className="text-sm text-surface-600 mb-2">{app.job.title}</div>

                      {app.candidateProfile.extractedSkills && app.candidateProfile.extractedSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {app.candidateProfile.extractedSkills.slice(0, 3).map((skill, i) => (
                            <span key={i} className="px-2 py-0.5 bg-surface-100 text-surface-600 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      {app.matchScore && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex-1 h-1.5 bg-surface-200 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-500 rounded-full" style={{ width: `${app.matchScore}%` }} />
                          </div>
                          <span className="text-xs text-surface-500">{app.matchScore}%</span>
                        </div>
                      )}

                      <div className="text-xs text-surface-400">
                        Applied {new Date(app.appliedAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
