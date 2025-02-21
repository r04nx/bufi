'use client'

import { useEffect } from 'react'
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { DashboardOverview } from "./overview"
import { FinancialHealth } from "./components/financial-health"
import { DocumentManagement } from "./components/document-management"
import { LoadingScreen } from "@/components/ui/loading-screen"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { InvestorsCorner } from "./components/investors-corner"
import { TaxAnalysis } from "./components/tax-analysis"
import { Transactions } from "./components/transactions"
import { Revenue } from "./components/revenue"
import { FinSage } from "./components/fin-sage"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in')
    }
  }, [user, loading, router])

  if (loading) {
    return <LoadingScreen />
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="health">Financial Health</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="investors">Investors Corner</TabsTrigger>
            <TabsTrigger value="tax">Tax Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="transactions">
            <Transactions />
          </TabsContent>

          <TabsContent value="revenue">
            <Revenue />
          </TabsContent>

          <TabsContent value="health">
            <FinancialHealth />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentManagement />
          </TabsContent>

          <TabsContent value="investors">
            <InvestorsCorner />
          </TabsContent>

          <TabsContent value="tax">
            <TaxAnalysis />
          </TabsContent>
        </Tabs>
      </div>
      <FinSage />
    </>
  )
}

