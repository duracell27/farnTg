import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/utils/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { Field } from "@/models/Fields";

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
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id;
      }
      return session;
    },
    async signIn({ profile, account }) {
      try {
        await connect();
        const existUser = await User.findOne({ email: profile.email });
        if (!existUser) {
          const newUser = new User({
            name: profile.name,
            email: profile.email,
            image: profile.picture,
            isGoogleAccount: account.provider === "google" ? true : false,
          });

          await newUser.save()

          //first field creation
          const firstField = { crop: null, tapsOnField: 0, status: "empty" };

          const userField = new Field({
            userId: newUser._id,
            fields: [firstField],
          });
          await userField.save();
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
