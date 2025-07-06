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

export default NextAuth({
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
        token.role = (user as any).role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      if (!account || !profile) return;

      if (account.provider === "google") {
        // profile.sub is Google user id
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
        // profile.id is Facebook user id
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
    signIn: "/auth/signin",
  },
});
