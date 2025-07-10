import GoCardlessSuccessPage from "@/components/GoCardlessSuccessPage";
import React from "react";
import { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <GoCardlessSuccessPage />
      </Suspense>
    </div>
  );
}
