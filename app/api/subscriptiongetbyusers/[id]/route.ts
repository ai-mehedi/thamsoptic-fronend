import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Subscription from '@/models/Subscription';
import { Types } from 'mongoose';

interface Params {
    params: {
        id: string;
    };
}

export async function GET(_req: Request, { params }: Params) {
    const { id } = await params;


    if (!Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 });
    }

    await dbConnect();

    try {
        const subscriptions = await Subscription.find({ userId: id }).populate('packageId');
        console.log('Subscriptions found:', subscriptions);
        if (!subscriptions || subscriptions.length === 0) {
            return NextResponse.json({ message: 'No subscriptions found' }, { status: 404 });
        }

        return NextResponse.json(subscriptions);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
