import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId;
    packageId: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    subscriptionId: mongoose.Types.ObjectId;
    router: boolean;
    staticIp: boolean;
    status: 'pending' | 'active' | 'cancelled';
    paymentStatus: 'unpaid' | 'paid' | 'failed';
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
    shippingAddress?: string;
}

const OrderSchema = new Schema<IOrder>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        packageId: { type: Schema.Types.ObjectId, ref: 'Package', required: true },

        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        totalAmount: { type: Number, required: true },
        subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription', required: true },

        router: { type: Boolean, default: false },
        staticIp: { type: Boolean, default: false },

        status: {
            type: String,
            enum: ['pending', 'active', 'cancelled'],
            default: 'pending',
        },

        paymentStatus: {
            type: String,
            enum: ['unpaid', 'paid', 'failed'],
            default: 'unpaid',
        },
        shippingAddress: {
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
