'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Building2, DollarSign, TrendingUp } from "lucide-react"

const DEALS = [
  {
    id: 1,
    title: "Project Falcon",
    target: "TechFlow Systems",
    status: "Due Diligence",
    value: "$1.2B",
    progress: 65,
    type: "Acquisition"
  },
  {
    id: 2,
    title: "Project Zenith",
    target: "GreenEnergy Corp",
    status: "Negotiation",
    value: "$850M",
    progress: 80,
    type: "Merger"
  },
  {
    id: 3,
    title: "Project Apollo",
    target: "BlueFin Logistics",
    status: "Sourcing",
    value: "$450M",
    progress: 25,
    type: "LBO"
  }
]

export function MAWorkflow() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-slate-950 text-slate-50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.5B</div>
            <p className="text-xs text-slate-400">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-950 text-slate-50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Briefcase className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-slate-400">3 in advanced stages</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-950 text-slate-50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Premium</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-slate-400">Market avg: 18%</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-950 text-slate-50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Deals (YTD)</CardTitle>
            <Building2 className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-slate-400">$4.8B total value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card className="bg-slate-950 text-slate-50 border-slate-800">
          <CardHeader>
            <CardTitle>M&A Deal Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {DEALS.map((deal) => (
                <div key={deal.id} className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{deal.title} - {deal.target}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] bg-slate-900 border-slate-700">{deal.type}</Badge>
                        <Badge variant="secondary" className="text-[10px] bg-blue-900/20 text-blue-400 border-blue-900/50">{deal.status}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{deal.value}</p>
                      <p className="text-[10px] text-slate-400">Closing Est: Q4 2024</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Progress</span>
                      <span>{deal.progress}%</span>
                    </div>
                    <Progress value={deal.progress} className="h-1 bg-slate-800" indicatorClassName="bg-emerald-500" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
