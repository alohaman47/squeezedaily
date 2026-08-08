import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
      <Link href="/" className="text-xl font-bold text-white hover:text-indigo-300 transition">
        SqueezeDaily
      </Link>
      <div className="flex gap-4 text-sm">
        <Link
          href="/"
          className="text-slate-300 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-slate-800"
        >
          Dashboard
        </Link>
        <Link
          href="/news"
          className="text-slate-300 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-slate-800"
        >
          News
        </Link>
      </div>
    </nav>
  );
}
