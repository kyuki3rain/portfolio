import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import authOptions from "@/options";

const authHandler: NextApiHandler = (req, res) => {
  console.log(req.method, req.url);
  return NextAuth(req, res, authOptions);
};

export { authHandler as GET, authHandler as POST };
