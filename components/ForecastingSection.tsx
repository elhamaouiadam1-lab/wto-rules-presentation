'use client'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend,
  ReferenceLine, ResponsiveContainer, Dot,
} from 'recharts'
import { FadeIn } from './ui/FadeIn'
import { SectionHeader } from './ui/SectionHeader'
import { InsightCard } from './ui/InsightCard'
import { forecastingData } from '@/lib/data'

const ForecastTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 text-xs space-y-1">
      <p className="font-semibold text-slate-800 mb-1">2024 — {label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
          <span className="text-slate-600">{p.name}:</span>
          <span className="font-semibold text-slate-800">{p.value?.toFixed(2)}%</span>
        </div>
      ))}
    </div>
  )
}

const errorRows = [
  { method: 'Moving Average (k=3)', mae: '1.24', rmse: '2.31', reaction: 'Slow (3-month lag)', outlier: 'Amplified (+9.45 vs 12.66 actual)', verdict: 'Adequate' },
  { method: 'Exponential Smoothing', mae: '0.87', rmse: '1.54', reaction: 'Proportional (α ≈ 0.26)', outlier: 'Buffered (7.75 in Nov)', verdict: '✓ Preferred' },
]

export function ForecastingSection() {
  return (
    <section id="forecast" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Task 4 — Time Series Forecasting"
          title="Moving Averages vs Exponential Smoothing"
          subtitle="Two time-series methods are applied to 2024 monthly GDP growth data. Exponential smoothing outperforms the 3-period moving average — it reacts proportionally to new information while attenuating the impact of outliers."
        />

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Chart */}
          <FadeIn delay={0.1} className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">2024 Monthly Forecast Comparison</h3>
            <p className="text-sm text-slate-400 mb-4">
              Actual GDP growth vs MA(3) and Exponential Smoothing fitted values.
              Outlier in November 2024 (12.66%) highlighted.
            </p>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={forecastingData} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                    domain={[6, 14]}
                  />
                  <Tooltip content={<ForecastTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                  />
                  <ReferenceLine y={12.66} stroke="#fbbf24" strokeDasharray="4 4" strokeWidth={1} label={{ value: 'Outlier', position: 'right', fontSize: 10, fill: '#f59e0b' }} />

                  {/* Actual */}
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="Actual GDP Growth"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    dot={(props: any) => {
                      const d = forecastingData[props.index]
                      return (
                        <Dot
                          key={props.index}
                          {...props}
                          r={d?.isOutlier ? 7 : 4}
                          fill={d?.isOutlier ? '#f59e0b' : '#6366f1'}
                          stroke="white"
                          strokeWidth={1.5}
                        />
                      )
                    }}
                    activeDot={{ r: 6 }}
                    connectNulls
                  />

                  {/* MA_3 */}
                  <Line
                    type="monotone"
                    dataKey="ma3"
                    name="MA (k=3)"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="6 3"
                    dot={{ r: 3, fill: '#ef4444', stroke: 'white', strokeWidth: 1 }}
                    connectNulls={false}
                  />

                  {/* Exponential Smoothing */}
                  <Line
                    type="monotone"
                    dataKey="exp"
                    name="Exp. Smoothing"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#10b981', stroke: 'white', strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Comparison table */}
            <FadeIn delay={0.2} className="mt-6">
              <h3 className="text-base font-semibold text-slate-800 mb-3">Method Comparison</h3>
              <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm text-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-800 text-white text-left">
                      <th className="px-4 py-3 font-semibold">Method</th>
                      <th className="px-4 py-3 font-semibold text-right">MAE</th>
                      <th className="px-4 py-3 font-semibold text-right">RMSE</th>
                      <th className="px-4 py-3 font-semibold">Reaction</th>
                      <th className="px-4 py-3 font-semibold">Outlier handling</th>
                      <th className="px-4 py-3 font-semibold">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {errorRows.map((r, i) => (
                      <tr key={i} className={`border-t border-slate-100 ${i === 1 ? 'bg-emerald-50/60' : 'bg-white'}`}>
                        <td className="px-4 py-3 font-medium text-slate-800">{r.method}</td>
                        <td className="px-4 py-3 text-right font-mono text-slate-600">{r.mae}</td>
                        <td className="px-4 py-3 text-right font-mono text-slate-600">{r.rmse}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{r.reaction}</td>
                        <td className="px-4 py-3 text-slate-500 text-xs">{r.outlier}</td>
                        <td className={`px-4 py-3 font-semibold text-xs ${i === 1 ? 'text-emerald-700' : 'text-slate-500'}`}>{r.verdict}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </FadeIn>

          {/* Right: insights & trend discussion */}
          <div className="space-y-6">
            <FadeIn delay={0.15}>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Analysis & Conclusion</h3>
              <div className="space-y-3">
                <InsightCard icon="📈" title="Clear upward trend" variant="info">
                  GDP growth rises from ≈3% (2010) to ≈8% (2024), driven by exchange-rate appreciation
                  and falling unemployment. A linear or log-linear trend model fits well.
                </InsightCard>
                <InsightCard icon="🌊" title="Seasonality" variant="default">
                  With monthly data, mild Q4 seasonality is possible (government budget cycles, export
                  peaks) but not dominant in this dataset. The data exhibits stronger cycle-level variation
                  than strict seasonal patterns.
                </InsightCard>
                <InsightCard icon="🧮" title="Trend equation (approx.)" variant="info">
                  A simple OLS trend line gives: <br />
                  <code className="text-xs bg-slate-100 px-1 rounded">Ŷₜ = 2.8 + 0.38·t</code><br />
                  where t = 1 for Jan 2010, confirming ≈0.38 pp/month average growth increase.
                </InsightCard>
                <InsightCard icon="✅" title="Exp. smoothing wins" variant="success">
                  With RMSE = 1.54 vs 2.31, exponential smoothing reduces error by 33%.
                  It adapts to the trend incrementally (α ≈ 0.26) and buffers the November 2024 outlier
                  better than the 3-period MA, which averaged in the shock directly.
                </InsightCard>
                <InsightCard icon="🔮" title="Forecast recommendation" variant="success">
                  For short-term monthly GDP forecasting, <strong>exponential smoothing is preferred</strong>.
                  For longer horizons or structural shifts, a full ARIMA or regression-based
                  time series model should be considered.
                </InsightCard>
              </div>
            </FadeIn>

            {/* Python code snippet */}
            <FadeIn delay={0.35}>
              <div className="rounded-xl bg-slate-900 p-4 text-xs font-mono overflow-x-auto">
                <p className="text-slate-500 mb-2"># Python — SimpleExpSmoothing</p>
                <p className="text-indigo-400">from</p><span className="text-white"> statsmodels.tsa.holtwinters </span>
                <p className="text-indigo-400">import</p><span className="text-white"> SimpleExpSmoothing</span>
                <br /><br />
                <p>
                  <span className="text-emerald-400">model_exp</span>
                  <span className="text-white"> = SimpleExpSmoothing(</span>
                </p>
                <p className="pl-4 text-white">df[<span className="text-amber-300">&apos;gdp_growth&apos;</span>]</p>
                <p><span className="text-white">).fit()</span></p>
                <br />
                <p>
                  <span className="text-white">df[</span>
                  <span className="text-amber-300">&apos;Exp_Smooth&apos;</span>
                  <span className="text-white">] = model_exp.fittedvalues</span>
                </p>
                <br />
                <p className="text-slate-500"># MA(3) rolling window</p>
                <p>
                  <span className="text-white">df[</span>
                  <span className="text-amber-300">&apos;MA_3&apos;</span>
                  <span className="text-white">] = df[</span>
                  <span className="text-amber-300">&apos;gdp_growth&apos;</span>
                  <span className="text-white">].rolling(</span>
                  <span className="text-orange-400">3</span>
                  <span className="text-white">).mean()</span>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
