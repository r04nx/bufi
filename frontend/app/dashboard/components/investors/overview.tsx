"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const topInvestor = {
  name: "Acme Ventures",
  type: "Venture Capital",
  investmentAmount: 5000000,
  equity: 25,
  since: "2022",
  representative: "Sarah Johnson",
  role: "Managing Partner",
  email: "sarah.j@acmeventures.com",
  phone: "+1 (555) 123-4567",
  lastMeeting: "2024-02-15",
  nextMeeting: "2024-04-01",
  status: "active",
  portfolioCompanies: 12,
  expertise: ["SaaS", "FinTech", "Enterprise Software"],
}

const investmentHistory = [
  { round: 'Seed', amount: 1000000 },
  { round: 'Series A', amount: 2000000 },
  { round: 'Series B', amount: 2000000 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const equityDistribution = [
  { name: 'Acme Ventures', value: 25 },
  { name: 'Other Investors', value: 30 },
  { name: 'Founders', value: 35 },
  { name: 'ESOP', value: 10 },
]

export function InvestorOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/assets/investors/acme.png" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{topInvestor.name}</h3>
                <p className="text-sm text-muted-foreground">{topInvestor.type}</p>
              </div>
              <Badge variant="default">{topInvestor.status}</Badge>
            </div>
            <div className="mt-4 grid gap-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Investment</p>
                  <p className="font-medium">{formatCurrency(topInvestor.investmentAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Equity</p>
                  <p className="font-medium">{topInvestor.equity}%</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Expertise</p>
                <div className="flex gap-2 mt-1">
                  {topInvestor.expertise.map((exp) => (
                    <Badge key={exp} variant="secondary">{exp}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-medium mb-4">Investment History</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={investmentHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="round" />
              <YAxis />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Amount
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {formatCurrency(payload[0].value as number)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="amount" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-medium mb-4">Key Contact</h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{topInvestor.representative}</p>
              <p className="text-sm text-muted-foreground">{topInvestor.role}</p>
            </div>
          </div>
          <div className="grid gap-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Email: </span>
              {topInvestor.email}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Phone: </span>
              {topInvestor.phone}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="w-full">Schedule Meeting</Button>
            <Button className="w-full">Contact</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h4 className="font-medium mb-4">Equity Distribution</h4>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={equityDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {equityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
} 