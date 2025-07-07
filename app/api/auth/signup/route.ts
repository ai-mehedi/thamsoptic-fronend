import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== "POST") {
        return NextResponse.json(
            { message: 'Method not allowed' },
            { status: 400 }
        );

    }

    const { fullname, email, phone, password } = await req.json();

    if (!fullname || !email || !password) {
        return NextResponse.json(
            { message: 'Missing required fields' },
            { status: 400 }
        );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json(
            { message: 'Email already registered' },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        fullname,
        email,
        phone,
        password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json(
        { message: 'User Creat Succesfully', user: newUser },
        { status: 200 }
    );
}
