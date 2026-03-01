'use client';

import { motion, Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      when: 'beforeChildren',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

export const staggerContainer: Variants = {
  enter: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen"
    >
      <motion.div variants={staggerContainer} initial="initial" animate="enter" exit="exit">
        {children}
      </motion.div>
    </motion.div>
  );
}

export function AnimatedCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        enter: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            delay,
            ease: 'easeOut',
          },
        },
      }}
      initial="initial"
      animate="enter"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedList({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="enter"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        enter: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            delay,
            ease: 'easeOut',
          },
        },
      }}
      initial="initial"
      animate="enter"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ children, className = '', onClick, disabled, type = 'button' }: { children: React.ReactNode; className?: string; onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {children}
    </motion.button>
  );
}

// Loading skeleton component
export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`bg-surface-200 rounded ${className}`}
    />
  );
}

// Fade in animation
export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

// Slide in animation
export function SlideIn({ children, direction = 'left', delay = 0 }: { children: React.ReactNode; direction?: 'left' | 'right' | 'up' | 'down'; delay?: number }) {
  const directions = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    up: { x: 0, y: -50 },
    down: { x: 0, y: 50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Scale animation
export function ScaleIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
