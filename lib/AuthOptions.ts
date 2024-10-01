import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./postgresdb";
import bcrypt from "bcrypt";
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.id || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!correctPassword) {
          throw new Error("Invalid credentials");
        }

        return {
            id:user.id.toString(),
            email:user.email,
            name:user.username
          };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const user = await prisma.user.findFirst({
          where: {
            email: profile?.email,
          },
        });
        if (!user) {
          await prisma.user.create({
            data: {
              email: profile?.email!,
              username: profile?.name!,
              firstName:profile?.name!,
              lastName:profile?.name!
            },
          });
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};