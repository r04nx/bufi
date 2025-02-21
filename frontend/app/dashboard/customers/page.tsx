import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Customers",
  description: "Manage your customer relationships",
}

const customers = [
  {
    id: "1",
    name: "Acme Corp",
    email: "contact@acme.com",
    phone: "+91 98765 43210",
    totalRevenue: "₹125,000",
    status: "Active",
  },
  {
    id: "2",
    name: "TechStart Inc",
    email: "info@techstart.com",
    phone: "+91 98765 43211",
    totalRevenue: "₹85,000",
    status: "Active",
  },
  // Add more customers...
]

export default function CustomersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input placeholder="Search customers..." className="max-w-sm" />
        </div>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Total Revenue</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.totalRevenue}</TableCell>
                  <TableCell>{customer.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

