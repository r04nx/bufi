"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Building2, 
  DollarSign, 
  Users,
  TrendingUp,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard
} from "lucide-react"
import { formatCurrency } from '@/lib/utils'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface DashboardData {
  user: {
    id: string
    email: string
    name: string
    businessName: string
  }
  profile: {
    businessAge: number
    industrySector: string
    employeeCount: number
    annualRevenue: number
    // ... other profile fields
  }
  metrics: {
    totalRevenue: number
    totalExpenses: number
    pendingInvoices: number
    businessAge: number
  }
  recentTransactions: Array<{
    id: string
    amount: number
    description: string
    type: 'CREDIT' | 'DEBIT'
    date: string
  }>
  recentInvoices: Array<{
    id: string
    amount: number
    status: string
    dueDate: string
  }>
}

const mockRevenueData = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 1398 },
  { month: 'Mar', revenue: 9800 },
  { month: 'Apr', revenue: 3908 },
  { month: 'May', revenue: 4800 },
  { month: 'Jun', revenue: 3800 },
]

const mockExpenseCategories = [
  { category: 'Operations', amount: 4000 },
  { category: 'Marketing', amount: 3000 },
  { category: 'Payroll', amount: 8000 },
  { category: 'Tools', amount: 2780 },
]

export function DashboardOverview() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/dashboard')
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data')
        }
        const data = await response.json()
        setData(data)
      } catch (error: any) {
        console.error('Dashboard fetch error:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="p-4 text-destructive">
        Error loading dashboard: {error}
      </div>
    )
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <div className="space-y-8">
      {/* Business Overview */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back, {data.user.name}!</h2>
          <p className="text-muted-foreground">{data.user.businessName}</p>
        </div>
        <div className="flex items-center gap-4">
          <Card className="p-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{data.profile.employeeCount} Employees</span>
            </div>
          </Card>
          <Card className="p-2">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm capitalize">{data.profile.industrySector}</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(data.metrics.totalRevenue)}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
            <span className="text-green-500">12%</span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold">{formatCurrency(data.metrics.totalExpenses)}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
              <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <ArrowDownRight className="h-4 w-4 text-red-500" />
            <span className="text-red-500">8%</span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Pending Invoices</p>
              <p className="text-2xl font-bold">{data.metrics.pendingInvoices}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
              <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Total value:</span>
            <span className="font-medium">{formatCurrency(25000)}</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Cash Flow</p>
              <p className="text-2xl font-bold">{formatCurrency(data.metrics.totalRevenue - data.metrics.totalExpenses)}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
              <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <ArrowUpRight className="h-4 w-4 text-green-500" />
            <span className="text-green-500">Positive</span>
            <span className="text-muted-foreground">cash flow</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Revenue Trend</h3>
            <p className="text-sm text-muted-foreground">Monthly revenue over time</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Revenue
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
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2} 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium">Expense Breakdown</h3>
            <p className="text-sm text-muted-foreground">Expenses by category</p>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockExpenseCategories}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="category" className="text-sm" />
                <YAxis className="text-sm" />
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
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="grid gap-4">
          {data.recentTransactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    transaction.type === 'CREDIT' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'CREDIT' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}>
                  {transaction.type === 'CREDIT' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 