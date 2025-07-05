import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search, CheckCircle, XCircle } from "lucide-react"

const coverageAreas = [
  { city: "London", status: "Available", speed: "Up to 1Gbps" },
  { city: "Manchester", status: "Available", speed: "Up to 500Mbps" },
  { city: "Birmingham", status: "Available", speed: "Up to 1Gbps" },
  { city: "Leeds", status: "Available", speed: "Up to 500Mbps" },
  { city: "Liverpool", status: "Available", speed: "Up to 300Mbps" },
  { city: "Sheffield", status: "Coming Soon", speed: "Up to 1Gbps" },
  { city: "Bristol", status: "Available", speed: "Up to 500Mbps" },
  { city: "Newcastle", status: "Available", speed: "Up to 300Mbps" },
]

export default function CoveragePage() {
  return (
    <main className="min-h-screen py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-royal-blue mb-4">Coverage Areas</h1>
          <div className="w-24 h-1 gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Check if Thamesoptic is available in your area and discover the speeds we offer
          </p>
        </div>

        {/* Postcode Checker */}
        <Card className="max-w-2xl mx-auto shadow-card mb-16">
          <CardHeader>
            <CardTitle className="text-royal-blue text-center flex items-center justify-center">
              <MapPin className="h-6 w-6 mr-2" />
              Check Your Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="postcode">Enter your postcode</Label>
                <div className="relative mt-2 border border-gray-300 !rounded-md">
                  <Input id="postcode" type="text" placeholder="e.g. M1 1AA" className="h-12 pr-12" />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <Button type="submit" className="w-full gold text-white  h-12 btn-3d">
                Check Availability
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Coverage Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coverageAreas.map((area, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-royal-blue mb-3">{area.city}</h3>

                <div className="flex items-center justify-center mb-3">
                  {area.status === "Available" ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-semibold">Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-orange-600">
                      <XCircle className="h-5 w-5 mr-2" />
                      <span className="font-semibold">Coming Soon</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-4">{area.speed}</p>

                <Button
                  variant={area.status === "Available" ? "default" : "outline"}
                  className={
                    area.status === "Available"
                      ? "w-full royal-blue text-white hover:bg-blue-800"
                      : "w-full border-royal-blue text-royal-blue bg-transparent"
                  }
                  disabled={area.status !== "Available"}
                >
                  {area.status === "Available" ? "View Packages" : "Notify Me"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <Card className="max-w-4xl mx-auto shadow-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-royal-blue mb-4">Don't see your area?</h2>
              <p className="text-gray-600 mb-6">
                We're constantly expanding our network. Register your interest and we'll notify you when we're available
                in your area.
              </p>
              <Button className="gold text-royal-blue bg-yellow-400 btn-3d">Register Interest</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
