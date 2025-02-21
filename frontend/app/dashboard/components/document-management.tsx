"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  FileUp,
  FilePlus,
  FileText,
  Search,
  Filter,
  Plus,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DocumentList } from "./document-management/document-list"

export function DocumentManagement() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)

  return (
    <Tabs defaultValue="invoices" className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="statements">Statements</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="border-0 p-0 focus-visible:ring-0"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <FileUp className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Document</DialogTitle>
                <DialogDescription>
                  Upload an invoice or transaction document for processing
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                  <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <FilePlus className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Drag and drop your files here, or click to browse
                    </p>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Document Type</Label>
                    <select className="w-full rounded-md border p-2">
                      <option>Invoice</option>
                      <option>Transaction Receipt</option>
                      <option>Bank Statement</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <Button onClick={() => setUploadDialogOpen(false)}>
                    Upload and Process
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <TabsContent value="invoices">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recent Invoices</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>
          <DocumentList type="invoice" />
        </div>
      </TabsContent>

      <TabsContent value="transactions">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recent Transactions</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Record Transaction
            </Button>
          </div>
          <DocumentList type="transaction" />
        </div>
      </TabsContent>

      <TabsContent value="statements">
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Bank Statements</h3>
                <p className="text-sm text-muted-foreground">
                  Monthly account statements from your connected banks
                </p>
              </div>
              <Button variant="outline">
                <FileUp className="h-4 w-4 mr-2" />
                Import Statement
              </Button>
            </div>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground text-center p-8">
                Connect your bank account to automatically import statements
              </div>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Connect Bank Account
              </Button>
            </div>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
} 