'use client';

import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-gradient-to-br from-brand-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <span className="text-white font-bold text-3xl">A</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-display text-2xl font-bold text-surface-900 mb-2">Avsar</h2>
          <div className="flex items-center justify-center gap-1">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-brand-500 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-brand-500 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-brand-500 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
