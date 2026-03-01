'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { value: '50K+', label: 'Active Candidates' },
    { value: '500+', label: 'Partner Companies' },
    { value: '10K+', label: 'Successful Hires' },
    { value: '95%', label: 'Client Satisfaction' },
  ];

  const team = [
    {
      name: 'Ahmed Al Mansouri',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      bio: 'Former HR Director with 15+ years in talent acquisition across the GCC region.',
    },
    {
      name: 'Fatima Al Hashemi',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      bio: 'AI/ML expert previously led engineering teams at top tech companies.',
    },
    {
      name: 'Mohammed Khan',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'Operations specialist with deep expertise in UAE labor laws and compliance.',
    },
    {
      name: 'Aisha Rahman',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
      bio: 'Product leader focused on creating seamless user experiences.',
    },
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We continuously innovate to bring cutting-edge AI solutions to recruitment.',
      icon: '💡',
    },
    {
      title: 'Integrity',
      description: 'We maintain the highest standards of transparency and ethical practices.',
      icon: '🤝',
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from product to service.',
      icon: '⭐',
    },
    {
      title: 'Customer Focus',
      description: 'Our customers success is our success - we are dedicated to their needs.',
      icon: '🎯',
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
            <Link href="/about" className="text-brand-600 font-medium">About</Link>
            <Link href="/process" className="text-surface-600 hover:text-brand-600 font-medium">Process</Link>
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
              About <span className="bg-gradient-to-r from-brand-500 to-orange-500 bg-clip-text text-transparent">Avsar</span>
            </h1>
            <p className="text-xl text-surface-600 mb-8 leading-relaxed">
              We are on a mission to transform how companies hire talent in the UAE and beyond.
              Avsar (meaning &quot;Opportunity&quot; in Arabic) is building the complete recruitment
              operating system for the modern workplace.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-surface-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-600 mb-2">{stat.value}</div>
                <div className="text-surface-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-surface-600 leading-relaxed">
                <p>
                  Founded in 2023 in Dubai, Avsar was born from a simple observation: the
                  recruitment industry was ripe for disruption. Companies struggled with fragmented
                  hiring processes, while candidates faced opaque application systems.
                </p>
                <p>
                  Our founders - with decades of combined experience in HR, technology, and
                  the UAE job market - set out to build a platform that would bridge this gap.
                </p>
                <p>
                  Today, Avsar powers hiring for hundreds of companies across the UAE, from
                  startups to Fortune 500 enterprises. We have helped place over 10,000 candidates
                  in their dream jobs, and we are just getting started.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-brand-500/20 to-orange-500/20 rounded-3xl" />
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                alt="Avsar Office"
                className="relative rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-surface-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Our Values
            </h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              These core values guide everything we do at Avsar
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-display text-xl font-semibold text-surface-900 mb-2">{value.title}</h3>
                <p className="text-surface-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-surface-600 max-w-2xl mx-auto">
              Our team combines deep expertise in recruitment, technology, and the UAE market
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold text-surface-900">{member.name}</h3>
                <p className="text-brand-600 font-medium mb-2">{member.role}</p>
                <p className="text-surface-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
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
              Join the Avsar Journey
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Be part of the transformation in UAE recruitment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/process"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                Learn Our Process
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
