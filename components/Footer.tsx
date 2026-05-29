'use client'
import { FadeIn } from './ui/FadeIn'
import { ScriptLogo } from './ScriptLogo'

const tasks = [
  { tag: 'Task 1',  label: 'Multiple Linear Regression',           pts: 25, ch: 'Ch. 14–15' },
  { tag: 'Task 2',  label: 'Linear & Logistic Regression (Python)', pts: 25, ch: 'Ch. 15'   },
  { tag: 'Task 3',  label: 'Model Building & Variable Selection',   pts: 25, ch: 'Ch. 16'   },
  { tag: 'Task 4',  label: 'Time Series Forecasting',              pts: 25, ch: 'Ch. 17'   },
]

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FadeIn>
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Project info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ScriptLogo />
                <span className="text-white font-semibold">What Drives GDP Growth?</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Econometrics Case Study 2 — Regression & Forecasting.<br />
                Applied to a 180-observation country-level macroeconomic dataset (2010–2024).
              </p>
              <p className="text-xs text-slate-500 mt-4">
                Tools used: Python · statsmodels · pandas · NumPy · Excel
              </p>
            </div>

            {/* Tasks summary */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Assessment Structure</h4>
              <ul className="space-y-2">
                {tasks.map((t) => (
                  <li key={t.tag} className="flex items-start gap-3 text-sm">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-indigo-900 text-indigo-300 text-xs font-semibold flex-shrink-0 mt-0.5">
                      {t.tag}
                    </span>
                    <span className="text-slate-400">
                      {t.label}
                      <span className="text-slate-600 ml-2 text-xs">({t.ch} · {t.pts} pts)</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key results */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Key Results Summary</h4>
              <dl className="space-y-2 text-sm">
                {[
                  ['Full model R²',       '0.931 (Adj. 0.928)'],
                  ['Final model Adj. R²', '0.929 — 6 variables'],
                  ['Logistic Pseudo-R²',  '0.856'],
                  ['Dominant predictor',  'Unemployment (β = −1.70)'],
                  ['Best forecaster',     'Exponential Smoothing'],
                  ['Exp. Smoothing RMSE', '1.54 vs MA: 2.31'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-slate-800 pb-1.5">
                    <dt className="text-slate-500">{k}</dt>
                    <dd className="text-slate-300 font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              GBU 3311 · By Adam Elhamaoui & Taha Hamdoun · Case Study 2 — Regression & Forecasting
            </p>
            <p>
              Built with Next.js · Tailwind CSS · Recharts · Framer Motion
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}
