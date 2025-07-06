import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import PackageModel from '@/models/Package';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = await params;
    try {
        const item = await PackageModel.findById(id);
        if (!item) return NextResponse.json({ message: 'Package not found' }, { status: 404 });
        return NextResponse.json(item);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = await params;
    try {
        const data = await req.json();
        const updated = await PackageModel.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!updated) return NextResponse.json({ message: 'Package not found' }, { status: 404 });
        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    await dbConnect();
    const { id } = await params;
    try {
        const deleted = await PackageModel.findByIdAndDelete(id);
        if (!deleted) return NextResponse.json({ message: 'Package not found' }, { status: 404 });
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
