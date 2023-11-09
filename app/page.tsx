import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Portfolio Site of kyuki3rain / coloname33</div>
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
