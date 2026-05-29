'use client'
import { disputeResolutionSteps } from '@/lib/data'

export function LogisticSection() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">Legal Mechanism</span>
          <h2 className="text-3xl font-bold mt-1">How Disputes Are Settled</h2>
          <p className="text-slate-400 text-sm mt-2">A unique binding legal framework running predictably across timelines.</p>
        </div>
        <div className="space-y-4">
          {disputeResolutionSteps.map((s, idx) => (
            <div key={idx} className="flex gap-4 items-center border-b border-slate-800 pb-4 last:border-0">
              <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center font-bold text-sm flex-shrink-0">{s.step}</div>
              <div className="flex-grow">
                <h4 className="font-semibold text-sm text-brand-100">{s.action}</h4>
                <p className="text-slate-400 text-xs">{s.description}</p>
              </div>
              <div className="text-brand-300 font-mono text-xs bg-slate-800 px-3 py-1 rounded-full flex-shrink-0">{s.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
