'use client'
import { landmarkCases, modernChallenges } from '@/lib/data'

export function ForecastingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-6">The WTO in Action (Case Studies)</h3>
          <div className="space-y-4">
            {landmarkCases.map((c, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-brand-600 uppercase">{c.subject}</span>
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
              <div key={idx} className="bg-red-50/50 p-5 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-900 text-sm">{m.issue}</h4>
                <p className="text-red-800 text-xs mt-1"><strong>Problem:</strong> {m.problem}</p>
                <p className="text-green-800 bg-white p-3 rounded-lg border border-green-100 text-xs mt-3">
                  <strong>Systemic Response:</strong> {m.response}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
