import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Banking",
  description: "Manage your bank accounts and transactions",
}

const accounts = [
  {
    id: "1",
    bankName: "HDFC Bank",
    accountNumber: "XXXX1234",
    balance: "₹125,000",
    type: "Current",
  },
  {
    id: "2",
    bankName: "ICICI Bank",
    accountNumber: "XXXX5678",
    balance: "₹85,000",
    type: "Savings",
  },
  // Add more accounts...
]

export default function BankingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Banking</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Link Account
          </Button>
        </div>
      </div>
      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="transfers">Transfers</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {accounts.map((account) => (
              <Card key={account.id} className="p-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-muted-foreground">{account.bankName}</span>
                  <span className="text-2xl font-bold">{account.balance}</span>
                  <span className="text-sm text-muted-foreground">
                    {account.type} - {account.accountNumber}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          {/* Add transactions content */}
        </TabsContent>
        <TabsContent value="transfers" className="space-y-4">
          {/* Add transfers content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

