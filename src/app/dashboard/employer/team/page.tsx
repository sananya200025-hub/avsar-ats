'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'active' | 'pending';
  joinedAt: Date;
}

const mockTeamMembers: TeamMember[] = [
  { id: '1', name: 'Ahmed Al-Rashid', email: 'ahmed@techcorp.ae', role: 'Admin', avatar: 'A', status: 'active', joinedAt: new Date('2025-01-15') },
  { id: '2', name: 'Fatima Hassan', email: 'fatima@techcorp.ae', role: 'HR Manager', avatar: 'F', status: 'active', joinedAt: new Date('2025-03-20') },
  { id: '3', name: 'Omar Ahmed', email: 'omar@techcorp.ae', role: 'Recruiter', avatar: 'O', status: 'active', joinedAt: new Date('2025-06-10') },
  { id: '4', name: 'Sarah Johnson', email: 'sarah@techcorp.ae', role: 'Hiring Manager', avatar: 'S', status: 'pending', joinedAt: new Date('2026-02-01') },
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTeamMembers(mockTeamMembers);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">Team</h1>
          <p className="text-surface-500">Manage your team members and their permissions</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          Invite Member
        </button>
      </motion.div>

      {/* Team Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-white rounded-xl p-5 shadow-sm border border-surface-100">
          <div className="text-2xl font-bold text-surface-900">{teamMembers.length}</div>
          <div className="text-sm text-surface-500">Total Members</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-surface-100">
          <div className="text-2xl font-bold text-green-600">{teamMembers.filter(m => m.status === 'active').length}</div>
          <div className="text-sm text-surface-500">Active</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-surface-100">
          <div className="text-2xl font-bold text-orange-600">{teamMembers.filter(m => m.status === 'pending').length}</div>
          <div className="text-sm text-surface-500">Pending Invites</div>
        </div>
      </motion.div>

      {/* Team List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-surface-100 overflow-hidden"
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-surface-50 border-b border-surface-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Member</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Role</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Joined</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-surface-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {teamMembers.map((member, index) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="hover:bg-surface-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-orange-400 rounded-full flex items-center justify-center text-white font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-surface-900">{member.name}</div>
                        <div className="text-sm text-surface-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-surface-100 text-surface-700 rounded-full text-sm font-medium">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      member.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {member.status === 'active' ? 'Active' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-surface-500">
                    {member.joinedAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-surface-500 hover:text-brand-600 hover:bg-surface-100 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-2 text-surface-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowInviteModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-display text-xl font-bold text-surface-900 mb-4">Invite Team Member</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Email Address</label>
                <input type="email" placeholder="colleague@company.com" className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Role</label>
                <select className="input-premium">
                  <option>Recruiter</option>
                  <option>HR Manager</option>
                  <option>Hiring Manager</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowInviteModal(false)} className="flex-1 btn-secondary">
                Cancel
              </button>
              <button className="flex-1 btn-primary">
                Send Invite
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
