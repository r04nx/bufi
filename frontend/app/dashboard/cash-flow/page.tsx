import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Cash Flow",
  description: "Monitor and manage your cash flow",
}

export default function CashFlowPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Cash Flow</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <h3 className="text-sm font-medium">Net Cash Flow</h3>
              <div className="mt-2 text-2xl font-bold">₹24,500</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </Card>
            {/* Add more metric cards */}
          </div>
          <Card className="col-span-4">
            <div className="p-6">
              <h3 className="text-sm font-medium">Cash Flow Trends</h3>
              {/* Add chart component here */}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="forecasting" className="space-y-4">
          {/* Add forecasting content */}
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          {/* Add transactions content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

