'use client'
import { FadeIn } from './ui/FadeIn'
import { SectionHeader } from './ui/SectionHeader'
import { StatCard } from './ui/StatCard'
import { InsightCard } from './ui/InsightCard'
import { bestSubsetCoefficients, bestSubsetStats, modelSelectionSummary } from '@/lib/data'

const ALL_VARS = ['Inflation', 'Unemployment', 'Exports', 'Exchange Rate', 'Gov. Spending', 'Investment', 'Interest Rate', 'Imports']

function pStar(p: number) {
  if (p < 0.001) return '***'
  if (p < 0.01)  return '**'
  if (p < 0.05)  return '*'
  return ''
}

export function ModelSelectionSection() {
  return (
    <section id="model" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Task 3 — Model Building"
          title="All Three Methods Converge on the Same 6 Variables"
          subtitle="Backward elimination, forward selection, and best-subset search independently identify the same optimal model — strong convergent validity. Interest Rate and Imports are consistently excluded."
        />

        {/* Method comparison cards */}
        <FadeIn delay={0.1}>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {modelSelectionSummary.map((m, idx) => (
              <div key={idx} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-slate-800 px-5 py-4">
                  <h3 className="text-white font-semibold text-sm">{m.method}</h3>
                  <p className="text-slate-400 text-xs mt-1">{m.description}</p>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Selected ({m.selected.length})</p>
                  <ul className="space-y-1 mb-4">
                    {ALL_VARS.map((v) => {
                      const selected = m.selected.includes(v)
                      return (
                        <li key={v} className="flex items-center gap-2 text-sm">
                          {selected ? (
                            <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span className={selected ? 'text-slate-800 font-medium' : 'text-slate-400'}>{v}</span>
                        </li>
                      )
                    })}
                  </ul>
                  {m.removed.length > 0 && (
                    <p className="text-xs text-rose-500">
                      Removed: {m.removed.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Final model */}
        <div className="grid lg:grid-cols-5 gap-12">
          <FadeIn delay={0.2} className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Final Model Coefficients
              <span className="ml-2 text-sm font-normal text-indigo-600">(Best Subset — 6 predictors)</span>
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Every remaining variable is statistically significant at α = 0.05.
              Adjusted R² improves from 0.928 (8-var) to 0.929 despite fewer parameters.
            </p>

            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm text-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800 text-white text-left">
                    <th className="px-4 py-3 font-semibold">Variable</th>
                    <th className="px-4 py-3 font-semibold text-right">Coef.</th>
                    <th className="px-4 py-3 font-semibold text-right">Std. Err</th>
                    <th className="px-4 py-3 font-semibold text-right">t-stat</th>
                    <th className="px-4 py-3 font-semibold text-right">P-value</th>
                    <th className="px-4 py-3 font-semibold">95% CI</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSubsetCoefficients.map((row, i) => (
                    <tr key={row.variable} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-emerald-50/50' : 'bg-emerald-50/20'}`}>
                      <td className="px-4 py-2.5 font-medium text-slate-800">
                        {row.variable}
                        <span className="ml-1 text-emerald-600 font-bold text-xs">{pStar(row.pValue)}</span>
                      </td>
                      <td className={`px-4 py-2.5 text-right font-mono font-semibold ${
                        row.direction === 'pos' ? 'text-emerald-700' : 'text-rose-700'
                      }`}>
                        {row.coef >= 0 ? '+' : ''}{row.coef.toFixed(4)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-500">{row.stdErr.toFixed(3)}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-600">{row.tStat.toFixed(3)}</td>
                      <td className={`px-4 py-2.5 text-right font-mono font-semibold ${
                        row.pValue < 0.001 ? 'text-emerald-500' : 'text-emerald-600'
                      }`}>
                        {row.pValue < 0.001 ? '< 0.001' : row.pValue.toFixed(3)}
                      </td>
                      <td className="px-4 py-2.5 text-slate-400 text-xs font-mono">{row.ci95}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
                All 6 predictors significant at p &lt; 0.05. No multicollinearity-driven removals needed.
              </div>
            </div>
          </FadeIn>

          {/* Right column: model stats + insights */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.25}>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Final Model Statistics</h3>
              <div className="grid grid-cols-2 gap-3">
                <StatCard label="R²"           value="0.931" sub="Same as full model"   accent="indigo"  />
                <StatCard label="Adj. R²"       value="0.929" sub="↑ from 0.928"        accent="emerald" />
                <StatCard label="F-statistic"   value="388.8" sub="↑ from 290.7"        accent="emerald" />
                <StatCard label="AIC"           value="222.5" sub="↓ from 225.1 (better)" accent="emerald" />
                <StatCard label="BIC"           value="244.9" sub="↓ from 253.8 (better)" accent="emerald" />
                <StatCard label="Df Residuals"  value="173"   sub="2 extra df recovered" accent="indigo"  />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="space-y-3">
                <InsightCard icon="✅" title="Convergent validity across 3 methods" variant="success">
                  All three model-selection algorithms agree on the same 6 variables —
                  this consensus is strong evidence the final model is robust.
                </InsightCard>
                <InsightCard icon="⚡" title="Parsimony improves F-statistic" variant="info">
                  Removing 2 noise variables raises F from 290.7 to 388.8, confirming the excluded
                  variables (Interest Rate, Imports) were adding variance without explanatory value.
                </InsightCard>
                <InsightCard icon="📐" title="Lower AIC / BIC confirms model quality" variant="info">
                  Both information criteria decrease with the 6-variable model, balancing goodness-of-fit
                  against model complexity. The final equation is:
                </InsightCard>
              </div>

              {/* Model equation */}
              <div className="mt-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs p-4 leading-relaxed overflow-x-auto">
                <span className="text-slate-400">GDP_growth = </span>−2.232<br />
                <span className="text-slate-400">  − 0.590 × </span>Inflation<br />
                <span className="text-slate-400">  − 1.681 × </span>Unemployment<br />
                <span className="text-slate-400">  − 0.030 × </span>Exports<br />
                <span className="text-slate-400">  + 2.282 × </span>ExchangeRate<br />
                <span className="text-slate-400">  + 0.042 × </span>Gov_Spending<br />
                <span className="text-slate-400">  + 0.023 × </span>Investment
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
