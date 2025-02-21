import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Invoices",
  description: "Manage your invoices and payments",
}

const invoices = [
  {
    id: "INV001",
    customer: "Acme Corp",
    amount: "₹12,500",
    status: "Paid",
    date: "2024-02-15",
    dueDate: "2024-03-15",
  },
  {
    id: "INV002",
    customer: "TechStart Inc",
    amount: "₹8,500",
    status: "Pending",
    date: "2024-02-10",
    dueDate: "2024-03-10",
  },
  // Add more invoices...
]

export default function InvoicesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Invoice
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input placeholder="Search invoices..." className="max-w-sm" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

