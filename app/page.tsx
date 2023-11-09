import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Portfolio Site of kyuki3rain / coloname33</div>
      <div className="flex flex-col items-center">
        <Link href="/brick-breaker">ブロック崩し</Link>
        <Link href="/hanoi">ハノイの塔</Link>
      </div>
    </main>
  );
}
