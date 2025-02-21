"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Building2, CheckCircle2, CreditCard, FileText, Wallet } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Step, Stepper } from "./stepper"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { LoadingSpinner, FullPageLoader } from "@/components/ui/loading-spinner"

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
  const [formData, setFormData] = useState({
    businessAge: 0,
    industrySector: '',
    businessSize: '',
    gstin: '',
    pan: '',
    employeeCount: 0,
    annualRevenue: 0,
    businessAddress: '',
    phoneNumber: '',
  })
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      await handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const cleanedData = {
        businessAge: Number(formData.businessAge),
        industrySector: formData.industrySector,
        businessSize: formData.businessSize,
        gstin: formData.gstin,
        pan: formData.pan,
        employeeCount: Number(formData.employeeCount),
        annualRevenue: Number(formData.annualRevenue),
        businessAddress: formData.businessAddress,
        phoneNumber: formData.phoneNumber,
      }

      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save profile')
      }

      toast({
        title: "Success",
        description: "Profile completed successfully!",
        variant: "default",
      })

      setIsRedirecting(true)
      router.push('/dashboard')
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (isRedirecting) {
    return <FullPageLoader />
  }

  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80"
          alt="Business"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-orange-600/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-700/70 via-orange-500/50 to-orange-400/30" />
      </div>

      {/* Content */}
      <div className="flex-1 h-full">
        <div className="bg-background/80 backdrop-blur-sm min-h-screen">
          <div className="p-8">
            <Stepper steps={steps} currentStep={currentStep} />

            <div className="mx-auto max-w-2xl space-y-8 mt-8">
              {currentStep === 0 && (
                <BusinessDetailsStep 
                  formData={formData} 
                  onChange={handleInputChange} 
                />
              )}

              {currentStep === 1 && (
                <FinancialInfoStep 
                  formData={formData} 
                  onChange={handleInputChange} 
                />
              )}

              {currentStep === 2 && <BankingStep />}

              {currentStep === 3 && (
                <TaxComplianceStep 
                  formData={formData} 
                  onChange={handleInputChange} 
                />
              )}

              {currentStep === 4 && <CompleteStep />}

              <div className="flex justify-end gap-4 mt-8">
                {currentStep > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={loading}
                  >
                    Previous
                  </Button>
                )}
                <Button 
                  onClick={nextStep} 
                  className="gap-2" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      {currentStep === steps.length - 1 ? "Complete" : "Continue"}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StepProps {
  formData: any;
  onChange: (field: string, value: string | number) => void;
}

function BusinessDetailsStep({ formData, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Business Details</h2>
        <p className="text-muted-foreground">Tell us about your business to get started</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Business Type</Label>
          <RadioGroup 
            value={formData.businessType}
            onValueChange={(value) => onChange('businessType', value)}
            className="grid grid-cols-2 gap-4"
          >
            <Label
              htmlFor="new"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <RadioGroupItem value="new" id="new" className="sr-only" />
              <span>Newly Established</span>
            </Label>
            <Label
              htmlFor="existing"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <RadioGroupItem value="existing" id="existing" className="sr-only" />
              <span>Well Established</span>
            </Label>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select 
            value={formData.industrySector}
            onValueChange={(value) => onChange('industrySector', value)}
          >
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
          <Label htmlFor="business-age">Business Age (in years)</Label>
          <Input
            id="business-age"
            type="number"
            value={formData.businessAge}
            onChange={(e) => onChange('businessAge', parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Number of Employees</Label>
          <Input
            id="employees"
            type="number"
            value={formData.employeeCount}
            onChange={(e) => onChange('employeeCount', parseInt(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

function FinancialInfoStep({ formData, onChange }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial Information</h2>
        <p className="text-muted-foreground">Add your business financial details</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="annual-revenue">Annual Revenue</Label>
          <Select
            value={formData.annualRevenue.toString()}
            onValueChange={(value) => onChange('annualRevenue', parseFloat(value))}
          >
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

function TaxComplianceStep({ formData, onChange }: StepProps) {
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

