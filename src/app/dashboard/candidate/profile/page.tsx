'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CandidateProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  nationality: string;
  dateOfBirth: string;
  yearsOfExperience: number;
  expectedSalary: number;
  currentPosition: string;
  currentCompany: string;
  summary: string;
  skills: string[];
  languages: { language: string; level: string }[];
  education: { degree: string; institution: string; year: string; field: string }[];
  experience: { title: string; company: string; startDate: string; endDate: string; description: string }[];
}

const availableSkills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Java', 'C++',
  'SQL', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD',
  'Machine Learning', 'Data Analysis', 'Project Management', 'Agile', 'Scrum',
  'UI/UX Design', 'Figma', 'Photoshop', 'Marketing', 'Sales', 'Finance',
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<CandidateProfile>({
    firstName: 'Ahmed',
    lastName: 'Al-Rashid',
    email: 'ahmed.alrashid@email.com',
    phone: '+971 50 123 4567',
    location: 'Dubai, UAE',
    nationality: 'UAE',
    dateOfBirth: '1992-05-15',
    yearsOfExperience: 5,
    expectedSalary: 180000,
    currentPosition: 'Senior Software Engineer',
    currentCompany: 'TechCorp UAE',
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable web applications and leading technical teams.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    languages: [
      { language: 'English', level: 'Fluent' },
      { language: 'Arabic', level: 'Native' },
    ],
    education: [
      { degree: 'Bachelor of Science', institution: 'American University of Sharjah', year: '2016', field: 'Computer Science' },
    ],
    experience: [
      { title: 'Senior Software Engineer', company: 'TechCorp UAE', startDate: '2021-01', endDate: 'Present', description: 'Leading development of microservices architecture and mentoring junior developers.' },
      { title: 'Software Engineer', company: 'Digital Solutions Inc', startDate: '2018-06', endDate: '2020-12', description: 'Built and maintained multiple client web applications using React and Node.js.' },
    ],
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileCompletion, setProfileCompletion] = useState(85);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addSkill = (skill: string) => {
    if (!profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: [...profile.skills, skill] });
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'experience', label: 'Experience', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'education', label: 'Education', icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' },
    { id: 'skills', label: 'Skills & Languages', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
  ];

  return (
    <div>
      {/* Profile Completion Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-surface-100 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-orange-500 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  `${profile.firstName[0]}${profile.lastName[0]}`
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center hover:bg-brand-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 9a2 012 2v2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-surface-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-surface-500">{profile.currentPosition} at {profile.currentCompany}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-surface-500">Profile Completion</span>
                <span className="text-sm font-semibold text-brand-600">{profileCompletion}%</span>
              </div>
              <div className="w-48 h-2 bg-surface-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${profileCompletion}%` }}
                  className="h-full bg-gradient-to-r from-brand-500 to-orange-500 rounded-full"
                />
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isEditing
                  ? 'bg-brand-500 text-white hover:bg-brand-600'
                  : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
              }`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-surface-100 overflow-hidden">
        <div className="border-b border-surface-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-brand-600 border-b-2 border-brand-500 bg-brand-50'
                    : 'text-surface-500 hover:text-surface-700 hover:bg-surface-50'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="input-premium disabled:bg-surface-50 disabled:text-surface-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="input-premium disabled:bg-surface-50 disabled:text-surface-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className="input-premium disabled:bg-surface-50 disabled:text-surface-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="input-premium disabled:bg-surface-50 disabled:text-surface-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                    className="input-premium disabled:bg-surface-50 disabled:text-surface-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Nationality</label>
                  <input
                    type="text"
                    value={profile.nationality}
                    onChange={(e) => setProfile({ ...profile, nationality: e.target.value })}
                    disabled={!isEditing}
                    className="input-premium disabled:bg-surface-50 disabled:text-surface-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                    disabled={!isEditing}
                    className="input-premium disabled:bg-surface-50 disabled:text-surface-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Expected Salary (AED)</label>
                  <input
                    type="number"
                    value={profile.expectedSalary}
                    onChange={(e) => setProfile({ ...profile, expectedSalary: parseInt(e.target.value) })}
                    disabled={!isEditing}
                    className="input-premium disabled:bg-surface-50 disabled:text-surface-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">Professional Summary</label>
                <textarea
                  value={profile.summary}
                  onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className="input-premium disabled:bg-surface-50 disabled:text-surface-500"
                />
              </div>
            </motion.div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="p-5 bg-surface-50 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-surface-900">{exp.title}</h4>
                        <p className="text-surface-500">{exp.company}</p>
                        <p className="text-sm text-surface-400">{exp.startDate} - {exp.endDate}</p>
                      </div>
                      {isEditing && (
                        <button className="text-surface-400 hover:text-red-500">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <p className="text-surface-600 mt-2 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
              {isEditing && (
                <button className="w-full py-3 border-2 border-dashed border-surface-200 rounded-xl text-surface-500 hover:border-brand-300 hover:text-brand-600 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Experience
                </button>
              )}
            </motion.div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="p-5 bg-surface-50 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-surface-900">{edu.degree}</h4>
                        <p className="text-surface-500">{edu.institution}</p>
                        <p className="text-sm text-surface-400">{edu.field} | {edu.year}</p>
                      </div>
                      {isEditing && (
                        <button className="text-surface-400 hover:text-red-500">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {isEditing && (
                <button className="w-full py-3 border-2 border-dashed border-surface-200 rounded-xl text-surface-500 hover:border-brand-300 hover:text-brand-600 transition-colors flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Education
                </button>
              )}
            </motion.div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <h4 className="font-semibold text-surface-900 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-brand-100 text-brand-700 rounded-full text-sm font-medium flex items-center gap-1"
                    >
                      {skill}
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)} className="hover:text-brand-900">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.filter(s => !profile.skills.includes(s)).slice(0, 10).map((skill) => (
                      <button
                        key={skill}
                        onClick={() => addSkill(skill)}
                        className="px-3 py-1.5 bg-surface-100 text-surface-600 rounded-full text-sm font-medium hover:bg-surface-200 transition-colors"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-surface-900 mb-3">Languages</h4>
                <div className="space-y-2">
                  {profile.languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-surface-50 rounded-lg">
                      <span className="text-surface-700">{lang.language}</span>
                      <span className="text-sm text-surface-500">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* CV Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-surface-100 mt-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-surface-900 mb-1">Resume / CV</h3>
            <p className="text-sm text-surface-500">Upload your latest resume in PDF or DOCX format</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
              ✓ Uploaded
            </div>
            <button className="btn-secondary text-sm">
              Update Resume
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
