import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "./options";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Portfolio Site of kyuki3rain / coloname33</div>
      <div className="flex items-center justify-center">
        {session?.user?.image && (
          <Image
            width={8}
            height={8}
            src={session?.user?.image}
            alt="profile"
            className="w-8 h-8 mr-4"
          />
        )}
        {session?.user?.name && (
          <div className="text-2xl font-bold">{session?.user?.name}</div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <Link
          href="/brick-breaker"
          className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
        >
          ブロック崩し
        </Link>
        <Link
          href="/hanoi"
          className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
        >
          ハノイの塔
        </Link>
      </div>
    </main>
  );
}
