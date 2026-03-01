'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  location: string;
  nationality: string;
  yearsOfExperience: number | null;
  expectedSalary: number | null;
  extractedSkills: string[];
  profileCompletion: number;
  isUnlocked: boolean;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Al-Rashid',
    location: 'Dubai, UAE',
    nationality: 'UAE',
    yearsOfExperience: 5,
    expectedSalary: 180000,
    extractedSkills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'],
    profileCompletion: 95,
    isUnlocked: true,
  },
  {
    id: '2',
    firstName: 'Fatima',
    lastName: 'Hassan',
    location: 'Abu Dhabi, UAE',
    nationality: 'UAE',
    yearsOfExperience: 3,
    expectedSalary: 120000,
    extractedSkills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
    profileCompletion: 88,
    isUnlocked: false,
  },
  {
    id: '3',
    firstName: 'Omar',
    lastName: 'Ahmed',
    location: 'Dubai, UAE',
    nationality: 'Egyptian',
    yearsOfExperience: 7,
    expectedSalary: 220000,
    extractedSkills: ['Java', 'Spring', 'AWS', 'Docker', 'Kubernetes'],
    profileCompletion: 92,
    isUnlocked: true,
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Johnson',
    location: 'Sharjah, UAE',
    nationality: 'British',
    yearsOfExperience: 4,
    expectedSalary: 150000,
    extractedSkills: ['React', 'Next.js', 'Figma', 'UI/UX Design'],
    profileCompletion: 85,
    isUnlocked: false,
  },
  {
    id: '5',
    firstName: 'Layla',
    lastName: 'Mohammed',
    location: 'Dubai, UAE',
    nationality: 'UAE',
    yearsOfExperience: 6,
    expectedSalary: 200000,
    extractedSkills: ['Project Management', 'Agile', 'Scrum', 'Leadership'],
    profileCompletion: 90,
    isUnlocked: false,
  },
];

export default function CVPoolPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [unlockingId, setUnlockingId] = useState<string | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Set<string>>(new Set());

  useEffect(() => {
    setTimeout(() => {
      setCandidates(mockCandidates);
      setLoading(false);
    }, 500);
  }, []);

  const handleUnlock = async (candidate: Candidate) => {
    setUnlockingId(candidate.id);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCandidates(prev =>
      prev.map(c => c.id === candidate.id ? { ...c, isUnlocked: true } : c)
    );
    if (selectedCandidate?.id === candidate.id) {
      setSelectedCandidate({ ...selectedCandidate, isUnlocked: true });
    }
    setUnlockingId(null);
  };

  const toggleSave = (id: string) => {
    setSavedCandidates(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredCandidates = candidates.filter(c => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(searchLower) ||
      c.lastName.toLowerCase().includes(searchLower) ||
      c.extractedSkills.some(s => s.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">CV Pool</h1>
        <p className="text-surface-500">Search and discover talent from our candidate database</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-surface-100 mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or skills..."
              className="input-premium"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredCandidates.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-surface-100">
          <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-surface-900 mb-2">No candidates found</h3>
          <p className="text-surface-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-surface-100 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedCandidate(candidate)}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {candidate.firstName[0]}{candidate.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-surface-900">{candidate.firstName} {candidate.lastName}</h3>
                  <p className="text-sm text-surface-500">{candidate.location}</p>
                  <p className="text-xs text-surface-400">{candidate.yearsOfExperience} years experience</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {candidate.extractedSkills.slice(0, 3).map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 bg-brand-100 text-brand-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
                {candidate.extractedSkills.length > 3 && (
                  <span className="px-2 py-0.5 text-surface-400 text-xs">+{candidate.extractedSkills.length - 3}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-16 bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${candidate.profileCompletion}%` }} />
                  </div>
                  <span className="text-xs text-surface-500">{candidate.profileCompletion}%</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleSave(candidate.id); }}
                  className={`p-2 rounded-lg border transition-colors ${
                    savedCandidates.has(candidate.id)
                      ? 'bg-brand-100 border-brand-300 text-brand-600'
                      : 'border-surface-200 text-surface-500 hover:text-brand-600 hover:border-brand-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill={savedCandidates.has(candidate.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCandidate(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {selectedCandidate.firstName[0]}{selectedCandidate.lastName[0]}
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-surface-900">
                      {selectedCandidate.firstName} {selectedCandidate.lastName}
                    </h2>
                    <p className="text-surface-500">{selectedCandidate.location}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-surface-100 rounded-lg">
                  <svg className="w-5 h-5 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-surface-50 rounded-lg">
                  <div className="text-sm text-surface-500 mb-1">Experience</div>
                  <div className="font-semibold text-surface-900">{selectedCandidate.yearsOfExperience} years</div>
                </div>
                <div className="p-4 bg-surface-50 rounded-lg">
                  <div className="text-sm text-surface-500 mb-1">Expected Salary</div>
                  <div className="font-semibold text-surface-900">AED {selectedCandidate.expectedSalary?.toLocaleString()}/year</div>
                </div>
                <div className="p-4 bg-surface-50 rounded-lg">
                  <div className="text-sm text-surface-500 mb-1">Nationality</div>
                  <div className="font-semibold text-surface-900">{selectedCandidate.nationality}</div>
                </div>
                <div className="p-4 bg-surface-50 rounded-lg">
                  <div className="text-sm text-surface-500 mb-1">Profile Completion</div>
                  <div className="font-semibold text-surface-900">{selectedCandidate.profileCompletion}%</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-surface-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.extractedSkills.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {selectedCandidate.isUnlocked ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Contact Information Unlocked
                  </div>
                  <p className="text-sm text-green-600">You can now view and contact this candidate directly.</p>
                </div>
              ) : (
                <button
                  onClick={() => handleUnlock(selectedCandidate)}
                  disabled={unlockingId === selectedCandidate.id}
                  className="w-full py-4 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {unlockingId === selectedCandidate.id ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Unlock Contact (AED 500)
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
