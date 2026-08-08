import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between mb-10 pb-5 border-b border-white/[0.06]">
      <Link href="/" className="group flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-white text-sm font-bold tracking-tight">S</span>
        </div>
        <span className="text-[17px] font-semibold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
          SqueezeDaily
        </span>
      </Link>

      <div className="flex items-center gap-1">
        <Link
          href="/"
          className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          Dashboard
        </Link>
        <Link
          href="/news"
          className="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all"
        >
          News
        </Link>
      </div>
    </nav>
  );
}
