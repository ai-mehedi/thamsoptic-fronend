import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api-sandbox.gocardless.com";

export async function POST(req: NextRequest) {
  const accessToken = process.env.GOCARDLESS_ACCESS_TOKEN;
  if (!accessToken) return NextResponse.json({ error: "No access token" }, { status: 500 });

  const {
    redirectFlowId,
    sessionToken,
    amount,
    currency,
    description,
    firstName,
    lastName,
    userid, packageId, subscriptionId, orderId
  } = await req.json();
  const amountDecimal = parseFloat(amount);      // e.g. "14.99"
  const amountMinorUnits = Math.round(amountDecimal * 100);  // 1499
  console.log("amountMinorUnits", subscriptionId, orderId);
  if (!redirectFlowId || !sessionToken) {
    return NextResponse.json({ error: "Missing redirectFlowId or sessionToken" }, { status: 400 });
  }

  if (!amount || !currency) {
    return NextResponse.json({ error: "Missing amount or currency" }, { status: 400 });
  }

  try {
    // Complete redirect flow
    const completeRes = await fetch(`${BASE_URL}/redirect_flows/${redirectFlowId}/actions/complete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "GoCardless-Version": "2015-07-06",
      },
      body: JSON.stringify({
        data: { session_token: sessionToken },
      }),
    });

    const completeData = await completeRes.json();

    if (!completeRes.ok) {
      return NextResponse.json(completeData, { status: completeRes.status });
    }

    const mandateId = completeData.redirect_flows.links.mandate;

    if (!mandateId) {
      return NextResponse.json({ error: "Mandate ID not found" }, { status: 500 });
    }

    // Optional: Save firstName, lastName, customerId etc. to your DB here
    // You can also update customer info via GoCardless API if needed

    // Create payment
    const paymentRes = await fetch(`${BASE_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "GoCardless-Version": "2015-07-06",
      },
      body: JSON.stringify({
        payments: {
          amount: amountMinorUnits, // in pence
          currency,
          description: description || "Payment",
          links: {
            mandate: mandateId,
          },
        },
      }),
    });

    const paymentData = await paymentRes.json();
    if (!paymentData.payments || !paymentData.payments.id) {
      return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
    }
    
    if (!paymentRes.ok) {
      return NextResponse.json(paymentData, { status: paymentRes.status });
    }

    const subscriptionupdate = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/subscriptions/${subscriptionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId: paymentData.payments.id,
        invoices: [{
          invoiceId: paymentData.payments.id,
          amount: paymentData.payments.amount,
          status: "paid",
          paidAt: new Date(),
          paymentLink: completeData.confirmation_url,
        }],
       
          creditor: completeData.redirect_flows.links.creditor,
          billing_request: completeData.redirect_flows.links.billing_request,
          mandate: completeData.redirect_flows.links.mandate,
          customer: completeData.redirect_flows.links.customer,
          customer_bank_account: completeData.redirect_flows.links.customer_bank_account,
        
      }),
    })

    if (!subscriptionupdate.ok) {
      return NextResponse.json({ error: "Subscription update failed" }, { status: subscriptionupdate.status });
    }

    const orderupdate = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentStatus: "paid",
      }),
    })

    if (!orderupdate.ok) {
      return NextResponse.json({ error: "Order update failed" }, { status: orderupdate.status });
    }


    // Return combined data (redirect flow + payment)
    return NextResponse.json({
      redirectFlow: completeData.redirect_flows,
      payment: paymentData.payments,
    });
  } catch (error: any) {
    console.log("Error completing redirect flow:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
