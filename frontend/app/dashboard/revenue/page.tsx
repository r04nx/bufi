"use client"

import { useState } from "react"
import { Revenue } from "../components/revenue"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RevenueForm } from "./revenue-form"

export default function RevenuePage() {
  const [isAddingRevenue, setIsAddingRevenue] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Revenue</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Revenue Entry
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Revenue Entry</DialogTitle>
            </DialogHeader>
            <RevenueForm />
          </DialogContent>
        </Dialog>
      </div>
      <Revenue />
    </div>
  )
} 