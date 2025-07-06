// app/api/subscriptions/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Your MongoDB connection
import Subscription from '@/models/Subscription';
import { generateSubscriptionId } from '@/utils/generateSubscriptionId';

export async function GET() {
    await dbConnect();
    const subscriptions = await Subscription.find().populate('userId packageId');
    return NextResponse.json(subscriptions);
}

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();

    const {
        userId,
        packageId,
        baseAmount,
        staticIp,
        paymentId,
        startDate = new Date(),
    } = body;

    const staticIpPrice = staticIp ? 7 : 0;
    const totalPrice = baseAmount + staticIpPrice;

    const nextPaymentDate = new Date(startDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

    const subscription = await Subscription.create({
        subscriptionId: generateSubscriptionId(),
        userId,
        packageId,
        baseAmount,
        staticIp,
        totalPrice,
        paymentId,
        startDate,
        nextPaymentDate,
    });

    return NextResponse.json(subscription, { status: 201 });
}
