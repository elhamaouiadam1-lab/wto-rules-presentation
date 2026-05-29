'use client'
import { motion } from 'framer-motion'
import { wtoOverviewStats } from '@/lib/data'

export function HeroSection() {
  return (
    <section className="relative min-h-[60svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 py-24 text-center">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/40 bg-brand-500/10 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6">
          International Trade Group Presentation
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          WTO Rules &amp; Principles
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
          The global organisation that makes the rules for trade between countries, ensuring transparency and fairness across borders.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {wtoOverviewStats.map((s, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-4">
              <p className="text-3xl font-bold text-brand-400">{s.value}</p>
              <p className="text-xs font-medium text-slate-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
