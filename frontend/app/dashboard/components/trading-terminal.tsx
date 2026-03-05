'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts'
import { ArrowUpIcon, ArrowDownIcon, Activity, Zap } from "lucide-react"

const MARKET_DATA = [
  { name: '09:30', price: 4250.50, volume: 1200 },
  { name: '10:30', price: 4265.20, volume: 1500 },
  { name: '11:30', price: 4260.80, volume: 1100 },
  { name: '12:30', price: 4272.30, volume: 1800 },
  { name: '13:30', price: 4268.90, volume: 1400 },
  { name: '14:30', price: 4285.10, volume: 2200 },
  { name: '15:30', price: 4292.40, volume: 2500 },
]

const WATCHLIST = [
  { symbol: 'AAPL', price: '189.43', change: '+1.24%', trend: 'up' },
  { symbol: 'MSFT', price: '402.12', change: '-0.45%', trend: 'down' },
  { symbol: 'GOOGL', price: '142.56', change: '+0.89%', trend: 'up' },
  { symbol: 'JPM', price: '172.10', change: '+2.10%', trend: 'up' },
  { symbol: 'GS', price: '385.45', change: '-1.12%', trend: 'down' },
]

const SIGNALS = [
  { symbol: 'TSLA', type: 'BUY', confidence: '88%', reason: 'RSI Divergence' },
  { symbol: 'AMZN', type: 'SELL', confidence: '74%', reason: 'Double Top Pattern' },
  { symbol: 'BTC', type: 'BUY', confidence: '92%', reason: 'Institutional Inflow' },
]

export function TradingTerminal() {
  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      {/* Watchlist - Left Side */}
      <Card className="col-span-12 lg:col-span-3 bg-slate-950 border-slate-800 text-slate-50">
        <CardHeader className="p-4">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <Activity className="h-3 w-3" /> Watchlist
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-900">
            {WATCHLIST.map((item) => (
              <div key={item.symbol} className="p-3 flex items-center justify-between hover:bg-slate-900/50 cursor-pointer transition-colors">
                <span className="font-bold text-sm">{item.symbol}</span>
                <div className="text-right">
                  <div className="text-sm font-mono">{item.price}</div>
                  <div className={`text-[10px] flex items-center justify-end ${item.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.trend === 'up' ? <ArrowUpIcon className="h-2 w-2 mr-1" /> : <ArrowDownIcon className="h-2 w-2 mr-1" />}
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Chart - Center */}
      <div className="col-span-12 lg:col-span-6 space-y-4">
        <Card className="bg-slate-950 border-slate-800 text-slate-50">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">S&P 500 Index</CardTitle>
              <p className="text-[10px] text-slate-400">Real-time Institutional Feed</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-mono font-bold">4,292.40</div>
              <div className="text-emerald-400 text-xs font-bold">+0.54% (Today)</div>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MARKET_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#475569"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  stroke="#475569"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', fontSize: '12px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
           <Card className="bg-slate-950 border-slate-800 text-slate-50 p-4">
              <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-2">Order Book</h4>
              <div className="space-y-1 font-mono text-[10px]">
                <div className="flex justify-between text-rose-400"><span>4293.10</span><span>1.424</span></div>
                <div className="flex justify-between text-rose-400"><span>4292.80</span><span>0.850</span></div>
                <div className="bg-slate-900/50 py-1 px-2 my-2 border-y border-slate-800 flex justify-between font-bold">
                  <span>4292.40</span><span>Spread: 0.10</span>
                </div>
                <div className="flex justify-between text-emerald-400"><span>4292.30</span><span>2.110</span></div>
                <div className="flex justify-between text-emerald-400"><span>4292.00</span><span>0.980</span></div>
              </div>
           </Card>
           <Card className="bg-slate-950 border-slate-800 text-slate-50 p-4">
              <h4 className="text-[10px] uppercase font-bold text-slate-500 mb-2">Market Volume</h4>
              <div className="h-[80px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MARKET_DATA}>
                    <Bar dataKey="volume" fill="#334155">
                      {MARKET_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#1e293b' : '#334155'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </Card>
        </div>
      </div>

      {/* AI Signals & Market News - Right Side */}
      <div className="col-span-12 lg:col-span-3 space-y-4">
        <Card className="bg-slate-950 border-slate-800 text-slate-50">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Zap className="h-3 w-3 text-amber-400" /> AI Trading Signals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-900">
              {SIGNALS.map((signal) => (
                <div key={signal.symbol} className="p-3 hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">{signal.symbol}</span>
                    <Badge className={signal.type === 'BUY' ? 'bg-emerald-900/40 text-emerald-400' : 'bg-rose-900/40 text-rose-400'}>
                      {signal.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{signal.reason}</span>
                    <span className="font-mono text-emerald-500">{signal.confidence} Conf.</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800 text-slate-50">
          <CardHeader className="p-4">
             <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500">
               Market Sentiment
             </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
             <div className="flex items-end gap-2 mb-2">
               <div className="text-3xl font-bold text-emerald-400">72</div>
               <div className="text-[10px] text-slate-500 mb-1">BULLISH</div>
             </div>
             <Progress value={72} className="h-1 bg-slate-800" indicatorClassName="bg-emerald-500" />
             <p className="text-[9px] text-slate-500 mt-2 italic">
               "Sentiment is driven by strong tech earnings and dovish Fed expectations."
             </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
