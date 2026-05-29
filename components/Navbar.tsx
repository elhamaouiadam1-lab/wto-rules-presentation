'use client'
import { useState, useEffect } from 'react'
import { ScriptLogo } from './ScriptLogo'

const links = [
  { label: 'Dataset',    href: '#dataset'    },
  { label: 'Task 1–2',   href: '#regression' },
  { label: 'Logistic',   href: '#logistic'   },
  { label: 'Task 3',     href: '#model'      },
  { label: 'Task 4',     href: '#forecast'   },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand */}
        <a href="#hero" className="flex min-w-0 max-w-[calc(100vw-5.5rem)] items-center gap-2 md:max-w-none">
  <ScriptLogo />
  <span className={`truncate font-semibold text-sm ${scrolled ? 'text-slate-900' : 'text-white'}`}>
    What Drives GDP Growth?
  </span>
</a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-50 hover:text-indigo-700 ${
                scrolled ? 'text-slate-600' : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 mb-1 transition-all ${scrolled ? 'bg-slate-700' : 'bg-white'}`} />
          <span className={`block w-5 h-0.5 mb-1 transition-all ${scrolled ? 'bg-slate-700' : 'bg-white'}`} />
          <span className={`block w-5 h-0.5 transition-all ${scrolled ? 'bg-slate-700' : 'bg-white'}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
