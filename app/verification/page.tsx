"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Wallet, Hop as Home, Sparkles, CircleCheck as CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, CircleAlert as AlertCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { VerificationTimeline } from "@/components/verification-timeline"
import { DocumentUpload } from "@/components/document-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"

const steps = [
  {
    id: 1,
    title: "Identity Verification",
    description: "Verify your government ID",
    icon: User,
  },
  {
    id: 2,
    title: "Financial Verification",
    description: "Upload bank statements",
    icon: Wallet,
  },
  {
    id: 3,
    title: "Property Check",
    description: "Verify property ownership",
    icon: Home,
  },
  {
    id: 4,
    title: "AI Scoring",
    description: "Generate trust score",
    icon: Sparkles,
  },
]

interface FormData {
  fullName: string
  idNumber: string
  monthlyIncome: string
  employer: string
  propertyAddress: string
  registryId: string
}

export default function VerificationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    idNumber: "",
    monthlyIncome: "",
    employer: "",
    propertyAddress: "",
    registryId: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}
    let valid = true

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required"
        valid = false
      }
      if (!formData.idNumber.trim()) {
        newErrors.idNumber = "ID number is required"
        valid = false
      }
    }

    if (step === 2) {
      if (!formData.monthlyIncome.trim()) {
        newErrors.monthlyIncome = "Monthly income is required"
        valid = false
      }
      if (!formData.employer.trim()) {
        newErrors.employer = "Employer is required"
        valid = false
      }
    }

    if (step === 3) {
      if (!formData.propertyAddress.trim()) {
        newErrors.propertyAddress = "Property address is required"
        valid = false
      }
    }

    setErrors(newErrors)
    return valid
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep((prev) => prev + 1)
      }
    } else {
      toast.error("Please fill in all required fields")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    toast.success("Verification submitted successfully! Your trust score will be ready in 48 hours.")
    setCurrentStep(1)
    setFormData({
      fullName: "",
      idNumber: "",
      monthlyIncome: "",
      employer: "",
      propertyAddress: "",
      registryId: "",
    })
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold">Identity Verification</h3>
            <p className="text-muted-foreground">Please provide your personal details and upload your government ID.</p>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="size-3" />
                    {errors.fullName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="idNumber">National ID Number *</Label>
                <Input
                  id="idNumber"
                  value={formData.idNumber}
                  onChange={(e) => updateField("idNumber", e.target.value)}
                  placeholder="Enter your ID number"
                  className={errors.idNumber ? "border-destructive" : ""}
                />
                {errors.idNumber && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="size-3" />
                    {errors.idNumber}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Label>Upload Government ID</Label>
              <div className="mt-2">
                <DocumentUpload />
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold">Financial Verification</h3>
            <p className="text-muted-foreground">Upload your bank statements and employment documents.</p>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income (JOD) *</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => updateField("monthlyIncome", e.target.value)}
                  placeholder="e.g. 1500"
                  className={errors.monthlyIncome ? "border-destructive" : ""}
                />
                {errors.monthlyIncome && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="size-3" />
                    {errors.monthlyIncome}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="employer">Employer Name *</Label>
                <Input
                  id="employer"
                  value={formData.employer}
                  onChange={(e) => updateField("employer", e.target.value)}
                  placeholder="Enter your employer name"
                  className={errors.employer ? "border-destructive" : ""}
                />
                {errors.employer && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="size-3" />
                    {errors.employer}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <Label>Upload Financial Documents</Label>
              <div className="mt-2">
                <DocumentUpload />
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold">Property Check</h3>
            <p className="text-muted-foreground">Verify your property ownership against the national registry.</p>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="propertyAddress">Property Address *</Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => updateField("propertyAddress", e.target.value)}
                  placeholder="Enter property address"
                  className={errors.propertyAddress ? "border-destructive" : ""}
                />
                {errors.propertyAddress && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="size-3" />
                    {errors.propertyAddress}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="registryId">Registry ID (if available)</Label>
                <Input
                  id="registryId"
                  value={formData.registryId}
                  onChange={(e) => updateField("registryId", e.target.value)}
                  placeholder="e.g. JO-AMM-2024-08841"
                />
              </div>
            </div>
            <div className="mt-4">
              <Label>Upload Property Documents</Label>
              <div className="mt-2">
                <DocumentUpload />
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-semibold">AI Scoring</h3>
            <p className="text-muted-foreground">Review your information before generating your trust score.</p>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 className="size-5" />
                  <span className="font-semibold">Summary</span>
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Full Name</span>
                    <span className="font-medium">{formData.fullName || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">ID Number</span>
                    <span className="font-medium">{formData.idNumber || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Monthly Income</span>
                    <span className="font-medium">{formData.monthlyIncome ? `JD ${formData.monthlyIncome}` : "Not provided"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Employer</span>
                    <span className="font-medium">{formData.employer || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Address</span>
                    <span className="font-medium">{formData.propertyAddress || "Not provided"}</span>
                  </div>
                </div>
                <div className="rounded-xl bg-primary/5 p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="size-4" />
                    <span className="text-sm font-medium">What happens next?</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Our AI will analyze your verified signals and generate a 0-100 trust score within 48 hours. 
                    All sensitive documents will be automatically deleted after the scoring is complete.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-heading text-3xl font-semibold tracking-tight">Verification Process</h1>
            <p className="mt-2 text-muted-foreground">Complete the 4-step verification to get your AJAR Trust Score.</p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mt-2 h-2" />
          </motion.div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
            {/* Timeline Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border bg-card p-6">
                <VerificationTimeline currentStep={currentStep} />
              </div>
            </div>

            {/* Step Content */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      {renderStepContent()}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="size-4" />
                  Back
                </Button>

                {currentStep < steps.length ? (
                  <Button onClick={handleNext} className="gap-2">
                    Next
                    <ChevronRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="inline-block"
                        >
                          <ShieldCheck className="size-4" />
                        </motion.span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="size-4" />
                        Submit Verification
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
