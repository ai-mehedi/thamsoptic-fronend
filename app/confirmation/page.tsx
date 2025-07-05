"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null)

  useEffect(() => {
    const details = sessionStorage.getItem("orderDetails")
    if (details) {
      setOrderDetails(JSON.parse(details))
    }
  }, [])

  if (!orderDetails) {
    return (
      <main className="min-h-screen py-24 flex items-center justify-center">
        <div>Loading...</div>
      </main>
    )
  }

  const packageDetails = {
    essential: { name: "Essential", speed: "50 Mbps", price: 25 },
    popular: { name: "Popular", speed: "150 Mbps", price: 35 },
    superfast: { name: "Superfast", speed: "500 Mbps", price: 45 },
    ultrafast: { name: "Ultrafast", speed: "1 Gbps", price: 55 },
  }

  const pkg = packageDetails[orderDetails.package as keyof typeof packageDetails]

  return (
    <main className="min-h-screen py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-royal-blue mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for choosing Thamesoptic</p>
        </div>

        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-royal-blue">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Subscription ID</p>
                <p className="font-mono font-semibold">{orderDetails.subscriptionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">{new Date(orderDetails.orderDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">Package</p>
              <p className="font-semibold">
                {pkg.name} - {pkg.speed}
              </p>
              <p className="text-royal-blue font-bold">£{pkg.price}/month</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Customer</p>
              <p className="font-semibold">
                {orderDetails.customer.firstName} {orderDetails.customer.lastName}
              </p>
              <p className="text-sm text-gray-600">{orderDetails.customer.email}</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <Calendar className="h-8 w-8 mx-auto mb-3 text-royal-blue" />
              <h3 className="font-semibold mb-2">Installation</h3>
              <p className="text-sm text-gray-600">
                We'll contact you within 24 hours to schedule your free installation
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <Mail className="h-8 w-8 mx-auto mb-3 text-royal-blue" />
              <h3 className="font-semibold mb-2">Payment Info</h3>
              <p className="text-sm text-gray-600">Payment instructions have been sent to your email address</p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-6">
              <Phone className="h-8 w-8 mx-auto mb-3 text-royal-blue" />
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-sm text-gray-600">Call us at 0800 123 4567 if you have any questions</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <Button asChild className="gold text-royal-blue hover:bg-yellow-400 btn-3d">
            <Link href="/dashboard">Go to My Account</Link>
          </Button>
          <div>
            <Button asChild variant="outline" className="border-royal-blue text-royal-blue bg-transparent">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
