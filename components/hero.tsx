"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Search, Zap, Shield, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export function Hero() {
  const [postcode, setPostcode] = useState("")
  const [addresses, setAddresses] = useState<string[]>([])
  const [selectedAddress, setSelectedAddress] = useState("")
  const [showAddresses, setShowAddresses] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const validatePostcode = (code: string) => {
    const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i
    return ukPostcodeRegex.test(code.replace(/\s/g, ""))
  }

  const handlePostcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePostcode(postcode)) {
      toast({
        title: "Invalid Postcode",
        description: "Please enter a valid UK postcode",
        variant: "destructive",
      })
      return
    }

    const mockAddresses = [
      `1 High Street, ${postcode}`,
      `2 High Street, ${postcode}`,
      `3 High Street, ${postcode}`,
      `Flat 1, 10 Main Road, ${postcode}`,
      `Flat 2, 10 Main Road, ${postcode}`,
    ]

    setAddresses(mockAddresses)
    setShowAddresses(true)

    toast({
      title: "Addresses Found",
      description: "Please select your address from the list",
    })
  }

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address)
    router.push("/packages")
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 royal-blue">

<div 
  className="absolute inset-0 bg-[url('/heroimage.jpg')] bg-cover bg-center bg-no-repeat"
>
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/10 to-blue-700/10"></div>
</div>        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="fiber" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
                <line x1="0" y1="10" x2="20" y2="10" stroke="white" strokeWidth="0.5" opacity="0.2" />
                <line x1="10" y1="0" x2="10" y2="20" stroke="white" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#fiber)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
                Superfast Fiber
                <span className="block text-gold">Broadband</span>
              </h1>

              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-lg">
                Unlimited data, unlimited calls, blazing speeds from just £25/month
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gold rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-royal-blue" />
                </div>
                <div>
                  <p className="font-semibold">Up to 1Gbps</p>
                  <p className="text-sm opacity-75">Lightning fast</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gold rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-royal-blue" />
                </div>
                <div>
                  <p className="font-semibold">Price Lock</p>
                  <p className="text-sm opacity-75">24 months</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 gold rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-royal-blue" />
                </div>
                <div>
                  <p className="font-semibold">Free Setup</p>
                  <p className="text-sm opacity-75">Within 2 weeks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Postcode Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-royal-blue mb-2">Check Availability</h2>
                <p className="text-gray-600">Enter your postcode to get started</p>
              </div>

              <form onSubmit={handlePostcodeSubmit} className="space-y-6">
                <div className="relative">
                  <Label htmlFor="postcode" className="sr-only">
                    Enter your postcode
                  </Label>
                  <div className="relative">
                    <Input
                      id="postcode"
                      type="text"
                      placeholder="Enter your postcode"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      className="h-14 text-lg border-2 border-gray-200 focus:border-royal-blue pulse-animation"
                      required
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  </div>
                </div>

                {showAddresses && addresses.length > 0 && (
                  <div className="animate-fade-in">
                    <Label htmlFor="address" className="block text-left mb-2 text-royal-blue font-medium">
                      Select your address:
                    </Label>
                    <Select onValueChange={handleAddressSelect} >
                      <SelectTrigger className="h-14 text-lg border-2 bg-white border-gray-200 focus:border-royal-blue">
                        <SelectValue placeholder="Choose your address" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {addresses.map((address, index) => (
                          <SelectItem key={index} value={address}>
                            {address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg gold text-white shadow-lg btn-3d transition-all duration-200 font-semibold"
                >
                  Check Availability
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">Free installation • No setup fees • 24/7 support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
