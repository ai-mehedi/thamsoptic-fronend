"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const speedTiers = [
  {
    name: "Essential",
    speed: 50,
    price: "£25",
    description: "Perfect for browsing and streaming",
    features: ["1-2 devices", "HD streaming", "Basic gaming"],
  },
  {
    name: "Popular",
    speed: 150,
    price: "£35",
    description: "Great for families and home working",
    features: ["3-5 devices", "4K streaming", "Video calls", "Online gaming"],
    popular: true,
  },
  {
    name: "Superfast",
    speed: 500,
    price: "£45",
    description: "Ultimate performance for power users",
    features: [
      "6+ devices",
      "Multiple 4K streams",
      "Professional gaming",
      "Large downloads",
    ],
  },
  {
    name: "Ultrafast",
    speed: 1000,
    price: "£55",
    description: "Maximum speed for demanding households",
    features: [
      "Unlimited devices",
      "Future-proof",
      "Business use",
      "Instant downloads",
    ],
  },
];

function SpeedGauge({ speed, animated }: { speed: number; animated: boolean }) {
  const percentage = (speed / 1000) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = animated
    ? `${(percentage / 100) * circumference} ${circumference}`
    : "0 283";

  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#002366"
          strokeWidth="8"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-2000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-royal-blue font-mono">
            {speed}
          </div>
          <div className="text-sm text-gray-600">Mbps</div>
        </div>
      </div>
    </div>
  );
}

export function SpeedComparison() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("speed-comparison");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="speed-comparison" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">
            Choose Your Perfect Speed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From casual browsing to professional gaming, we have the right speed
            for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {speedTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative border rounded-md shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 ${
                tier.popular
                  ? "border-gold ring-2 ring-gold ring-opacity-20"
                  : "border-royal-blue"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="gold text-royal-blue px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl text-royal-blue mb-2">
                  {tier.name}
                </CardTitle>
                <SpeedGauge speed={tier.speed} animated={animated} />
                <div className="text-3xl font-bold text-royal-blue">
                  {tier.price}
                  <span className="text-lg font-normal text-gray-600">
                    /month
                  </span>
                </div>
                <p className="text-gray-600">{tier.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 royal-blue rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
