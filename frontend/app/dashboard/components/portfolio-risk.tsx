'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Wallet, Shield, AlertTriangle, RefreshCcw } from "lucide-react"

const ALLOCATION = [
  { name: 'Equities', value: 45, color: '#3b82f6' },
  { name: 'Fixed Income', value: 30, color: '#10b981' },
  { name: 'Commodities', value: 10, color: '#f59e0b' },
  { name: 'Cash', value: 15, color: '#64748b' },
]

export function PortfolioRisk() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-50 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-500" /> Portfolio Risk & Exposure
        </h2>
        <Button size="sm" variant="outline" className="bg-slate-900 border-slate-700">
          <RefreshCcw className="h-4 w-4 mr-2" /> Rebalance
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-950 border-slate-800 text-slate-50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ALLOCATION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ALLOCATION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {ALLOCATION.map(item => (
                <div key={item.name} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800 text-slate-50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Risk Metrics (VaR)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Value at Risk (95% / 1D)</span>
                <span className="font-mono text-rose-400">-$2.4M</span>
              </div>
              <Progress value={45} className="h-1 bg-slate-800" indicatorClassName="bg-rose-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Sharpe Ratio</span>
                <span className="font-mono text-emerald-400">1.84</span>
              </div>
              <Progress value={75} className="h-1 bg-slate-800" indicatorClassName="bg-emerald-500" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Volatility (Annualized)</span>
                <span className="font-mono text-amber-400">14.2%</span>
              </div>
              <Progress value={35} className="h-1 bg-slate-800" indicatorClassName="bg-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800 text-slate-50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> Compliance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-2 bg-rose-900/10 border border-rose-900/30 rounded text-[10px]">
              <div className="font-bold text-rose-400">REGULATORY BREACH</div>
              <p className="text-slate-400 mt-1">Concentration limit exceeded for 'Tech' sector (Max 25%, Current 28.5%).</p>
            </div>
            <div className="p-2 bg-slate-900 border border-slate-800 rounded text-[10px]">
              <div className="font-bold text-slate-200">KYC RENEWAL</div>
              <p className="text-slate-400 mt-1">Entity 'Global Partners Ltd' requires KYC update in 14 days.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
