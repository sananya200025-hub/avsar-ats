'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const [mounted, setMounted] = useState(false);
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started',
      price: annual ? 499 : 599,
      features: [
        'Up to 5 job postings',
        'CV Pool access (50/month)',
        'Basic AI matching',
        'Email support',
        'Applicant tracking',
        '1 user account',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'For growing companies with regular hiring needs',
      price: annual ? 999 : 1199,
      features: [
        'Unlimited job postings',
        'CV Pool access (200/month)',
        'Advanced AI matching',
        'Priority support',
        'Team collaboration',
        '5 user accounts',
        'Analytics dashboard',
        'Custom workflows',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      price: 'Custom',
      features: [
        'Everything in Professional',
        'Unlimited CV Pool access',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'Unlimited users',
        'Custom branding',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  const fees = [
    {
      title: 'Candidate Unlock',
      description: 'Unlock candidate contact information',
      price: 'AED 500',
      per: 'per candidate',
      features: [
        'Full contact details',
        'Email & phone access',
        'Direct communication',
        'One-time payment',
      ],
    },
    {
      title: 'Hiring Fee',
      description: '12% fee on annual CTC on successful hire',
      price: '12%',
      per: 'of annual CTC',
      features: [
        'Full placement service',
        'Compliance support',
        'Onboarding assistance',
        '90-day replacement guarantee',
      ],
    },
  ];

  if (!mounted) return null;

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
            <Link href="/process" className="text-surface-600 hover:text-brand-600 font-medium">Process</Link>
            <Link href="/pricing" className="text-brand-600 font-medium">Pricing</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-surface-700 hover:text-brand-600 font-medium">Sign In</Link>
            <Link href="/register" className="px-5 py-2.5 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-surface-white to-orange-50" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-5xl md:text-6xl font-bold text-surface-900 mb-6">
              Simple, <span className="bg-gradient-to-r from-brand-500 to-orange-500 bg-clip-text text-transparent">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-surface-600 mb-8">
              Choose the plan that fits your hiring needs. No hidden fees.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-4 bg-surface-100 rounded-full p-1">
              <button
                onClick={() => setAnnual(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  annual ? 'bg-brand-500 text-white shadow-lg' : 'text-surface-600 hover:text-surface-900'
                }`}
              >
                Annual (Save 20%)
              </button>
              <button
                onClick={() => setAnnual(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !annual ? 'bg-brand-500 text-white shadow-lg' : 'text-surface-600 hover:text-surface-900'
                }`}
              >
                Monthly
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-3xl p-8 shadow-xl ${
                  plan.popular ? 'ring-2 ring-brand-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="font-display text-2xl font-bold text-surface-900 mb-2">{plan.name}</h3>
                  <p className="text-surface-500 text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  {typeof plan.price === 'number' ? (
                    <>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-surface-500">AED</span>
                        <span className="font-display text-5xl font-bold text-surface-900">{plan.price}</span>
                        <span className="text-surface-500">/mo</span>
                      </div>
                      {annual && (
                        <p className="text-sm text-green-600 mt-2">Billed annually (AED {plan.price * 12}/year)</p>
                      )}
                    </>
                  ) : (
                    <div className="font-display text-5xl font-bold text-surface-900">{plan.price}</div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-surface-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`block w-full py-4 text-center rounded-xl font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-brand-500 text-white hover:bg-brand-600'
                      : 'bg-surface-100 text-surface-900 hover:bg-surface-200'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Fees */}
      <section className="py-16 px-6 bg-surface-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Additional Fees
            </h2>
            <p className="text-surface-600">
              Transparent pricing for candidate access and successful hires
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {fees.map((fee, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h3 className="font-display text-xl font-bold text-surface-900 mb-2">{fee.title}</h3>
                <p className="text-surface-500 text-sm mb-4">{fee.description}</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="font-display text-4xl font-bold text-brand-600">{fee.price}</span>
                  <span className="text-surface-500">{fee.per}</span>
                </div>
                <ul className="space-y-3">
                  {fee.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-surface-600">
                      <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-surface-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, debit cards, and bank transfers for annual plans.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, we offer a 14-day free trial for all plans. No credit card required.',
              },
              {
                q: 'What happens if I exceed my CV pool limit?',
                a: 'You can purchase additional CV unlocks at AED 500 per candidate, or upgrade to a higher plan.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee for all paid plans. Contact support for assistance.',
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h4 className="font-semibold text-surface-900 mb-2">{faq.q}</h4>
                <p className="text-surface-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-brand-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Hiring?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Join hundreds of companies using Avsar to hire faster and smarter
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl hover:bg-white/90 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                Talk to Sales
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
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="font-display text-xl font-bold text-surface-200">Avsar</span>
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
