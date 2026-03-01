'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProcessPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and set up your employer or candidate profile in minutes.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80',
      features: ['Quick registration', 'Company verification', 'Profile customization'],
    },
    {
      number: '02',
      title: 'Post or Browse Jobs',
      description: 'Employers post jobs with AI-optimized descriptions or candidates browse opportunities.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80',
      features: ['AI job descriptions', 'Smart matching', 'Advanced filters'],
    },
    {
      number: '03',
      title: 'AI-Powered Screening',
      description: 'Our AI analyzes CVs and matches candidates to jobs with scoring.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
      features: ['Automated screening', 'Skill matching', 'Cultural fit assessment'],
    },
    {
      number: '04',
      title: 'Manage Pipeline',
      description: 'Track candidates through the hiring process with our Kanban pipeline.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      features: ['Drag & drop interface', 'Interview scheduling', 'Team collaboration'],
    },
    {
      number: '05',
      title: 'Generate Offers',
      description: 'Create professional UAE-compliant offer letters with all details.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
      features: ['Template library', 'Legal compliance', 'Version control'],
    },
    {
      number: '06',
      title: 'Digital Signing',
      description: 'Candidates sign offers electronically with DocuSign integration.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
      features: ['E-signatures', 'Audit trail', 'Instant notifications'],
    },
  ];

  const benefits = [
    {
      title: 'For Employers',
      items: [
        'Access to 50,000+ qualified candidates',
        'AI-powered candidate matching',
        'Automated compliance tracking',
        'Transparent pricing with no hidden fees',
        'Dedicated account manager',
        'Real-time analytics dashboard',
      ],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80',
    },
    {
      title: 'For Candidates',
      items: [
        'One-click apply to multiple jobs',
        'AI resume optimization tips',
        'Application status tracking',
        'Direct communication with employers',
        'Salary negotiation support',
        'Career growth resources',
      ],
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-white">
      {/* Header */}
      <header className="bg-surface-white border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-display text-2xl font-bold text-surface-900">Avsar</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-surface-600 hover:text-brand-600 font-medium">Home</Link>
            <Link href="/about" className="text-surface-600 hover:text-brand-600 font-medium">About</Link>
            <Link href="/process" className="text-brand-600 font-medium">Process</Link>
            <Link href="/jobs" className="text-surface-600 hover:text-brand-600 font-medium">Jobs</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-surface-700 hover:text-brand-600 font-medium">Sign In</Link>
            <Link href="/register" className="px-5 py-2.5 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-surface-white to-orange-50" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-surface-900 mb-6">
              How <span className="bg-gradient-to-r from-brand-500 to-orange-500 bg-clip-text text-transparent">Avsar</span> Works
            </h1>
            <p className="text-xl text-surface-600 mb-8 leading-relaxed">
              A streamlined, technology-driven approach to hiring that saves time,
              reduces costs, and finds the perfect match.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center mb-24 last:mb-0`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl font-bold text-brand-500/20">{step.number}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-surface-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-surface-600 text-lg mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-surface-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-orange-500/20 z-10" />
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-surface-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Benefits for Everyone
            </h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              Whether you are hiring or looking for a job, Avsar has you covered
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl"
              >
                <div className="h-48 relative">
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-display text-2xl font-bold text-white">{benefit.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <ul className="space-y-4">
                    {benefit.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-surface-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Average Time to Hire
            </h2>
            <p className="text-surface-600">
              See how fast you can go from posting to hiring
            </p>
          </motion.div>

          <div className="relative">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-surface-200 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-brand-500 to-orange-500 rounded-full"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 pt-8">
              {[
                { days: '1-2', label: 'Post Job' },
                { days: '3-5', label: 'Screening' },
                { days: '5-7', label: 'Interviews' },
                { days: '7-14', label: 'Hiring' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-white font-bold">{i + 1}</span>
                  </motion.div>
                  <div className="text-2xl font-bold text-surface-900 mb-1">{item.days}</div>
                  <div className="text-sm text-surface-600">Days</div>
                  <div className="text-sm font-medium text-brand-600 mt-2">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-brand-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join thousands of companies and candidates transforming hiring in the UAE
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Sign Up Free
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 text-surface-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-display text-xl font-bold text-surface-200">Avsar</span>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <Link href="#" className="hover:text-surface-200 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-surface-200 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-surface-200 transition-colors">Contact</Link>
            </div>
            <div className="text-sm">
              © 2026 Avsar ATS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
