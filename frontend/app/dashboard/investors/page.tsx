'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  TrendingUp, 
  PieChart, 
  Building2,
  Plus
} from "lucide-react"
import { InvestorsList } from "./investors-list"
import { InvestorMetrics } from "./investor-metrics"
import { AddInvestorDialog } from "./add-investor-dialog"
import { InvestmentRounds } from "./investment-rounds"

export default function InvestorsPage() {
  const [showAddInvestor, setShowAddInvestor] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Investors</h2>
        <Button onClick={() => setShowAddInvestor(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Investor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Investment
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.4M</div>
          </CardContent>
        </Card>
        
        {/* Add more metric cards */}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
          <TabsTrigger value="rounds">Investment Rounds</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <InvestorMetrics />
        </TabsContent>

        <TabsContent value="investors" className="space-y-4">
          <InvestorsList />
        </TabsContent>

        <TabsContent value="rounds" className="space-y-4">
          <InvestmentRounds />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <InvestorMetrics detailed />
        </TabsContent>
      </Tabs>

      <AddInvestorDialog 
        open={showAddInvestor} 
        onClose={() => setShowAddInvestor(false)} 
      />
    </div>
  )
} 