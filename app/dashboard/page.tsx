"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, Calendar, CreditCard, Settings, BarChart, User, Phone } from "lucide-react"

// Mock user data - in a real app, this would come from an API
const userData = {
  name: "John Smith",
  email: "john.smith@email.com",
  subscriptionId: "SUB-1703123456-ABC123DEF",
  package: {
    name: "Popular",
    speed: "150 Mbps",
    price: 35,
  },
  nextPayment: "2024-02-15",
  dataUsage: {
    used: 245,
    total: "Unlimited",
    percentage: 0, // Unlimited so no percentage
  },
  accountStatus: "Active",
  joinDate: "2023-08-15",
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-royal-blue mb-2">My Account</h1>
          <p className="text-gray-600">Manage your broadband service and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Package */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-royal-blue flex items-center">
                  <Wifi className="h-5 w-5 mr-2" />
                  Current Package
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-royal-blue">{userData.package.name}</h3>
                    <p className="text-gray-600">{userData.package.speed} broadband</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">{userData.accountStatus}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-royal-blue">£{userData.package.price}</div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button className="gold text-royal-blue hover:bg-yellow-400">Upgrade Package</Button>
                  <Button variant="outline" className="border-royal-blue text-royal-blue bg-transparent">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-royal-blue flex items-center">
                  <BarChart className="h-5 w-5 mr-2" />
                  Usage This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Data Usage</span>
                      <span className="text-sm text-gray-600">
                        {userData.dataUsage.used}GB / {userData.dataUsage.total}
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-royal-blue h-2 rounded-full w-1/4"></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Unlimited data - no worries about usage!</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-royal-blue">99.9%</div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">145</div>
                      <div className="text-sm text-gray-600">Avg Speed (Mbps)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-royal-blue">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Payment Processed</p>
                      <p className="text-sm text-gray-600">Monthly subscription - £{userData.package.price}</p>
                    </div>
                    <div className="text-sm text-gray-500">Jan 15, 2024</div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Service Update</p>
                      <p className="text-sm text-gray-600">Router firmware updated</p>
                    </div>
                    <div className="text-sm text-gray-500">Jan 10, 2024</div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Welcome Email Sent</p>
                      <p className="text-sm text-gray-600">Account setup completed</p>
                    </div>
                    <div className="text-sm text-gray-500">Aug 15, 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-royal-blue flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium">{userData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Subscription ID</p>
                  <p className="font-mono text-sm">{userData.subscriptionId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-medium">
                    {new Date(userData.joinDate).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Button variant="outline" className="w-full border-royal-blue text-royal-blue bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Next Payment */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-royal-blue flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Next Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-royal-blue mb-2">£{userData.package.price}</div>
                  <div className="flex items-center justify-center text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(userData.nextPayment).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <Button variant="outline" className="w-full border-royal-blue text-royal-blue bg-transparent">
                    Update Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-royal-blue">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-royal-blue text-royal-blue bg-transparent"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-royal-blue text-royal-blue bg-transparent"
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  View Usage History
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-royal-blue text-royal-blue bg-transparent"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
