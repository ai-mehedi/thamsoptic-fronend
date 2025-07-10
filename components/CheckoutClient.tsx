"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSearchParams, useRouter } from "next/navigation";
import { create } from "domain";
import GoCardlessPayButton from "@/components/GoCardlessPayButton";
import { useSession } from "next-auth/react";

interface Addon {
  name: string;
  price: number;
  monthly?: boolean;
}

interface Package {
  _id: string;
  title: string;
  price: number;
  downloadSpeed?: string;
  description?: string;
  subscriptionprice?: number;
}

const addons: Record<string, Addon> = {
  router: { name: "Router", price: 9.99 },
  staticIp: { name: "Static IP", price: 2, monthly: true },
};

interface Order {
  userId: string;
  packageId: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  subscriptionId: string;
  router: boolean;
  staticIp: boolean;
  status: "pending" | "active" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "failed";
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const packageId = searchParams.get("package") || "popular";

  const [selectedPackage, setSelectedPackage] = useState<Package>();
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>(
    {
      router: false,
      staticIp: false,
    }
  );
  const { data: session, status } = useSession();

  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const selectPackageById = async (id: string) => {
      const response = await fetch(`/api/packages/${id}`);
      if (!response.ok) {
        setError("Failed to fetch package");
        return;
      }
      const data = await response.json();
      setSelectedPackage(data);
    };
    selectPackageById(packageId);
  }, [packageId]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.origin) return;

      if (event.data.status === "success") {
        alert("Payment completed successfully!");
        // Reload or update UI here if needed
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const calculatePrices = () => {
    const basePrice = selectedPackage?.price ?? 0;

    // Router is one-time price
    const routerPrice = selectedAddons.router ? addons.router.price : 0;

    // Static IP is monthly subscription price
    const staticIpPrice = selectedAddons.staticIp ? addons.staticIp.price : 0;

    // Subscription subtotal includes base package + static IP monthly price
    const subscriptionSubtotal = basePrice + staticIpPrice;

    const totalpackages = basePrice + staticIpPrice + routerPrice;

    // Discount applies only to subscription subtotal (not one-time router fee)
    const discountedSubscriptionPrice = subscriptionSubtotal * (1 - discount);

    // Total includes discounted subscription + router one-time fee
    const total = discountedSubscriptionPrice + routerPrice + staticIpPrice;

    return {
      subscriptionSubtotal,
      totalpackages,
      discountedSubscriptionPrice,
      routerPrice,
      total,
    };
  };

  const {
    subscriptionSubtotal,
    discountedSubscriptionPrice,
    routerPrice,
    total,
    totalpackages,
  } = calculatePrices();

  async function startPayment(
    userid: string,
    packageId: string,
    subscriptionId: string,
    orderId: string
  ) {
    try {
      const res = await fetch("/api/gocardless/create-redirect-flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          email: customerInfo.email,
          firstName: customerInfo.fullName.split(" ")[0],
          lastName: customerInfo.fullName.split(" ")[1] || "",
          description: selectedPackage?.title || "Order Payment",
          userid: userid,
          packageId: packageId,
          subscriptionId: subscriptionId,
          orderId: orderId,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert("Failed to start payment: " + JSON.stringify(data));
        return;
      }

      const popup = window.open(
        data.redirectUrl,
        "GoCardlessPayment",
        "width=600,height=700"
      );

      if (!popup) {
        alert("Please enable popups for this site");
      }
    } catch (err) {
      alert("Error starting payment: " + err);
    }
  }
  // Calculate prices

  // This is the toggleAddon function
  const toggleAddon = (key: string) => {
    setSelectedAddons((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (session?.user) {
      setCustomerInfo((prev) => ({
        ...prev,
        fullName: session.user.name || prev.fullName,
        email: session.user.email || prev.email,
        // Phone and address probably not in session, so leave as is
      }));
    }
  }, [session]);

  const handleInputChange = (
    field: keyof typeof customerInfo,
    value: string
  ) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "save25") {
      setDiscount(0.25);
      setError("");
    } else {
      setDiscount(0);
      setError("Invalid promo code");
    }
  };

  const isFormValid = Object.values(customerInfo).every(
    (value) => value.trim() !== ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      let userId: string;

      if (session?.user && session.user.id) {
        // User is logged in
        userId = session.user.id;
      } else {
        // User not logged in, do signup first
        const userssignup = {
          fullname: customerInfo.fullName,
          email: customerInfo.email,
          password: customerInfo.password,
          phone: customerInfo.phone,
          address: customerInfo.address,
        };

        const signupResponse = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userssignup),
        });

        if (!signupResponse.ok) {
          throw new Error("User signup failed");
        }

        const signupResult = await signupResponse.json();
        userId = signupResult.user._id;
      }

      const subscription = {
        userId: userId, // Assuming the signup response contains user ID
        packageId: selectedPackage?._id,
        baseAmount: selectedPackage?.price || 0,
        staticIp: selectedAddons.staticIp,
        totalPrice: subscriptionSubtotal,
      };
      const subscriptionResponse = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      if (!subscriptionResponse.ok) {
        throw new Error("Subscription creation failed");
      }
      const subscriptionResult = await subscriptionResponse.json();
      console.log("Subscription Result:", subscriptionResult);
      // Prepare order payload
      const orderPayload = {
        userId: userId, // Assuming the signup response contains user ID
        packageId: selectedPackage?._id,
        subscriptionId: subscriptionResult._id,
        fullName: customerInfo.fullName,
        email: customerInfo.email,
        password: customerInfo.password,
        phone: customerInfo.phone,
        address: customerInfo.address,
        router: selectedAddons.router,
        staticIp: selectedAddons.staticIp,
        totalAmount: totalpackages,
        status: "pending",
        paymentStatus: "unpaid",
        shippingAddress: customerInfo.address,
      };

      // Send order to backend
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!orderResponse.ok) {
        throw new Error("Order submission failed");
      }

      const orderResult = await orderResponse.json();
      console.log(
        "Order Result:",
        userId,
        subscriptionResult._id,
        orderResult.order._id
      );

      if (selectedPackage) {
        startPayment(
          userId,
          selectedPackage._id,
          subscriptionResult._id,
          orderResult.order._id
        );
      }
    } catch (err) {
      setError((err as Error).message || "Failed to process order");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Packages & Addons */}
        <section className="col-span-2 bg-white p-6 sm:p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Complete Your Order</h2>

          {/* Selected Package */}
          <div className="mb-8 p-4 border border-blue-200 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Your Selected Package
            </h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{selectedPackage?.title}</p>
                {selectedPackage?.downloadSpeed && (
                  <p className="text-sm text-gray-600">
                    {selectedPackage.downloadSpeed} Download Speed
                  </p>
                )}
              </div>
              <p className="font-semibold">
                £{selectedPackage?.price.toFixed(2)}/month
              </p>
            </div>
          </div>

          {/* Add-ons */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Network Options</h3>
            <div className="space-y-3">
              {/* Router Option */}
              <label
                htmlFor="addon-router"
                className={`flex items-center justify-between p-4 border rounded-lg transition-all cursor-pointer shadow-sm ${
                  selectedAddons.router
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400 bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-blue-500 text-2xl">📶</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {addons.router.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      High-performance wireless router
                    </div>
                    <div className="text-sm font-semibold text-gray-700 mt-1">
                      £{addons.router.price.toFixed(2)} one-time
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="addon-router"
                  checked={selectedAddons.router}
                  onChange={() => toggleAddon("router")}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
              </label>

              {/* Static IP Option */}
              <label
                htmlFor="addon-staticIp"
                className={`flex items-center justify-between p-4 border rounded-lg transition-all cursor-pointer shadow-sm ${
                  selectedAddons.staticIp
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-blue-400 bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-blue-500 text-2xl">🌐</span>
                  <div>
                    <div className="font-medium text-gray-900">
                      {addons.staticIp.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      Fixed public IP address
                    </div>
                    <div className="text-sm font-semibold text-gray-700 mt-1">
                      £{addons.staticIp.price.toFixed(2)}/month
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="addon-staticIp"
                  checked={selectedAddons.staticIp}
                  onChange={() => toggleAddon("staticIp")}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Customer Information Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-semibold mb-4">Customer Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={customerInfo.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  required
                  placeholder="Full Name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  placeholder="Email Address"
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={customerInfo.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  placeholder="Phone Number"
                />
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="address">Installation Address *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                  placeholder="Address for installation"
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            {/* Submit button moved inside form for accessibility */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full py-6 text-base font-normal mt-6"
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>Pay with </span>
                  <span className="font-bold">GO</span>
                  <span>CARDLESS</span>
                </>
              )}
            </Button>
            <GoCardlessPayButton />
          </form>
        </section>

        {/* Right side - Order Summary */}
        <aside className="bg-white p-6 sm:p-8 rounded-md shadow-md sticky top-12 h-fit">
          <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Package:</span>
              <span className="font-medium">
                £{selectedPackage?.price.toFixed(2)}/mo
              </span>
            </div>

            {selectedAddons.router && (
              <div className="flex justify-between">
                <span className="text-gray-600">Router:</span>
                <span className="font-medium">
                  £{addons.router.price.toFixed(2)}
                </span>
              </div>
            )}

            {selectedAddons.staticIp && (
              <div className="flex justify-between">
                <span className="text-gray-600">Static IP:</span>
                <span className="font-medium">
                  £{addons.staticIp.price.toFixed(2)}/mo
                </span>
              </div>
            )}

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-{(discount * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Total:</span>
            <span>£{totalpackages.toFixed(2)}</span>
          </div>

          <div className="mb-6">
            <Label htmlFor="promoCode">Promo Code</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="promoCode"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button onClick={applyPromo} variant="outline" type="button">
                Apply
              </Button>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            By completing your purchase, you agree to our Terms of Service and
            Privacy Policy.
          </div>
        </aside>
      </div>
    </main>
  );
}
