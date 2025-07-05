"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { CreditCard, Shield, Check } from "lucide-react"

const packageDetails = {
  essential: { name: "Essential", speed: "50 Mbps", price: 25 },
  popular: { name: "Popular", speed: "150 Mbps", price: 35 },
  superfast: { name: "Superfast", speed: "500 Mbps", price: 45 },
  ultrafast: { name: "Ultrafast", speed: "1 Gbps", price: 55 },
}

export default function CheckoutPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const packageId = sessionStorage.getItem("selectedPackage")
    if (packageId && packageId in packageDetails) {
      setSelectedPackage(packageId)
    } else {
      router.push("/packages")
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate subscription ID
    const subscriptionId = `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Store order details
    sessionStorage.setItem(
      "orderDetails",
      JSON.stringify({
        subscriptionId,
        package: selectedPackage,
        customer: customerInfo,
        orderDate: new Date().toISOString(),
      }),
    )

    toast({
      title: "Order Confirmed!",
      description: `Your subscription ID is ${subscriptionId}`,
    })

    router.push("/confirmation")
  }

  if (!selectedPackage) {
    return <div>Loading...</div>
  }

  const pkg = packageDetails[selectedPackage as keyof typeof packageDetails]

  return (
    <main className="min-h-screen py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-royal-blue mb-2">Complete Your Order</h1>
          <p className="text-gray-600">You're just one step away from superfast broadband</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-royal-blue">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{pkg.name} Package</h3>
                  <p className="text-sm text-gray-600">{pkg.speed} broadband</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-royal-blue">£{pkg.price}/month</div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Unlimited data usage
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Unlimited UK landline calls
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Free installation
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  24/7 customer support
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center font-semibold">
                <span>Total per month:</span>
                <span className="text-xl text-royal-blue">£{pkg.price}</span>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Price Lock Guarantee</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Your price is locked for 24 months - no surprise increases!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information Form */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-royal-blue">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Installation Address</Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Full address including postcode"
                    required
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-semibold text-royal-blue flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </h3>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-royal-blue">
                      <strong>Cardless Payment System</strong>
                      <br />
                      You'll receive payment instructions via email after confirming your order. No card details
                      required now!
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full gold text-royal-blue hover:bg-yellow-400 btn-3d"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Confirm Order"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By confirming your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
