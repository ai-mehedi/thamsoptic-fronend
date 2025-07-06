// models/Package.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPackage extends Document {
    title: string;
    downloadSpeed: number;
    uploadSpeed: number;
    price: number;
    offerPrice?: number;
    status: 'active' | 'inactive';
    createdAt?: Date;
    updatedAt?: Date;
}

const packageSchema = new Schema<IPackage>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        downloadSpeed: {
            type: Number,
            required: true,
        },
        uploadSpeed: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        offerPrice: {
            type: Number,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

const PackageModel: Model<IPackage> =
    mongoose.models.Package || mongoose.model<IPackage>('Package', packageSchema);

export default PackageModel;
