import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/prisma";

const authHandler: NextApiHandler = (req, res) => {
  console.log(req.method, req.url);
  console.log(process.env);
  const resa = NextAuth(req, res, authOptions);
  console.log(res);
  return resa;
};

/**
 * Configure NextAuth
 */
const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
};

export { authHandler as GET, authHandler as POST };
