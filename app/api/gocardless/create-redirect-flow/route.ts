import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const {
    amount,
    description,
    firstName,
    email,
    lastName,
    userid, packageId, subscriptionId, orderId
  } = await req.json();

  const accessToken = process.env.GOCARDLESS_ACCESS_TOKEN;
  if (!accessToken) return NextResponse.json({ error: 'No access token' }, { status: 500 });

  const sessionToken = crypto.randomUUID(); // generate per request
  const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/gocardless/success?session_token=${sessionToken}&userid=${userid}&packageId=${packageId}&subscriptionId=${subscriptionId}&orderId=${orderId}&amount=${amount}&description=${description}&first_name=${firstName}&last_name=${lastName}&email=${email}`;

  const response = await fetch('https://api-sandbox.gocardless.com/redirect_flows', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'GoCardless-Version': '2015-07-06',
    },
    body: JSON.stringify({
      redirect_flows: {
        description: 'Order payment',
        session_token: sessionToken,
        success_redirect_url: successUrl,
      },
    }),
  });

  const data = await response.json();
  console.log('GoCardless redirect flow response:', data);

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  // also return sessionToken so the client can remember it if needed
  return NextResponse.json({
    redirectUrl: data.redirect_flows.redirect_url,
    sessionToken,
  });
}
