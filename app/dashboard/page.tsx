"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wifi,
  Calendar,
  CreditCard,
  Settings,
  BarChart,
  User,
  Phone,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";

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
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  type Subscription = {
    packageId: {
      title: string;
      downloadSpeed: string;
      status: string;
      price: number;
    };
    subscriptionId: string;
    startDate: Date;

    invoices: [
      {
        invoiceId: string;
        amount: number;
        status: string;
        paymentLink: string;
        createdAt: Date;
        paidAt?: Date;
      }
    ];
  };

  const [subscriptionData, setSubscriptionData] = useState<Subscription[]>([]);
  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchSubscriptionData = async () => {
      const response = await fetch(
        `/api/subscriptiongetbyusers/${session?.user.id}`
      );
      if (!response.ok) {
        console.error("Failed to fetch subscription data");
        return;
      }
      const data = await response.json();
      setSubscriptionData(data);
      console.log("Fetched subscription data:", data);
    };
    fetchSubscriptionData();
  }, [session, status]);

  return (
    <main className="min-h-screen py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-royal-blue mb-2">
            My Account
          </h1>
          <p className="text-gray-600">
            Manage your broadband service and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Package */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-royal-blue flex items-center">
                  Current Package
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-royal-blue">
                      {subscriptionData[0]?.packageId.title}
                    </h3>
                    <p className="text-gray-600">
                      {subscriptionData[0]?.packageId.downloadSpeed} Mbit/s
                    </p>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      {subscriptionData[0]?.packageId.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-royal-blue">
                      £{subscriptionData[0]?.packageId.price}
                    </div>
                    <div className="text-sm text-gray-600">per month</div>
                  </div>
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
                    <p className="text-xs text-gray-500 mt-1">
                      Unlimited data - no worries about usage!
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-royal-blue">
                        99.9%
                      </div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        145
                      </div>
                      <div className="text-sm text-gray-600">
                        Avg Speed (Mbps)
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-royal-blue">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptionData[0]?.invoices.map((invoice, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b"
                    >
                      <div>
                        <p className="font-medium">Payment Processed</p>
                        <p className="text-sm text-gray-600">
                          Invoice ID: {invoice?.invoiceId}
                        </p>
                        <p className="text-sm text-gray-600">
                          Monthly subscription - £
                          {(invoice?.amount / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {invoice?.paidAt
                          ? new Date(invoice.paidAt).toLocaleDateString(
                              "en-GB",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "Not paid"}
                      </div>
                    </div>
                  ))}
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
                  <p className="font-medium">{session?.user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{session?.user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Subscription ID</p>
                  <p className="font-mono text-sm">
                    {subscriptionData[0]?.subscriptionId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-medium">
                    {(session?.user as any)?.createdAt
                      ? new Date(
                          (session?.user as any).createdAt
                        ).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "No date available"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-royal-blue text-royal-blue bg-transparent"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>

                <Button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  variant="outline"
                  className="w-full  text-white bg-red-500"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Logout
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
                  <div className="text-2xl font-bold text-royal-blue mb-2">
                    £{subscriptionData[0]?.packageId.price}
                  </div>
                  <div className="flex items-center justify-center text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    {(() => {
                      const startDate = new Date(
                        subscriptionData[0]?.startDate
                      );
                      if (!startDate) return null;

                      // Add 30 days (30 * 24 * 60 * 60 * 1000 ms)
                      const endDate = new Date(
                        startDate.getTime() + 30 * 24 * 60 * 60 * 1000
                      );

                      return endDate.toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      });
                    })()}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-royal-blue text-royal-blue bg-transparent"
                  >
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
  );
}
