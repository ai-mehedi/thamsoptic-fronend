import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { compare } from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }
    interface User extends DefaultUser {
        id: string;
        role: string;
    }
}

interface ExtendedUser {
    id: string;
    role: string;
    phone?: string | null;
    address?: string | null;
    profilePicture?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    createdAt?: String | Date | null;
}
const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();

                if (!credentials?.email || !credentials.password) {
                    throw new Error("Missing email or password");
                }

                const user = await User.findOne({ email: credentials.email });
                if (!user || !user.password) {
                    throw new Error("No user found");
                }

                const isValid = await compare(credentials.password, user.password);


                if (!isValid) {

                    throw new Error("Invalid password");
                }

                return {
                    id: (user as { _id: { toString: () => string } })._id.toString(),
                    email: user.email,
                    name: user.fullname,
                    role: user.role,
                    profilePicture: user.profilePicture || "/profile.png",
                    phone: user.phone,
                    address: user.address,
                    createdAt: (user as any).createdAt || null,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {

                token.id = user.id;
                token.name = user.name || null; // Optional, if you want to include name
                token.email = user.email || null; // Optional, if you want to include email
                token.role = (user as any).role || "user";
                token.phone = (user as any).phone || null;       // Add this line
                token.address = (user as any).address || null;   // Optional, if you want address too
                token.profilePicture = (user as any).profilePicture || null; // Optional
                token.createdAt = (user as any).createdAt || null; // Optional, if you want createdAt
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                const user = session.user as ExtendedUser;
                user.id = token.id as string;
                user.name = token.name as string | null;
                user.email = token.email as string | null;
                user.role = token.role as string;
                user.phone = token.phone as string | null;
                user.address = token.address as string | null;
                user.profilePicture = token.profilePicture as string | null;
                user.createdAt = token.createdAt as Date | null;
            }
            return session;
        },
    },
    events: {
        async signIn({ user, account, profile }) {
            await dbConnect();

            if (!account || !profile) return;

            if (account.provider === "google") {
                const googleId = (profile as { sub?: string }).sub;
                await User.findOneAndUpdate(
                    { googleId },
                    {
                        fullname: profile.name || user.name,
                        email: user.email,
                        googleId,
                    },
                    { upsert: true, new: true }
                );
            } else if (account.provider === "facebook") {
                const facebookId = (profile as { id?: string }).id;
                await User.findOneAndUpdate(
                    { facebookId },
                    {
                        fullname: profile.name || user.name,
                        email: user.email,
                        facebookId,
                    },
                    { upsert: true, new: true }
                );
            }
        },
    },

    pages: {
        signIn: "/login",
    },
});

// **IMPORTANT**: Export named handlers for HTTP methods:
export { handler as GET, handler as POST };
