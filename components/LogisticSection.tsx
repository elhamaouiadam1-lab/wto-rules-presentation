'use client'
import { FadeIn } from './ui/FadeIn'
import { SectionHeader } from './ui/SectionHeader'
import { StatCard } from './ui/StatCard'
import { InsightCard } from './ui/InsightCard'
import { logisticCoefficients, logisticStats } from '@/lib/data'

function pStar(p: number) {
  if (p < 0.001) return '***'
  if (p < 0.01)  return '**'
  if (p < 0.05)  return '*'
  return ''
}

export function LogisticSection() {
  return (
    <section id="logistic" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Task 2 — Logistic Regression"
          title="Predicting Above-Average Growth: Binary Classification"
          subtitle="The dependent variable is binarised: 1 if GDP growth exceeds the sample mean, 0 otherwise. Maximum Likelihood Estimation (Logit) achieves a McFadden pseudo-R² of 0.856 — indicating near-perfect discriminant power."
        />

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-14">
            <StatCard label="McFadden Pseudo-R²" value="0.856"       sub="Near-perfect fit"         accent="emerald" />
            <StatCard label="Log-Likelihood"      value="−17.01"      sub="vs Null: −118.29"        accent="indigo"  />
            <StatCard label="LLR p-value"         value="1.84×10⁻³⁹" sub="Highly significant"       accent="emerald" />
            <StatCard label="Observations"        value="180"         sub="Binary outcome variable"  accent="indigo"  />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Table */}
          <FadeIn delay={0.15} className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Logit Coefficient Table</h3>
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm text-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-800 text-white text-left">
                    <th className="px-4 py-3 font-semibold">Variable</th>
                    <th className="px-4 py-3 font-semibold text-right">Coef.</th>
                    <th className="px-4 py-3 font-semibold text-right">Std. Err</th>
                    <th className="px-4 py-3 font-semibold text-right">z-stat</th>
                    <th className="px-4 py-3 font-semibold text-right">P-value</th>
                  </tr>
                </thead>
                <tbody>
                  {logisticCoefficients.map((row, i) => (
                    <tr
                      key={row.variable}
                      className={`border-t border-slate-100 ${
                        row.significant
                          ? i % 2 === 0 ? 'bg-emerald-50/60' : 'bg-emerald-50/30'
                          : i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                      }`}
                    >
                      <td className="px-4 py-2.5 font-medium text-slate-800">
                        {row.variable}
                        {row.significant && (
                          <span className="ml-1 text-emerald-600 font-bold text-xs">{pStar(row.pValue)}</span>
                        )}
                      </td>
                      <td className={`px-4 py-2.5 text-right font-mono font-semibold ${
                        row.coef >= 0 ? 'text-emerald-700' : 'text-rose-700'
                      }`}>
                        {row.coef >= 0 ? '+' : ''}{row.coef.toFixed(3)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-500">{row.stdErr.toFixed(3)}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-600">{row.zStat.toFixed(3)}</td>
                      <td className={`px-4 py-2.5 text-right font-mono font-semibold ${
                        row.pValue < 0.05 ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        {row.pValue < 0.001 ? '< 0.001' : row.pValue.toFixed(3)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
                Significance: *** p&lt;0.001 &nbsp;|&nbsp; ** p&lt;0.01 &nbsp;|&nbsp; * p&lt;0.05
              </div>
            </div>

            {/* Quasi-separation note */}
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
              <strong>Note on quasi-separation:</strong> statsmodels warns that ≈38% of observations are perfectly predictable.
              This is consistent with the outlier structure in the dataset (crisis episodes cluster cleanly in the binary target).
              Coefficients remain interpretable as directional signals.
            </div>
          </FadeIn>

          {/* Insights + binary explanation */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.2}>
              {/* Binary outcome box */}
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5 mb-6">
                <h4 className="font-semibold text-indigo-800 mb-3 text-sm">Binary Outcome Definition</h4>
                <div className="space-y-2 text-sm text-indigo-700">
                  <div className="flex items-center gap-3 rounded-lg bg-white border border-indigo-200 px-3 py-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
                    <span>GDP growth <strong>above</strong> sample mean (~5.1%)</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-white border border-indigo-200 px-3 py-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center flex-shrink-0">0</span>
                    <span>GDP growth <strong>below</strong> sample mean</span>
                  </div>
                </div>
                <p className="text-xs text-indigo-600 mt-3 leading-relaxed">
                  This binary framing converts the regression problem into a policy-relevant question:
                  "What economic conditions predict periods of above-average growth?"
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Findings</h3>
              <div className="space-y-3">
                <InsightCard icon="🔥" title="7 of 8 predictors are significant" variant="success">
                  Only inflation (p = 0.305) and imports (p = 0.548) fail to reach significance.
                  All other variables classify high-growth periods reliably.
                </InsightCard>
                <InsightCard icon="📉" title="Unemployment: strongest negative classifier" variant="warning">
                  β = −10.99 (p = 0.002). High unemployment dramatically lowers the log-odds of
                  above-average GDP growth.
                </InsightCard>
                <InsightCard icon="💹" title="Exchange rate: strongest positive classifier" variant="success">
                  β = +12.78 (p = 0.033). A favourable exchange rate strongly predicts periods of
                  above-average growth, likely via export competitiveness.
                </InsightCard>
                <InsightCard icon="🎯" title="Model comparison with OLS" variant="info">
                  Both MLR (R² = 0.931) and Logit (Pseudo-R² = 0.856) agree on the same core drivers,
                  validating the choice of predictors across model families.
                </InsightCard>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
