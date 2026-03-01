'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get('role') || 'candidate';

  const [step, setStep] = useState(1);
  const [role, setRole] = useState(defaultRole === 'employer' ? 'EMPLOYER' : 'CANDIDATE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Candidate fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');

  // Employer fields
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role,
          firstName,
          lastName,
          nationality,
          companyName,
          industry,
          contactPerson,
          contactPhone,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Registration failed');
        return;
      }

      // Auto sign in after registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        router.push('/login');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="font-display text-3xl font-bold text-surface-900">Avsar</span>
          </Link>
        </div>

        {/* Register Card */}
        <div className="card-premium p-8">
          <h1 className="font-display text-2xl font-bold text-surface-900 mb-2">
            Create your account
          </h1>
          <p className="text-surface-500 mb-8">
            {role === 'CANDIDATE' ? 'Find your dream job in the UAE' : 'Start hiring talent today'}
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Role Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <button
                onClick={() => setRole('CANDIDATE')}
                className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                  role === 'CANDIDATE'
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-surface-200 hover:border-surface-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900">I'm a Candidate</div>
                    <div className="text-sm text-surface-500">Looking for job opportunities</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setRole('EMPLOYER')}
                className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                  role === 'EMPLOYER'
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-surface-200 hover:border-surface-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center text-2xl">
                    🏢
                  </div>
                  <div>
                    <div className="font-semibold text-surface-900">I'm an Employer</div>
                    <div className="text-sm text-surface-500">Hiring for my company</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full py-3 mt-4"
              >
                Continue
              </button>
            </div>
          )}

          {/* Form Fields */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-premium"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium"
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                />
              </div>

              {role === 'CANDIDATE' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input-premium"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input-premium"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Nationality
                    </label>
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="input-premium"
                      required
                    >
                      <option value="">Select nationality</option>
                      <option value="AE">UAE</option>
                      <option value="IN">India</option>
                      <option value="PK">Pakistan</option>
                      <option value="PH">Philippines</option>
                      <option value="EG">Egypt</option>
                      <option value="JO">Jordan</option>
                      <option value="LB">Lebanon</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="input-premium"
                      placeholder="Acme Corporation"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="input-premium"
                      required
                    >
                      <option value="">Select industry</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Construction">Construction</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="input-premium"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="input-premium"
                      placeholder="+971 50 123 4567"
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1 py-3"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 py-3 disabled:opacity-50"
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <span className="text-surface-500">Already have an account? </span>
            <Link href="/login" className="text-brand-600 font-medium hover:text-brand-700">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
