import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Total Revenue</div>
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold">₹45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </Card>
        <Card className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Cash Flow</div>
            <ArrowUpIcon className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-2xl font-bold">+₹1,419</div>
          <p className="text-xs text-muted-foreground">+19% from last month</p>
        </Card>
        <Card className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Expenses</div>
            <ArrowDownIcon className="h-4 w-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold">₹12,234</div>
          <p className="text-xs text-muted-foreground">+4% from last month</p>
        </Card>
        <Card className="p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Active Invoices</div>
            <StopwatchIcon className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-2xl font-bold">₹8,234</div>
          <p className="text-xs text-muted-foreground">12 invoices pending</p>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Financial Health Score</div>
          </div>
          {/* Placeholder for Chart */}
          <div className="h-[200px] bg-muted rounded-lg" />
        </Card>
        <Card className="col-span-3 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Recent Transactions</div>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Payment from ABC Corp",
                amount: "+₹2,999",
                status: "complete",
              },
              {
                title: "Office Supplies",
                amount: "-₹499",
                status: "complete",
              },
              {
                title: "Freelance Payment",
                amount: "+₹1,999",
                status: "pending",
              },
            ].map((transaction) => (
              <div key={transaction.title} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {transaction.status === "complete" ? (
                    <CheckCircledIcon className="h-4 w-4 text-green-500" />
                  ) : transaction.status === "pending" ? (
                    <StopwatchIcon className="h-4 w-4 text-orange-500" />
                  ) : (
                    <CrossCircledIcon className="h-4 w-4 text-red-500" />
                  )}
                  <span className="font-medium">{transaction.title}</span>
                </div>
                <span className={transaction.amount.startsWith("+") ? "text-green-500" : "text-red-500"}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Top Customers</div>
          </div>
          <div className="space-y-4">
            {[
              { name: "ABC Corporation", revenue: "₹12,234", growth: "+12%" },
              { name: "XYZ Limited", revenue: "₹8,442", growth: "+8%" },
              { name: "Tech Solutions", revenue: "₹6,321", growth: "+5%" },
            ].map((customer) => (
              <div key={customer.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleIcon className="h-2 w-2" />
                  <span className="font-medium">{customer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{customer.revenue}</span>
                  <span className="text-green-500 text-sm">{customer.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="col-span-3 p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">AI Insights</div>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted p-4">
              <div className="flex items-center gap-2">
                <QuestionMarkCircledIcon className="h-4 w-4 text-primary" />
                <span className="font-medium">Cash Flow Prediction</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on current trends, you might face a cash flow gap in the next 30 days. Consider following up on
                pending invoices.
              </p>
              <Button variant="link" className="mt-2 h-auto p-0">
                View Details
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="rounded-lg border bg-muted p-4">
              <div className="flex items-center gap-2">
                <QuestionMarkCircledIcon className="h-4 w-4 text-primary" />
                <span className="font-medium">Expense Optimization</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Your software subscription costs have increased by 25% this quarter. Review your subscriptions to
                identify potential savings.
              </p>
              <Button variant="link" className="mt-2 h-auto p-0">
                Review Subscriptions
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

