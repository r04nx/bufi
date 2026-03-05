'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { TrendingUp, Users, Target, BarChart3, Calculator } from "lucide-react"

const COMPARABLES = [
  { company: "TechFlow", ev_rev: "12.4x", ev_ebitda: "24.5x", margin: "22%" },
  { company: "CloudNet", ev_rev: "10.8x", ev_ebitda: "21.2x", margin: "19%" },
  { company: "DataSync", ev_rev: "14.1x", ev_ebitda: "28.4x", margin: "25%" },
]

export function ValuationTools() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-50">Valuation & Analysis Engine</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-slate-900 border-slate-700">
            <Calculator className="h-4 w-4 mr-2" /> Run DCF Model
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white border-none">
            Generate Valuation Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-slate-950 border-slate-800 text-slate-50 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" /> Projected Cash Flows (5Y)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { year: '2024E', fcf: 120 },
                { year: '2025E', fcf: 145 },
                { year: '2026E', fcf: 180 },
                { year: '2027E', fcf: 215 },
                { year: '2028E', fcf: 260 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="year" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b' }}
                />
                <Line type="monotone" dataKey="fcf" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800 text-slate-50">
          <CardHeader>
            <CardTitle className="text-sm font-semibold">Valuation Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs text-slate-400">Implied Enterprise Value</span>
              <span className="font-mono font-bold text-emerald-400">$1,450.2M</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs text-slate-400">WACC</span>
              <span className="font-mono">8.5%</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-xs text-slate-400">Terminal Growth Rate</span>
              <span className="font-mono">2.0%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Implied EV/EBITDA</span>
              <span className="font-mono">18.4x</span>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase font-bold mb-2 text-center">AI Confidence Score</div>
              <div className="flex items-center justify-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-950 border-slate-800 text-slate-50">
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-400" /> Comparable Company Analysis (Trading Comps)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-400">
              <thead className="text-xs text-slate-500 uppercase bg-slate-900/50">
                <tr>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">EV / Revenue</th>
                  <th className="px-4 py-3">EV / EBITDA</th>
                  <th className="px-4 py-3">EBITDA Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {COMPARABLES.map((comp) => (
                  <tr key={comp.company} className="hover:bg-slate-900/30">
                    <td className="px-4 py-3 font-medium text-slate-200">{comp.company}</td>
                    <td className="px-4 py-3 font-mono">{comp.ev_rev}</td>
                    <td className="px-4 py-3 font-mono">{comp.ev_ebitda}</td>
                    <td className="px-4 py-3 text-emerald-400">{comp.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
