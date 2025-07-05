"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Wifi, Phone, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

const packages = [
  {
    id: "essential",
    name: "Essential",
    speed: "50 Mbps",
    price: "£25",
    originalPrice: "£30",
    description: "Perfect for browsing and streaming",
    features: [
      "Download speeds up to 50 Mbps",
      "Upload speeds up to 10 Mbps",
      "Unlimited data usage",
      "Unlimited UK landline calls",
      "Free wireless router",
      "Free installation",
      "24/7 customer support",
    ],
    popular: false,
  },
  {
    id: "popular",
    name: "Popular",
    speed: "150 Mbps",
    price: "£35",
    originalPrice: "£42",
    description: "Great for families and home working",
    features: [
      "Download speeds up to 150 Mbps",
      "Upload speeds up to 30 Mbps",
      "Unlimited data usage",
      "Unlimited UK landline calls",
      "Free wireless router (Wi-Fi 6)",
      "Free installation",
      "24/7 customer support",
      "Parental controls included",
    ],
    popular: true,
  },
  {
    id: "superfast",
    name: "Superfast",
    speed: "500 Mbps",
    price: "£45",
    originalPrice: "£55",
    description: "Ultimate performance for power users",
    features: [
      "Download speeds up to 500 Mbps",
      "Upload speeds up to 50 Mbps",
      "Unlimited data usage",
      "Unlimited UK landline calls",
      "Premium wireless router (Wi-Fi 6E)",
      "Free installation",
      "Priority 24/7 customer support",
      "Advanced security suite",
      "Static IP address available",
    ],
    popular: false,
  },
  {
    id: "ultrafast",
    name: "Ultrafast",
    speed: "1 Gbps",
    price: "£55",
    originalPrice: "£70",
    description: "Maximum speed for demanding households",
    features: [
      "Download speeds up to 1 Gbps",
      "Upload speeds up to 100 Mbps",
      "Unlimited data usage",
      "Unlimited UK landline calls",
      "Premium wireless router (Wi-Fi 6E)",
      "Free installation",
      "Priority 24/7 customer support",
      "Advanced security suite",
      "Static IP address included",
      "Business-grade SLA",
    ],
    popular: false,
  },
]

export function PackageCards() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const router = useRouter()

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId)
    // Store selected package in sessionStorage for checkout
    sessionStorage.setItem("selectedPackage", packageId)
    router.push("/checkout")
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {packages.map((pkg) => (
        <Card
          key={pkg.id}
          className={`relative border shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 ${
            pkg.popular ? "border-gold ring-2 ring-gold ring-opacity-20" : "border-royal-blue"
          }`}
        >
          {pkg.popular && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 ">
              <Badge className="gold text-white font-bold">Most Popular</Badge>
            </div>
          )}

          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-royal-blue mb-2">{pkg.name}</CardTitle>

            <div className="mb-4">
              <div className="text-4xl font-bold text-royal-blue">
                {pkg.price}
                <span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}/month</div>
            </div>

            <div className="flex items-center justify-center space-x-2 mb-4">
              <Wifi className="h-5 w-5 text-royal-blue" />
              <span className="text-2xl font-bold text-royal-blue font-mono">{pkg.speed}</span>
            </div>

            <p className="text-gray-600">{pkg.description}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <ul className="space-y-3">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button
                onClick={() => handleSelectPackage(pkg.id)}
                className={`w-full btn-3d transition-all duration-200 ${
                  pkg.popular ? "gold text-white " : "royal-blue text-white hover:bg-blue-800"
                }`}
              >
                Select Package
              </Button>
            </div>

            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 pt-2">
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                Free calls
              </div>
              <div className="flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                No contract
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
