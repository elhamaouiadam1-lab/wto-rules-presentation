'use client'
import { corePrinciples, keyAgreements } from '@/lib/data'

export function RegressionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Core Framework</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">The Core Rules: No Favourites</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {corePrinciples.map((p, idx) => (
            <div key={idx} className="bg-brand-50/50 p-8 rounded-2xl border border-brand-100">
              <h3 className="text-xl font-bold text-brand-900 mb-2">{p.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{p.description}</p>
              <div className="bg-white p-4 rounded-xl text-xs text-slate-500 border border-brand-100">
                <strong>Application:</strong> {p.example}
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-6">Three Foundational Pillars</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {keyAgreements.map((a, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <span className="text-xs font-mono font-bold text-brand-600">{a.acronym}</span>
              <h4 className="text-lg font-bold text-slate-900 mb-1">{a.name}</h4>
              <p className="text-xs font-semibold text-brand-500 mb-3">{a.scope}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{a.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
