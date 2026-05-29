'use client'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { FadeIn } from './ui/FadeIn'
import { SectionHeader } from './ui/SectionHeader'
import { gdpTrendData } from '@/lib/data'

const variables = [
  { name: 'GDP Growth (%)',        role: 'Dependent',    desc: 'Annual % change in real GDP — the target variable.' },
  { name: 'Interest Rate (%)',     role: 'Predictor',    desc: 'Central bank benchmark rate influencing borrowing costs.' },
  { name: 'Inflation (%)',         role: 'Predictor',    desc: 'CPI-based price level change; excessive inflation suppresses growth.' },
  { name: 'Unemployment (%)',      role: 'Predictor',    desc: 'Share of the labour force without jobs; strong inverse relationship with GDP.' },
  { name: 'Exports (index)',       role: 'Predictor',    desc: 'Volume of goods and services sold abroad.' },
  { name: 'Imports (index)',       role: 'Predictor',    desc: 'Volume of goods and services purchased from abroad.' },
  { name: 'Exchange Rate',         role: 'Predictor',    desc: 'Domestic currency per unit foreign currency; competitiveness proxy.' },
  { name: 'Gov. Spending (index)', role: 'Predictor',    desc: 'Government expenditure as a stimulus or drag on output.' },
  { name: 'Investment (index)',    role: 'Predictor',    desc: 'Fixed capital formation — key driver of productive capacity.' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  const isOutlier = gdpTrendData.find((d) => d.year === label && (d as any).outlier)
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-md px-3 py-2 text-sm">
      <p className="font-semibold text-slate-800">{label}</p>
      <p className="text-indigo-600">{payload[0].value.toFixed(2)}%</p>
      {isOutlier && <p className="text-amber-600 text-xs mt-0.5">⚠ Outlier detected</p>}
    </div>
  )
}

export function DatasetOverview() {
  return (
    <section id="dataset" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Dataset Overview"
          title="180 Monthly Observations, 2010–2024"
          subtitle="Country-level macroeconomic panel data spanning 15 years, capturing business cycles, external shocks, and structural trends across nine economic indicators."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Variables table */}
          <FadeIn delay={0.1}>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Variable Dictionary</h3>
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Variable</th>
                    <th className="px-4 py-3 text-left font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {variables.map((v, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3">
                        <p className={`font-medium ${v.role === 'Dependent' ? 'text-indigo-700' : 'text-slate-800'}`}>
                          {v.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{v.desc}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                          v.role === 'Dependent'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {v.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Data notes */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
                <p className="font-semibold mb-1">⚠ Structured Outliers</p>
                The dataset contains realistic economic-shock outliers (e.g., crisis episodes in 2019, 2022, 2023, 2024) that test model robustness.
              </div>
              <div className="rounded-lg bg-indigo-50 border border-indigo-200 px-4 py-3 text-xs text-indigo-800">
                <p className="font-semibold mb-1">📅 Frequency</p>
                Monthly observations — January 2010 through December 2024. Sorted chronologically prior to all analyses.
              </div>
            </div>
          </FadeIn>

          {/* GDP Trend chart */}
          <FadeIn delay={0.25}>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">GDP Growth Trend (Dec snapshot, annual)</h3>
            <p className="text-sm text-slate-400 mb-6">Upward structural trend punctuated by outlier years.</p>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={gdpTrendData} margin={{ top: 8, right: 16, bottom: 0, left: -10 }}>
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={5} stroke="#e2e8f0" strokeDasharray="4 4" />
                  <Line
                    type="monotone"
                    dataKey="gdp"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    dot={(props: any) => {
                      const isOut = gdpTrendData[props.index]?.outlier
                      return (
                        <circle
                          key={props.index}
                          cx={props.cx}
                          cy={props.cy}
                          r={isOut ? 6 : 4}
                          fill={isOut ? '#f59e0b' : '#6366f1'}
                          stroke="white"
                          strokeWidth={2}
                        />
                      )
                    }}
                    activeDot={{ r: 6, fill: '#4f46e5' }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="flex items-center gap-6 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block" /> GDP Growth (%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Outlier year
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 px-5 py-4 text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-800">Observation:</strong> GDP growth exhibits a clear upward trend from ≈3% (2010) to ≈8% (2024),
              interrupted by structured outlier spikes (2023-12: 12.67%, 2024-11: 12.66%). These outliers represent
              economic-shock episodes and are absorbed by the regression model's robustness.
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
