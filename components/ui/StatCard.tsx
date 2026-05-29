'use client'

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  accent?: 'indigo' | 'emerald' | 'amber' | 'rose'
}

const accents = {
  indigo:  'border-indigo-400  bg-indigo-50  text-indigo-700',
  emerald: 'border-emerald-400 bg-emerald-50 text-emerald-700',
  amber:   'border-amber-400   bg-amber-50   text-amber-700',
  rose:    'border-rose-400    bg-rose-50    text-rose-700',
}

export function StatCard({ label, value, sub, accent = 'indigo' }: StatCardProps) {
  return (
    <div className={`rounded-xl border-l-4 p-5 shadow-sm ${accents[accent]}`}>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs mt-1 opacity-60">{sub}</p>}
    </div>
  )
}
