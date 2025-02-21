"use client"

import { Card } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TaxForecast } from "./tax/forecast"
import { TaxInsights } from "./tax/insights"
import { TaxPlanning } from "./tax/planning"

export function TaxAnalysis() {
  return (
    <Tabs defaultValue="forecast" className="space-y-4">
      <TabsList>
        <TabsTrigger value="forecast">Tax Forecast</TabsTrigger>
        <TabsTrigger value="insights">Tax Insights</TabsTrigger>
        <TabsTrigger value="planning">Tax Planning</TabsTrigger>
      </TabsList>

      <TabsContent value="forecast">
        <TaxForecast />
      </TabsContent>

      <TabsContent value="insights">
        <TaxInsights />
      </TabsContent>

      <TabsContent value="planning">
        <TaxPlanning />
      </TabsContent>
    </Tabs>
  )
} 