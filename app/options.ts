import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/prisma";

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

export default authOptions;