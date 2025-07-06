// POST: Create user | GET: Get all users
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect  from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const newUser = await User.create(body);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();

  try {
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
