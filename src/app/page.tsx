'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations';
import Hero3DBackground from '@/components/animations/Hero3DBackground';

function AnimatedGradient() {
  const [particles, setParticles] = useState<Array<{ x: string; y: string; duration: number; delay: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate random positions only on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100 + '%',
      y: Math.random() * 100 + '%',
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
    setMounted(true);
  }, []);

  // Return empty div on server, particles will render after client mount
  if (!mounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/15 rounded-full blur-3xl"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-400/15 rounded-full blur-3xl"
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-brand-300/10 rounded-full blur-3xl"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-500/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-400/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-brand-300/10 rounded-full blur-3xl"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #171717 1px, transparent 1px),
                           linear-gradient(to bottom, #171717 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles - client-side only */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-brand-500/30 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [particle.y, `${Math.random() * 100}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function FloatingCard({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GlowingButton({ href, children, primary = false, className = '' }: { href: string; children: React.ReactNode; primary?: boolean; className?: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      <Link
        href={href}
        className={`relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl transition-all ${
          primary
            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50'
            : 'bg-white/10 text-surface-900 border border-surface-200/50 backdrop-blur-sm hover:bg-white/20'
        }`}
      >
        <span className="relative z-10">{children}</span>
        {primary && (
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-400 to-orange-400 opacity-0 hover:opacity-20 transition-opacity"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.2 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Hero3DBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-white/70 via-surface-white/50 to-surface-white z-0" />

      {/* Additional atmospheric layers */}
      <div className="absolute inset-0 z-0">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-surface-white to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-surface-white to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full mb-8"
          >
            <motion.span
              className="w-2 h-2 bg-brand-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-brand-600 text-sm font-medium">UAE's Leading Recruitment Platform</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-surface-900 leading-tight mb-6"
          >
            Hire Smarter with{' '}
            <motion.span
              className="bg-gradient-to-r from-brand-500 to-orange-500 bg-clip-text text-transparent"
              initial={{ backgroundPosition: '0%' }}
              animate={{ backgroundPosition: '100%' }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            >
              Avsar
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-surface-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            The complete recruitment operating system for UAE companies.
            AI-powered matching, compliance tracking, digital contracts, and seamless payments.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <GlowingButton href="/register?role=employer" primary>
              Start Hiring
            </GlowingButton>
            <GlowingButton href="/register?role=candidate">
              Find Jobs
            </GlowingButton>
          </motion.div>

          {/* Floating Stats Cards */}
          <motion.div
            style={{ y: y1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: 'Companies', value: '500+' },
              { label: 'Candidates', value: '50K+' },
              { label: 'Hires Made', value: '10K+' },
              { label: 'Success Rate', value: '95%' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg"
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-brand-500 mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-surface-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-surface-400/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-brand-500 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; delay: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-orange-500/5 animate-pulse" style={{ animationDuration: '3s' }} />
        </div>
      </div>

      {/* Card */}
      <div className="relative bg-white/80 backdrop-blur-md border border-surface-200/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
        {/* Icon Container */}
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-brand-500 to-orange-500 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow"
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        <h3 className="font-display text-xl font-semibold text-surface-900 mb-3 group-hover:text-brand-600 transition-colors">{title}</h3>
        <p className="text-surface-600 leading-relaxed">{description}</p>

        {/* Arrow indicator on hover */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
          className="absolute bottom-8 right-8"
        >
          <svg className="w-5 h-5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Heroicon components
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

const PenIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
  </svg>
);

function FeaturesSection() {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI Matching',
      description: 'Intelligent matching algorithm scores candidates based on skills, experience, and cultural fit.',
    },
    {
      icon: DocumentTextIcon,
      title: 'Smart CV Parsing',
      description: 'Auto-extract skills, experience, and qualifications from resumes in seconds.',
    },
    {
      icon: ChartBarIcon,
      title: 'Kanban Pipeline',
      description: 'Drag-and-drop workflow to track candidates through every stage of hiring.',
    },
    {
      icon: PenIcon,
      title: 'Digital Contracts',
      description: 'Generate UAE-compliant offer letters with DocuSign integration.',
    },
    {
      icon: CreditCardIcon,
      title: 'Easy Payments',
      description: 'Secure 12% CTC fee collection with Stripe. Escrow and unlock models available.',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Compliance Tracking',
      description: 'Track Emirates ID, visa status, and onboarding documents with expiry alerts.',
    },
  ];

  return (
    <section id="features" className="relative py-32 px-6 bg-gradient-to-b from-surface-50 via-surface-white to-surface-white">
      <AnimatedGradient />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            {/* Section badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
              <span className="text-brand-600 text-sm font-medium">Enterprise-Grade Features</span>
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-surface-900 mb-6">
              Everything You Need to Hire
            </h2>
            <p className="text-xl text-surface-600 max-w-2xl mx-auto">
              From AI-powered candidate matching to digital contracts and payments -
              streamline your entire hiring process.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Image Showcase Section with Realistic Animations
function ImageShowcaseSection() {
  return (
    <section className="relative py-32 px-6 bg-surface-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23171717' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
              <span className="text-brand-600 text-sm font-medium">See Avsar in Action</span>
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-surface-900 mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-surface-600 max-w-2xl mx-auto">
              Join hundreds of companies transforming their hiring with Avsar
            </p>
          </div>
        </ScrollReveal>

        {/* Main Visual Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Large Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden h-[400px] lg:h-[500px] group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-orange-500/20 z-10" />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Team collaboration"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent z-20">
              <h3 className="text-white font-display text-2xl font-bold mb-2">Smart Team Collaboration</h3>
              <p className="text-white/80">Streamline your hiring workflow with AI-powered tools</p>
            </div>
          </motion.div>

          {/* Right Side Images */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden h-[240px] group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-orange-500/20 z-10" />
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80"
                alt="AI Technology"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent z-20">
                <h3 className="text-white font-semibold text-lg">AI-Powered Matching</h3>
              </div>
            </motion.div>

            {/* Bottom Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative rounded-3xl overflow-hidden h-[240px] group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-orange-500/20 z-10" />
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80"
                alt="Modern Office"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent z-20">
                <h3 className="text-white font-semibold text-lg">Global Talent Pool</h3>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '50K+', label: 'Candidates', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80' },
            { value: '500+', label: 'Companies', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80' },
            { value: '10K+', label: 'Hires Made', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&q=80' },
            { value: '95%', label: 'Success Rate', image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=200&q=80' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-brand-500/20 group-hover:ring-brand-500/40 transition-all">
                <img src={stat.image} alt={stat.label} className="w-full h-full object-cover" />
              </div>
              <div className="text-3xl font-bold text-surface-900 mb-1">{stat.value}</div>
              <div className="text-surface-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-orange-600" />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Join 500+ UAE companies using Avsar to hire faster and smarter.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="px-10 py-4 bg-white text-brand-600 text-lg font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
            >
              Get Started Free
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg border-b border-surface-200/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow"
            >
              <span className="text-white font-bold text-xl md:text-2xl">A</span>
            </motion.div>
            <span className="font-display text-2xl md:text-3xl font-bold text-surface-900">Avsar</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 text-surface-600 hover:text-brand-600 font-medium rounded-lg hover:bg-surface-100 transition-all"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 text-surface-700 hover:text-brand-600 font-semibold transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-surface-600 hover:text-surface-900"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-surface-200 py-4"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-surface-600 hover:text-brand-600 font-medium rounded-lg hover:bg-surface-100 transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-surface-200 mt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-center text-surface-700 hover:text-brand-600 font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-center bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ImageShowcaseSection />
      <CTASection />

      {/* Enhanced Footer */}
      <footer className="bg-surface-900 text-surface-400 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="font-display text-2xl font-bold text-surface-100">Avsar</span>
              </Link>
              <p className="text-surface-500 text-sm mb-6 max-w-xs">
                UAE's leading recruitment platform. Hire smarter with AI-powered matching, compliance tracking, and seamless payments.
              </p>
              <div className="flex items-center gap-4">
                {['twitter', 'linkedin', 'instagram'].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all"
                  >
                    {social === 'twitter' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                    {social === 'linkedin' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {social === 'instagram' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Column */}
            <div>
              <h4 className="text-surface-100 font-semibold mb-4">Platform</h4>
              <ul className="space-y-3">
                <li><Link href="/jobs" className="text-sm hover:text-brand-400 transition-colors">Browse Jobs</Link></li>
                <li><Link href="/register?role=employer" className="text-sm hover:text-brand-400 transition-colors">Post a Job</Link></li>
                <li><Link href="/dashboard/employer/cv-pool" className="text-sm hover:text-brand-400 transition-colors">CV Pool</Link></li>
                <li><Link href="/pricing" className="text-sm hover:text-brand-400 transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-brand-400 transition-colors">Enterprise</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-surface-100 font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm hover:text-brand-400 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-brand-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Press</Link></li>
                <li><Link href="/contact" className="text-sm hover:text-brand-400 transition-colors">Partners</Link></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-surface-100 font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Case Studies</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-surface-100 font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Compliance</Link></li>
                <li><Link href="#" className="text-sm hover:text-brand-400 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="border-t border-surface-800 pt-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-surface-100 font-semibold mb-2">Stay updated</h4>
                <p className="text-sm text-surface-500">Get the latest news and updates from Avsar</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-3 bg-surface-800 border border-surface-700 rounded-xl text-surface-100 placeholder-surface-500 focus:outline-none focus:border-brand-500 transition-colors"
                />
                <button className="px-6 py-3 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-surface-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-surface-500">
              © 2026 Avsar ATS. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-surface-500">Made with</span>
              <span className="text-red-500">❤️</span>
              <span className="text-surface-500">in the UAE</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-surface-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Dubai, UAE
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
