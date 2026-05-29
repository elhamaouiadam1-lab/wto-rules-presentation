"use client";

import { motion } from "framer-motion";
import { 
  wtoOverviewStats, 
  corePrinciples, 
  historicalTimeline, 
  keyAgreements, 
  disputeResolutionSteps, 
  landmarkCases, 
  modernChallenges 
} from "@/lib/data";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[60svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 py-24 text-center">
        <div 
          className="absolute inset-0 opacity-5" 
          style={{ 
            backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/40 bg-brand-500/10 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            International Trade Group Presentation
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
          >
            WTO Rules &amp; Principles
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }} 
            className="text-lg text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The global organisation that makes the rules for trade between countries[cite: 7].
          </motion.p>
          
          {/* Stats Cards Embedded */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {wtoOverviewStats.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-6 py-4">
                <p className="text-3xl font-bold text-brand-400">{s.value}</p>
                <p className="text-xs font-medium text-slate-300 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Core Rules Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b pb-4">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Core Framework</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">The Core Rule: No Favourites</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {corePrinciples.map((p, idx) => (
            <div key={idx} className="bg-brand-50/60 p-8 rounded-2xl border border-brand-100">
              <h3 className="text-xl font-bold text-brand-900 mb-2">{p.title}</h3>
              <p className="text-slate-700 text-sm mb-4 leading-relaxed">{p.description}</p>
              <div className="bg-white p-4 rounded-xl text-xs text-slate-500 border border-brand-100 leading-relaxed">
                <strong>Application:</strong> {p.example}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Three Foundational Pillars */}
        <div className="mb-8">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Structure</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">Three Key Agreements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {keyAgreements.map((a, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 hover:border-brand-500 transition-colors shadow-sm">
              <span className="text-xs font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">{a.acronym}</span>
              <h4 className="text-lg font-bold text-slate-900 mt-2 mb-1">{a.name}</h4>
              <p className="text-xs font-semibold text-brand-500 mb-3">{a.scope}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{a.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Dispute Settlement Mechanism */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Legal Mechanism</span>
            <h2 className="text-3xl font-bold mt-1">How Disputes Are Settled</h2>
            <p className="text-slate-400 text-sm mt-2">A unique binding legal process for fair rulings instead of trade wars[cite: 7].</p>
          </div>
          <div className="space-y-4">
            {disputeResolutionSteps.map((s, idx) => (
              <div key={idx} className="flex gap-4 items-center border-b border-slate-800 pb-4 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center font-bold text-sm flex-shrink-0 text-white">
                  {s.step}
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-sm text-brand-100">{s.action}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{s.description}</p>
                </div>
                <div className="text-brand-300 font-mono text-xs bg-slate-800 px-3 py-1 rounded-full flex-shrink-0">
                  {s.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Timeline History Map */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Historical Milestones</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">A Short History of Global Trade</h2>
        </div>
        <div className="border-l-2 border-brand-200 ml-4 space-y-8">
          {historicalTimeline.map((h, idx) => (
            <div key={idx} className="relative pl-6">
              <div className="absolute w-3 h-3 bg-brand-600 rounded-full -left-[7px] top-1.5 border-4 border-slate-50" />
              <span className="font-mono font-bold text-brand-600 text-sm">{h.year}</span>
              <h4 className="font-bold text-slate-900 text-base">{h.event}</h4>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">{h.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Cases & Challenges Panels */}
      <section className="py-20 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">The WTO in Action (Case Studies)</h3>
            <div className="space-y-4">
              {landmarkCases.map((c, idx) => (
                <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">{c.subject}</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">{c.title}</h4>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed">{c.verdict}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Problems &amp; Systemic Challenges</h3>
            <div className="space-y-4">
              {modernChallenges.map((m, idx) => (
                <div key={idx} className="bg-red-50/40 p-5 rounded-xl border border-red-100">
                  <h4 className="font-bold text-red-900 text-sm">{m.issue}</h4>
                  <p className="text-red-800 text-xs mt-1"><strong>Problem:</strong> {m.problem}</p>
                  <p className="text-green-800 bg-white p-3 rounded-lg border border-green-100 text-xs mt-3 shadow-xs">
                    <strong>Systemic Response:</strong> {m.response}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>International Trade Framework Analysis &mdash; WTO Presentation Site</p>
          <p className="text-slate-500">Built with Next.js &bull; Tailwind CSS &bull; Framer Motion[cite: 2, 4]</p>
        </div>
      </footer>

    </main>
  );
}
