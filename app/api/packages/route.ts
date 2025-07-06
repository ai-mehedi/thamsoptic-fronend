import { NextRequest, NextResponse } from 'next/server';
import  dbConnect  from '@/lib/dbConnect';
import PackageModel from '@/models/Package';

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data = await req.json();
    const created = await PackageModel.create(data);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const packages = await PackageModel.find().sort({ createdAt: -1 });
    return NextResponse.json(packages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
