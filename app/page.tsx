import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Portfolio Site of kyuki3rain / coloname33</div>
      <Link href="/hanoi">Hanoi Tower</Link>
    </main>
  );
}