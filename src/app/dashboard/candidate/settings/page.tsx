'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form states
  const [emailNotifications, setEmailNotifications] = useState({
    newJobs: true,
    applicationUpdates: true,
    interviewReminders: true,
    marketing: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showProfile: true,
    allowMessages: true,
  });

  const [account, setAccount] = useState({
    email: 'ahmed.alrashid@email.com',
    phone: '+971 50 123 4567',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleSave = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    {
      id: 'account',
      label: 'Account',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">Settings</h1>
        <p className="text-surface-500">Manage your account preferences</p>
      </div>

      {/* Success Message */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
        >
          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-green-700">Settings saved successfully!</span>
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-surface-100 overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-surface-200">
            <nav className="p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                    activeTab === tab.id
                      ? 'bg-brand-50 text-brand-600 font-medium'
                      : 'text-surface-600 hover:bg-surface-50'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                  </svg>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {/* Account Tab */}
            {activeTab === 'account' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-semibold text-surface-900 mb-6">Account Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={account.email}
                      onChange={(e) => setAccount({ ...account, email: e.target.value })}
                      className="input-premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={account.phone}
                      onChange={(e) => setAccount({ ...account, phone: e.target.value })}
                      className="input-premium"
                    />
                  </div>
                  <div className="pt-4 border-t border-surface-200">
                    <h3 className="font-medium text-surface-900 mb-4">Danger Zone</h3>
                    <button className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-semibold text-surface-900 mb-6">Change Password</h2>
                <div className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={password.current}
                      onChange={(e) => setPassword({ ...password, current: e.target.value })}
                      className="input-premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={password.new}
                      onChange={(e) => setPassword({ ...password, new: e.target.value })}
                      className="input-premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={password.confirm}
                      onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                      className="input-premium"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-semibold text-surface-900 mb-6">Email Notifications</h2>
                <div className="space-y-4">
                  {[
                    { key: 'newJobs', label: 'New Job Matches', desc: 'Get notified when new jobs match your profile' },
                    { key: 'applicationUpdates', label: 'Application Updates', desc: 'Updates on your job applications' },
                    { key: 'interviewReminders', label: 'Interview Reminders', desc: 'Reminders before scheduled interviews' },
                    { key: 'marketing', label: 'Marketing Emails', desc: 'News, tips, and promotions from Avsar' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                      <div>
                        <div className="font-medium text-surface-900">{item.label}</div>
                        <div className="text-sm text-surface-500">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => setEmailNotifications({ ...emailNotifications, [item.key]: !emailNotifications[item.key as keyof typeof emailNotifications] })}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          emailNotifications[item.key as keyof typeof emailNotifications] ? 'bg-brand-500' : 'bg-surface-200'
                        }`}
                      >
                        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          emailNotifications[item.key as keyof typeof emailNotifications] ? 'left-7' : 'left-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="font-semibold text-surface-900 mb-6">Privacy Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Profile Visibility</label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                      className="input-premium"
                    >
                      <option value="public">Public - Visible to all employers</option>
                      <option value="private">Private - Only visible to employers you apply to</option>
                      <option value="hidden">Hidden - Not visible in CV pool</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                    <div>
                      <div className="font-medium text-surface-900">Show Profile</div>
                      <div className="text-sm text-surface-500">Allow employers to find your profile</div>
                    </div>
                    <button
                      onClick={() => setPrivacy({ ...privacy, showProfile: !privacy.showProfile })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        privacy.showProfile ? 'bg-brand-500' : 'bg-surface-200'
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        privacy.showProfile ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                    <div>
                      <div className="font-medium text-surface-900">Allow Messages</div>
                      <div className="text-sm text-surface-500">Receive messages from employers</div>
                    </div>
                    <button
                      onClick={() => setPrivacy({ ...privacy, allowMessages: !privacy.allowMessages })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        privacy.allowMessages ? 'bg-brand-500' : 'bg-surface-200'
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        privacy.allowMessages ? 'left-7' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-surface-200">
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
