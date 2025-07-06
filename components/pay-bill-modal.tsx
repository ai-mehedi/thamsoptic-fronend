"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, User, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PayBillModal() {
  const [subscriptionId, setSubscriptionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subscriptionId.trim()) {
      toast({
        title: "Subscription ID Required",
        description: "Please enter your subscription ID",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Payment Initiated",
      description: "You will be redirected to the payment gateway",
    });

    setIsProcessing(false);
    setSubscriptionId("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="  bg-yellow-500 text-royal-blue "
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Pay Bill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gray-50 border-0 p-0">
        <div className="bg-white rounded-lg p-8 m-4">
          <DialogHeader className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-2xl flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Quick Pay
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="customerId" className="text-gray-700 font-medium">
                Customer ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="customerId"
                  type="text"
                  placeholder="Ex: 123456"
                  value={subscriptionId}
                  onChange={(e) => setSubscriptionId(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl btn-3d"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  Pay Now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          {/* Payment Methods */}
          <div className="flex items-center justify-center space-x-6 mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-pink-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">b</span>
              </div>
              <span className="text-pink-500 font-semibold">Kash</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div className="w-8 h-6 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">MC</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
