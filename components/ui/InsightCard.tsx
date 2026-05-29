'use client'
import { ReactNode } from 'react'

interface InsightCardProps {
  icon: string
  title: string
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'info'
}

const variants = {
  default: 'bg-slate-50  border-slate-200  text-slate-700',
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  warning: 'bg-amber-50  border-amber-200  text-amber-800',
  info:    'bg-indigo-50 border-indigo-200 text-indigo-800',
}

export function InsightCard({ icon, title, children, variant = 'default' }: InsightCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${variants[variant]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
        <div>
          <p className="font-semibold text-sm mb-1">{title}</p>
          <p className="text-sm leading-relaxed opacity-90">{children}</p>
        </div>
      </div>
    </div>
  )
}
