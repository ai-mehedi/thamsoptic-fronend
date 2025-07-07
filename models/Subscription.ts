import mongoose, { Schema, Document } from 'mongoose';

// ----------------------------
// Invoice Subdocument Schema
// ----------------------------
interface IInvoice {
    invoiceId: string;
    amount: number;
    status: 'pending' | 'paid' | 'failed';
    paymentLink: string;
    createdAt: Date;
    paidAt?: Date;
}

// ----------------------------
// Subscription Interface
// ----------------------------
export interface ISubscription extends Document {
    subscriptionId: string;
    userId: mongoose.Types.ObjectId;
    packageId: mongoose.Types.ObjectId;
    baseAmount: number;
    staticIp: boolean;
    totalPrice: number;
    paymentId?: string;
    startDate: Date;
    endDate?: Date;
    nextPaymentDate: Date;
    invoices: IInvoice[];
    creditor?: string;
    billing_request?: string;
    mandate: string;
    customer: string;
    customer_bank_account?: string;

}

// ----------------------------
// Invoice Schema
// ----------------------------
const InvoiceSchema = new Schema<IInvoice>({
    invoiceId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    paymentLink: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    paidAt: { type: Date },
});

// ----------------------------
// Subscription Schema
// ----------------------------
const SubscriptionSchema = new Schema<ISubscription>({
    subscriptionId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    packageId: {
        type: Schema.Types.ObjectId,
        ref: 'Package',
        required: true,
    },
    baseAmount: {
        type: Number,
        required: true,
    },
    staticIp: {
        type: Boolean,
        default: false,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    paymentId: {
        type: String,
        default: null,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        default: null,
    },
    nextPaymentDate: {
        type: Date,
        required: true,
    },
    invoices: {
        type: [InvoiceSchema],
        default: [],
    },

    creditor: { type: String },
    billing_request: { type: String },
    mandate: { type: String },
    customer: { type: String },
    customer_bank_account: { type: String },


});

SubscriptionSchema.pre('save', function (next) {
    if (!this.endDate) {
        const start = this.startDate || new Date();
        this.endDate = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000); // +30 days
    }
    next();
});

// ----------------------------
// Export Model
// ----------------------------
export default mongoose.models.Subscription ||
    mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
