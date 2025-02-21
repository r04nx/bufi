"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Building2, CheckCircle2, CreditCard, FileText, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Step, Stepper } from "./stepper"

const steps: Step[] = [
  {
    title: "Business Details",
    description: "Tell us about your business",
    icon: Building2,
  },
  {
    title: "Financial Information",
    description: "Add your financial details",
    icon: Wallet,
  },
  {
    title: "Banking Integration",
    description: "Connect your bank accounts",
    icon: CreditCard,
  },
  {
    title: "Tax & Compliance",
    description: "Set up tax information",
    icon: FileText,
  },
  {
    title: "Complete",
    description: "Review and finish",
    icon: CheckCircle2,
  },
]

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <Stepper steps={steps} currentStep={currentStep} />

      <div className="mx-auto max-w-xl space-y-8">
        {currentStep === 0 && <BusinessDetailsStep />}

        {currentStep === 1 && <FinancialInfoStep />}

        {currentStep === 2 && <BankingStep />}

        {currentStep === 3 && <TaxComplianceStep />}

        {currentStep === 4 && <CompleteStep />}

        <div className="flex justify-end gap-4">
          {currentStep > 0 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              Previous
            </Button>
          )}
          <Button onClick={nextStep} className="gap-2">
            {currentStep === steps.length - 1 ? "Complete" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function BusinessDetailsStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Business Details</h2>
        <p className="text-muted-foreground">Tell us about your business to get started</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="business-name">Business Name</Label>
          <Input id="business-name" placeholder="Enter your business name" />
        </div>

        <div className="space-y-2">
          <Label>Business Type</Label>
          <RadioGroup defaultValue="new" className="grid grid-cols-2 gap-4">
            <Card className="relative flex cursor-pointer items-center justify-center p-4 hover:bg-accent">
              <RadioGroupItem value="new" className="sr-only" />
              <span>Newly Established</span>
            </Card>
            <Card className="relative flex cursor-pointer items-center justify-center p-4 hover:bg-accent">
              <RadioGroupItem value="existing" className="sr-only" />
              <span>Already in Industry</span>
            </Card>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="services">Services</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Number of Employees</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select employee range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10</SelectItem>
              <SelectItem value="11-50">11-50</SelectItem>
              <SelectItem value="51-200">51-200</SelectItem>
              <SelectItem value="201+">201+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function FinancialInfoStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial Information</h2>
        <p className="text-muted-foreground">Add your business financial details</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="annual-revenue">Annual Revenue</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select revenue range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-100k">₹0 - ₹1 Lakh</SelectItem>
              <SelectItem value="100k-500k">₹1 Lakh - ₹5 Lakhs</SelectItem>
              <SelectItem value="500k-2m">₹5 Lakhs - ₹20 Lakhs</SelectItem>
              <SelectItem value="2m+">₹20 Lakhs+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenue-sources">Primary Revenue Sources</Label>
          <Input id="revenue-sources" placeholder="e.g., Product Sales, Services" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthly-expenses">Average Monthly Expenses</Label>
          <Input id="monthly-expenses" type="number" placeholder="Enter amount in INR" prefix="₹" />
        </div>
      </div>
    </div>
  )
}

function BankingStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Banking Integration</h2>
        <p className="text-muted-foreground">Connect your business bank accounts</p>
      </div>

      <div className="grid gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">HDFC Bank</h3>
              <p className="text-sm text-muted-foreground">Connect your HDFC account</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Connect
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">ICICI Bank</h3>
              <p className="text-sm text-muted-foreground">Connect your ICICI account</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Connect
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">State Bank of India</h3>
              <p className="text-sm text-muted-foreground">Connect your SBI account</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Connect
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function TaxComplianceStep() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Tax & Compliance</h2>
        <p className="text-muted-foreground">Set up your tax information</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gstin">GSTIN Number</Label>
          <Input id="gstin" placeholder="Enter your GSTIN" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pan">PAN Number</Label>
          <Input id="pan" placeholder="Enter your PAN" />
        </div>

        <div className="space-y-2">
          <Label>Tax Filing Period</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function CompleteStep() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-4 text-2xl font-bold">Setup Complete!</h2>
        <p className="mt-2 text-muted-foreground">
          Your business profile is ready. Let's explore your new financial dashboard.
        </p>
      </div>
    </div>
  )
}

