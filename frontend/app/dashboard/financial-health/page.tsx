import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Financial Health",
  description: "Track and analyze your business financial health",
}

export default function FinancialHealthPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Financial Health</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <h3 className="text-sm font-medium">Health Score</h3>
              <div className="mt-2 text-2xl font-bold">85/100</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </Card>
            {/* Add more metric cards */}
          </div>
          <Card className="col-span-4">
            <div className="p-6">
              <h3 className="text-sm font-medium">Financial Health Trends</h3>
              {/* Add chart component here */}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          {/* Add analytics content */}
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          {/* Add reports content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

