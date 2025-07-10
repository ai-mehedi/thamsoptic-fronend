import CheckoutClient from "@/components/CheckoutClient";
import React from "react";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <CheckoutClient />
      </Suspense>
    </div>
  );
}
