import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav
      className="flex items-center justify-between mb-10 pb-5"
      style={{ borderBottom: "1px solid var(--nav-border)" }}
    >
      <Link href="/" className="group flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <span className="text-white text-sm font-bold tracking-tight">S</span>
        </div>
        <span
          className="text-[17px] font-semibold tracking-tight group-hover:opacity-80 transition-opacity"
          style={{ color: "var(--text-primary)" }}
        >
          SqueezeDaily
        </span>
      </Link>

      <div className="flex items-center gap-1">
        <Link
          href="/"
          className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all"
          style={{ color: "var(--text-secondary)" }}
        >
          Dashboard
        </Link>
        <Link
          href="/scan"
          className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all"
          style={{ color: "var(--text-secondary)" }}
        >
          Scan
        </Link>
        <Link
          href="/news"
          className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all"
          style={{ color: "var(--text-secondary)" }}
        >
          News
        </Link>
        <div className="ml-2">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
