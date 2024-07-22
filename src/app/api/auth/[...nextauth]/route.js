import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        await connect();

        try {
          const existUser = await User.findOne({ email: credentials.email });
          if (existUser) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              existUser.password
            );
            if (isPasswordCorrect) {
              return existUser;
            } else {
              throw new Error("Invalid password");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile, account }) {
    //   console.log("profile", profile);
    //   console.log("account", account);
      
      try {
        await connect();
        const existUser = await User.findOne({ email: profile.email });
        if (!existUser) {
          const newUser = await User.create({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            isGoogleAccount: account.provider === 'google' ? true : false,
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
  pages: {
    error: "/dashboard/login",
  },
});

export { handler as GET, handler as POST };
