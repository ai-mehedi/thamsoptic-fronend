"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function GoCardlessSuccessPage() {
  const searchParams = useSearchParams();
  const redirectFlowId = searchParams.get("redirect_flow_id");
  const sessionToken = searchParams.get("session_token");
  const amount = searchParams.get("amount");
  const description = searchParams.get("description");
  const firstName = searchParams.get("first_name");
  const lastName = searchParams.get("last_name");

  const subscriptionId = searchParams.get("subscriptionId");
  const orderId = searchParams.get("orderId");
  const packageId = searchParams.get("packageId");
  const userid = searchParams.get("userid");
  // Optional: display status messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!redirectFlowId || !sessionToken) {
      setError("Missing redirect_flow_id or session_token in URL.");
      setLoading(false);
      return;
    }

    async function completeAndPay() {
      setLoading(true);
      try {
        const res = await fetch("/api/gocardless/complete-redirect-flow", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            redirectFlowId,
            sessionToken,
            amount: amount, // example amount in pence (e.g. £15)
            currency: "GBP",
            firstName: firstName || "",
            lastName: lastName || "",
            description: description,
            userid,
            packageId,
            subscriptionId,
            orderId,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          console.log("Payment success:", data);

          // Notify opener and close popup
          if (window.opener) {
            window.opener.postMessage(
              { status: "success", data, redirect: "/home" },
              window.origin
            );
          }
          window.close();
        } else {
          setError(`Payment failed: ${JSON.stringify(data)}`);
        }
      } catch (err: any) {
        setError(`Error completing payment: ${err.message || err}`);
      } finally {
        setLoading(false);
      }
    }

    completeAndPay();
  }, [redirectFlowId, sessionToken]);

  if (loading) return <p>Processing your payment, please wait...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return null; // or show a fallback UI
}
