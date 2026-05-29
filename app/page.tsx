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
    <main className="min-h-screen p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-5xl font-extrabold tracking-tight text-brand-900 mb-4">
          WTO Rules & Principles
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          The global organisation that makes the rules for trade between countries.
        </p>
      </motion.header>

      {/* Stats Overview */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        {wtoOverviewStats.map((stat, idx) => (
          <motion.div key={idx} variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center">
            <h3 className="text-4xl font-bold text-brand-600 mb-2">{stat.value}</h3>
            <p className="font-semibold text-slate-900">{stat.label}</p>
            <p className="text-sm text-slate-500 mt-2">{stat.description}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Core Principles */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">The Core Rule: No Favourites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {corePrinciples.map((principle, idx) => (
            <div key={idx} className="bg-brand-50 p-8 rounded-2xl border border-brand-100">
              <h3 className="text-2xl font-bold text-brand-900 mb-3">{principle.title}</h3>
              <p className="text-slate-700 mb-4">{principle.description}</p>
              <div className="bg-white p-4 rounded-lg text-sm text-slate-600 border border-brand-100">
                <strong>Example:</strong> {principle.example}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Agreements */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">Three Key Agreements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keyAgreements.map((agreement, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-brand-500 transition-colors">
              <div className="text-brand-600 font-mono font-bold mb-2">{agreement.acronym}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{agreement.name}</h3>
              <p className="text-sm font-medium text-brand-500 mb-4">{agreement.scope}</p>
              <p className="text-slate-600 text-sm">{agreement.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dispute Resolution Steps */}
      <section className="mb-16 bg-slate-900 text-white p-8 md:p-12 rounded-3xl">
        <h2 className="text-3xl font-bold mb-8 text-brand-50">How Disputes Are Settled</h2>
        <div className="space-y-6">
          {disputeResolutionSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-center border-b border-slate-700 pb-6 last:border-0 last:pb-0">
              <div className="flex-shrink-0 bg-brand-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                {step.step}
              </div>
              <div className="flex-grow">
                <h4 className="text-xl font-semibold text-brand-100">{step.action}</h4>
                <p className="text-slate-400 text-sm mt-1">{step.description}</p>
              </div>
              <div className="flex-shrink-0 text-brand-300 font-mono text-sm bg-slate-800 px-3 py-1 rounded-full">
                {step.duration}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Landmark Cases & Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Cases */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">The WTO in Action</h2>
          <div className="space-y-4">
            {landmarkCases.map((caseItem, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{caseItem.subject}</span>
                <h4 className="text-lg font-bold text-slate-900 mt-1 mb-2">{caseItem.title}</h4>
                <p className="text-sm text-slate-600">{caseItem.verdict}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Problems & Future</h2>
          <div className="space-y-4">
            {modernChallenges.map((challenge, idx) => (
              <div key={idx} className="bg-red-50 p-5 rounded-xl border border-red-100">
                <h4 className="text-lg font-bold text-red-900 mb-2">{challenge.issue}</h4>
                <p className="text-sm text-red-800 mb-3"><strong>Problem:</strong> {challenge.problem}</p>
                <p className="text-sm text-green-800 bg-green-50 p-3 rounded-lg border border-green-100">
                  <strong>Response:</strong> {challenge.response}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}