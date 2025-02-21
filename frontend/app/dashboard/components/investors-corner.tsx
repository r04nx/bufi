"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { InvestorOverview } from "./investors/overview"
import { InvestorMetrics } from "./investors/metrics"
import { InvestorActivity } from "./investors/activity"

export function InvestorsCorner() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="metrics">Investment Metrics</TabsTrigger>
        <TabsTrigger value="activity">Recent Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <InvestorOverview />
      </TabsContent>

      <TabsContent value="metrics">
        <InvestorMetrics />
      </TabsContent>

      <TabsContent value="activity">
        <InvestorActivity />
      </TabsContent>
    </Tabs>
  )
} 