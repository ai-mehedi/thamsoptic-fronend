// app/api/subscriptions/[id]/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Your MongoDB connection
import Subscription from '@/models/Subscription';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  await dbConnect();
  const sub = await Subscription.findById(id).populate('userId packageId');
  if (!sub) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(sub);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = await params;
  console.log("id", id);
  const update = await req.json();
  console.log("update", update);
  const sub = await Subscription.findByIdAndUpdate(id, update, { new: true });
  if (!sub) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json(sub);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = await params;
  const result = await Subscription.findByIdAndDelete(id);
  if (!result) return NextResponse.json({ message: 'Not found' }, { status: 404 });
  return NextResponse.json({ message: 'Subscription deleted' });
}
