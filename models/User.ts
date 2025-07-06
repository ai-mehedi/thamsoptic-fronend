import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    fullname: string;
    email: string;
    password?: string;
    phone?: string;
    role: 'user' | 'admin';
    address?: string;
    googleId?: string;
    facebookId?: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    gocardlessMandateId?: string;
    profilePicture?: string;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        fullname: { type: String, required: true, trim: true },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
        },

        phone: { type: String },
        profilePicture: { type: String, default: '/profile.png' },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },

        address: { type: String },

        googleId: { type: String, unique: true, sparse: true },
        facebookId: { type: String, unique: true, sparse: true },

        stripeCustomerId: { type: String, unique: true, sparse: true },
        stripeSubscriptionId: { type: String, unique: true, sparse: true },

        gocardlessMandateId: { type: String, unique: true, sparse: true },
    },
    { timestamps: true }
);

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
