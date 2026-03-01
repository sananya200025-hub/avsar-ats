'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    requirements: '',
    location: '',
    workType: 'ON_SITE',
    experienceMin: '',
    experienceMax: '',
    salaryMin: '',
    salaryMax: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          experienceMin: formData.experienceMin ? parseInt(formData.experienceMin) : null,
          experienceMax: formData.experienceMax ? parseInt(formData.experienceMax) : null,
          salaryMin: formData.salaryMin ? parseInt(formData.salaryMin) : null,
          salaryMax: formData.salaryMax ? parseInt(formData.salaryMax) : null,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to create job');
        return;
      }

      router.push('/dashboard/employer');
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/employer" className="text-brand-600 font-medium hover:text-brand-700 flex items-center gap-2 mb-4">
            ← Back to Dashboard
          </Link>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            Post a New Job
          </h1>
          <p className="text-surface-500 mt-2">
            Fill in the job details to attract the best candidates
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card-premium p-8 space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="font-display text-lg font-semibold text-surface-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-premium"
                  placeholder="e.g. Senior Software Engineer"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="input-premium"
                    placeholder="e.g. Engineering"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Location *
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input-premium"
                    required
                  >
                    <option value="">Select location</option>
                    <option value="Dubai">Dubai</option>
                    <option value="Abu Dhabi">Abu Dhabi</option>
                    <option value="Sharjah">Sharjah</option>
                    <option value="Remote">Remote</option>
                    <option value="UAE - Multiple">UAE - Multiple</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Work Type *
                </label>
                <select
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  className="input-premium"
                  required
                >
                  <option value="ON_SITE">On Site</option>
                  <option value="REMOTE">Remote</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h2 className="font-display text-lg font-semibold text-surface-900 mb-4">Job Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-premium min-h-[150px]"
                  placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="input-premium min-h-[100px]"
                  placeholder="List the key requirements and qualifications..."
                />
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div>
            <h2 className="font-display text-lg font-semibold text-surface-900 mb-4">Compensation & Experience</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Min Salary (AED/year)
                  </label>
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    className="input-premium"
                    placeholder="e.g. 60000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Max Salary (AED/year)
                  </label>
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    className="input-premium"
                    placeholder="e.g. 120000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Min Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experienceMin"
                    value={formData.experienceMin}
                    onChange={handleChange}
                    className="input-premium"
                    placeholder="e.g. 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Max Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experienceMax"
                    value={formData.experienceMax}
                    onChange={handleChange}
                    className="input-premium"
                    placeholder="e.g. 7"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
