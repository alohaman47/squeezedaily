import { STOCKS, WEEKLY_PLAN, RISK_RULES, ENTRY_CHECKLIST } from "@/lib/stocks";
import StockCard from "@/components/StockCard";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Nav />

      {/* Hero */}
      <header className="mb-10">
        <p className="text-[12px] font-medium tracking-[0.12em] uppercase text-indigo-400/80 mb-2">
          Trading Desk
        </p>
        <h1 className="text-3xl md:text-[2.5rem] font-semibold tracking-tight text-white leading-[1.15]">
          SqueezeDaily
        </h1>
        <p className="mt-2.5 text-[14px] text-slate-400 max-w-lg leading-relaxed">
          Short-term catalyst & squeeze desk · แผนเทรด 1–7 วัน · โฟกัส ASTS · RKLB · AI names
        </p>
      </header>

      {/* Theme banner */}
      <section className="mb-8 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-indigo-500/[0.07] via-transparent to-violet-500/[0.05] px-5 py-4">
        <p className="text-[11px] font-medium tracking-wider uppercase text-indigo-300/70 mb-1">
          This Week
        </p>
        <p className="text-[15px] font-medium text-white">{WEEKLY_PLAN.themeTh}</p>
        <p className="text-[12px] text-slate-500 mt-0.5">{WEEKLY_PLAN.theme}</p>
      </section>

      {/* Quick signals */}
      <section className="mb-10 grid grid-cols-3 sm:grid-cols-6 gap-2">
        {STOCKS.map((s) => (
          <div
            key={s.symbol}
            className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-3 text-center"
          >
            <p className="text-[11px] font-medium text-slate-500 mb-1">{s.symbol}</p>
            <p
              className={`text-[13px] font-semibold ${
                s.signal === "Buy" ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {s.signal}
            </p>
          </div>
        ))}
      </section>

      {/* Watchlist */}
      <section className="mb-14">
        <div className="flex items-end justify-between mb-5">
          <h2 className="text-[15px] font-semibold text-white tracking-tight">
            Watchlist
          </h2>
          <span className="text-[12px] text-slate-500">{STOCKS.length} names</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STOCKS.map((s) => (
            <StockCard key={s.symbol} stock={s} />
          ))}
        </div>
      </section>

      {/* Daily Plan */}
      <section className="mb-14">
        <h2 className="text-[15px] font-semibold text-white tracking-tight mb-5">
          Daily Plan
        </h2>
        <div className="space-y-2.5">
          {WEEKLY_PLAN.days.map((d) => (
            <div
              key={d.day}
              className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-5 py-4"
            >
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <span className="text-[13px] font-medium text-white">{d.dayTh}</span>
                <span className="text-[11px] text-slate-600">{d.day}</span>
                <div className="flex gap-1.5 ml-auto">
                  {d.focus.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/15"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[13px] text-slate-400 leading-relaxed">{d.noteTh}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist + Risk - two columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
        {/* Entry Checklist */}
        <section>
          <h2 className="text-[15px] font-semibold text-white tracking-tight mb-4">
            {ENTRY_CHECKLIST.titleTh}
          </h2>
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 space-y-3.5">
            {ENTRY_CHECKLIST.items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[13px] text-slate-300 leading-snug">{item.th}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Risk Rules */}
        <section>
          <h2 className="text-[15px] font-semibold text-white tracking-tight mb-4">
            {RISK_RULES.titleTh}
          </h2>
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 space-y-3.5">
            {RISK_RULES.rules.map((rule, i) => (
              <div key={i} className="flex gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-[13px] text-slate-300 leading-snug">{rule.th}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="pt-8 border-t border-white/[0.05] text-center">
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Data via Finnhub · Implied Move approximate · Not financial advice
        </p>
        <p className="text-[11px] text-slate-600 mt-1">
          ข้อมูลจาก Finnhub · ไม่ใช่คำแนะนำการลงทุน
        </p>
      </footer>
    </main>
  );
}
