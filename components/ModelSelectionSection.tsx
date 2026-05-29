'use client'
import { historicalTimeline } from '@/lib/data'

export function ModelSelectionSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <p className="text-slate-600 text-xs mt-1">{h.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
