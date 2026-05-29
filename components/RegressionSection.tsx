'use client'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine, ResponsiveContainer,
} from 'recharts'
import { FadeIn } from './ui/FadeIn'
import { SectionHeader } from './ui/SectionHeader'
import { StatCard } from './ui/StatCard'
import { InsightCard } from './ui/InsightCard'
import { linearCoefficients, linearStats, coeffChartData } from '@/lib/data'

function pStar(p: number) {
  if (p < 0.001) return '***'
  if (p < 0.01)  return '**'
  if (p < 0.05)  return '*'
  if (p < 0.1)   return '†'
  return ''
}

const CoeffTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 text-xs">
      <p className="font-semibold text-slate-800 mb-1">{label}</p>
      <p className={payload[0].value >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
        Coefficient: {payload[0].value.toFixed(4)}
      </p>
    </div>
  )
}

export function RegressionSection() {
  return (
    <section id="regression" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Task 1 & 2 — Multiple Linear Regression"
          title="Full Model: 8 Predictors of GDP Growth"
          subtitle="OLS regression fitted on 180 monthly observations. The model explains 93.1% of variance in GDP growth — a strong fit with high overall significance (F = 290.7, p ≈ 2.56×10⁻⁹⁵)."
        />

        {/* Model stats grid */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-14">
            <StatCard label="R²"           value="0.931"       sub="Variance explained"       accent="indigo"  />
            <StatCard label="Adj. R²"      value="0.928"       sub="Penalised for complexity"  accent="indigo"  />
            <StatCard label="F-statistic"  value="290.7"       sub="p ≈ 2.56×10⁻⁹⁵"           accent="emerald" />
            <StatCard label="AIC"          value="225.1"       sub="Information criterion"     accent="amber"   />
            <StatCard label="BIC"          value="253.8"       sub="Bayesian criterion"        accent="amber"   />
            <StatCard label="n"            value="180"         sub="Observations (171 df res)" accent="indigo"  />
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Coefficient table */}
          <FadeIn delay={0.15} className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Coefficient Table</h3>
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
                  {linearCoefficients.map((row, i) => (
                    <tr
                      key={row.variable}
                      className={`border-t border-slate-100 ${
                        row.significant
                          ? i % 2 === 0 ? 'bg-emerald-50/60' : 'bg-emerald-50/40'
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
                        row.direction === 'pos' ? 'text-emerald-700' :
                        row.direction === 'neg' ? 'text-rose-700'    : 'text-slate-500'
                      }`}>
                        {row.coef >= 0 ? '+' : ''}{row.coef.toFixed(4)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-500">{row.stdErr.toFixed(3)}</td>
                      <td className="px-4 py-2.5 text-right font-mono text-slate-600">{row.tStat.toFixed(3)}</td>
                      <td className={`px-4 py-2.5 text-right font-mono font-semibold ${
                        row.pValue < 0.05 ? 'text-emerald-600' : 'text-slate-400'
                      }`}>
                        {row.pValue === 0 ? '< 0.001' : row.pValue.toFixed(3)}
                      </td>
                      <td className="px-4 py-2.5 text-slate-400 text-xs font-mono">{row.ci95}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
                Significance: *** p&lt;0.001 &nbsp;|&nbsp; ** p&lt;0.01 &nbsp;|&nbsp; * p&lt;0.05 &nbsp;|&nbsp; † p&lt;0.1
              </div>
            </div>

            {/* Durbin-Watson note */}
            <p className="mt-3 text-xs text-slate-400">
              Durbin–Watson: {linearStats.durbinWatson} (moderate positive autocorrelation) ·
              Cond. No. {linearStats.condNumber} (potential multicollinearity — handled in Task 3).
            </p>
          </FadeIn>

          {/* Right column: chart + insights */}
          <div className="lg:col-span-2 space-y-8">
            {/* Coefficient chart */}
            <FadeIn delay={0.2}>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Coefficient Magnitudes</h3>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    layout="vertical"
                    data={coeffChartData}
                    margin={{ top: 0, right: 20, bottom: 0, left: 80 }}
                  >
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#94a3b8' }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 10, fill: '#64748b' }}
                      axisLine={false}
                      tickLine={false}
                      width={78}
                    />
                    <Tooltip content={<CoeffTooltip />} />
                    <ReferenceLine x={0} stroke="#e2e8f0" />
                    <Bar dataKey="coef" radius={[0, 4, 4, 0]}>
                      {coeffChartData.map((entry, i) => (
                        <Cell
                          key={i}
                          fill={
                            !entry.sig          ? '#cbd5e1' :
                            entry.coef >= 0     ? '#10b981' : '#f43f5e'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Sig. positive</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" /> Sig. negative</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-slate-300 inline-block" /> Not significant</span>
                </div>
              </div>
            </FadeIn>

            {/* Key insights */}
            <FadeIn delay={0.3}>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Key Interpretations</h3>
              <div className="space-y-3">
                <InsightCard icon="📉" title="Unemployment is the dominant drag" variant="warning">
                  A 1 pp rise in unemployment is associated with a −1.70 pp fall in GDP growth (p &lt; 0.001).
                  This is the most influential predictor in the model.
                </InsightCard>
                <InsightCard icon="💱" title="Exchange rate boosts growth" variant="success">
                  Each unit increase in the exchange rate raises GDP growth by +2.13 pp (p &lt; 0.001),
                  reflecting export-competitiveness gains.
                </InsightCard>
                <InsightCard icon="📊" title="Inflation suppresses output" variant="default">
                  Higher inflation reduces GDP growth (β = −0.52, p = 0.030), consistent with
                  cost-push and demand-reduction mechanisms.
                </InsightCard>
                <InsightCard icon="🚫" title="Imports & Interest Rate not significant" variant="default">
                  Interest rate (p = 0.409) and imports (p = 0.495) do not significantly explain GDP
                  growth variation once other variables are controlled for.
                </InsightCard>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
