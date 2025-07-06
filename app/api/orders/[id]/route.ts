import connectDB from '@/lib/dbConnect';
import Order from '@/models/order';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
    params: { id: string };
}

// GET single order
export async function GET(req: NextRequest, { params }: Params) {
    try {
        const {id}=await params;
        await connectDB();
        const order = await Order.findById(id);
        if (!order) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });

        return NextResponse.json({ success: true, order });
    } catch (err) {
        return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}

// UPDATE order
export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const {id}=await params;
        await connectDB();
        const body = await req.json();
        const updated = await Order.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });

        return NextResponse.json({ success: true, order: updated });
    } catch (err) {
        return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}

// DELETE order
export async function DELETE(req: NextRequest, { params }: Params) {
    try {
        const {id}=await params;
        await connectDB();
        const deleted = await Order.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });

        return NextResponse.json({ success: true, message: 'Order deleted' });
    } catch (err) {
        return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}
