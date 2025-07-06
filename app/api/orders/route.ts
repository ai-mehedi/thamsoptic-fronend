import connectDB from '@/lib/dbConnect';
import Order from '@/models/order';
import { NextRequest, NextResponse } from 'next/server';

// CREATE order
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const newOrder = await Order.create(body);
    return NextResponse.json({ success: true, order: newOrder });
  } catch (err) {
    console.log("Error creating order:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}

// GET all orders
export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (err) {
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
