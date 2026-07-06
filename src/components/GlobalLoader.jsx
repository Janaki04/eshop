import React from 'react';
import { useGlobalLoading } from '../components/LoadingContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function GlobalLoader() {
  const { isLoading } = useGlobalLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/70 dark:bg-slate-950/70 backdrop-blur-md"
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Smooth animated spinner wheel */}
            <Loader2 className="h-10 w-10 animate-spin text-[#1600A0] dark:text-purple-400 stroke-[2.5]" />
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
              Loading Essentials...
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}