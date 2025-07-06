"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Wifi, Phone, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

type Package = {
  _id: string;
  name: string;
  downloadSpeed: string;
  price: string;
  originalPrice?: string;
  description?: string;
  features?: string[];
  popular?: boolean;
  title?: string;
};

export function PackageCards() {
  const [packages, setPackages] = useState<Package[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleSelectPackage = (pkg: Package) => {
    // Store the entire package object in session storage
    sessionStorage.setItem("selectedPackage", JSON.stringify(pkg));
    router.push(`/checkout?package=${pkg._id}`);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 px-4">
      {packages.map((pkg, index) => (
        <Card
          key={index}
          className="flex flex-col w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-1.5rem)] max-w-sm"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary uppercase">
              {pkg.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground -mt-1">
              fibre broadband
            </p>
          </CardHeader>

          <CardContent className="flex-grow">
            <div className="space-y-4">
              {/* Speed */}
              <div>
                <p className="text-sm text-muted-foreground">
                  Estimated Download Speed
                </p>
                <p className="text-2xl font-bold text-primary">
                  {pkg.downloadSpeed}Mbit/s
                </p>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Is this speed right for you?
                </p>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm">Ideal for business use</p>
                </div>
                <div className="flex items-start">
                  <Check className="w-4 h-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm">Heavier users</p>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <p className="text-xl font-bold text-primary">£{pkg.price}</p>
                <p className="text-xs text-muted-foreground">
                  per month (includes Line Rental)
                </p>
                <p className="text-xs text-muted-foreground">
                  Free Setup*, £9.99 Router Delivery
                </p>
              </div>
            </div>
          </CardContent>

          <div className="p-6 pt-0">
            <Button className="w-full" onClick={() => handleSelectPackage(pkg)}>
              Select Package
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
