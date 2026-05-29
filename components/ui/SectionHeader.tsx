'use client'
import { FadeIn } from './FadeIn'

interface SectionHeaderProps {
  badge: string
  title: string
  subtitle: string
  light?: boolean
}

export function SectionHeader({ badge, title, subtitle, light = false }: SectionHeaderProps) {
  return (
    <FadeIn className="mb-12">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-indigo-100 text-indigo-700 mb-4">
        {badge}
      </span>
      <h2 className={`text-3xl font-bold mb-3 ${light ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h2>
      <p className={`text-base max-w-2xl leading-relaxed ${light ? 'text-slate-300' : 'text-slate-500'}`}>
        {subtitle}
      </p>
    </FadeIn>
  )
}
