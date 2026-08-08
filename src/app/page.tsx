import { STOCKS, WEEKLY_PLAN, RISK_RULES } from "@/lib/stocks";
import StockCard from "@/components/StockCard";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Nav />

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          SqueezeDaily
        </h1>
        <p className="mt-2 text-slate-400">
          Short Squeeze + Daily / Weekly Trade Plan
        </p>
        <p className="text-sm text-slate-500 mt-1">
          แผนเทรดรายวัน-รายสัปดาห์ + โอกาส Short Squeeze · อัปเดต Aug 2026
        </p>
      </header>

      {/* Weekly Theme */}
      <section className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-900/50 to-slate-900 border border-indigo-700/40 p-5">
        <h2 className="text-sm font-medium text-indigo-300 mb-1 uppercase tracking-wide">
          Weekly Theme · ธีมสัปดาห์นี้
        </h2>
        <p className="text-xl font-semibold text-white">{WEEKLY_PLAN.themeTh}</p>
        <p className="text-slate-400 text-sm mt-1">{WEEKLY_PLAN.theme}</p>
      </section>

      {/* Signal Summary */}
      <section className="mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {STOCKS.map((s) => (
          <div
            key={s.symbol}
            className={`rounded-xl border p-3 text-center ${
              s.signal === "Buy"
                ? "border-emerald-500/40 bg-emerald-500/10"
                : s.signal === "Sell"
                ? "border-rose-500/40 bg-rose-500/10"
                : "border-amber-500/40 bg-amber-500/10"
            }`}
          >
            <p className="text-xs text-slate-400">{s.symbol}</p>
            <p
              className={`text-lg font-bold ${
                s.signal === "Buy"
                  ? "text-emerald-300"
                  : s.signal === "Sell"
                  ? "text-rose-300"
                  : "text-amber-300"
              }`}
            >
              {s.signal}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">{s.earningsTime}</p>
          </div>
        ))}
      </section>

      {/* Stock Cards */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-5 text-white">
          Watchlist · หุ้นที่โฟกัส
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {STOCKS.map((s) => (
            <StockCard key={s.symbol} stock={s} />
          ))}
        </div>
      </section>

      {/* Daily Plan */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-5 text-white">
          Daily Plan · แผนรายวัน
        </h2>
        <div className="space-y-3">
          {WEEKLY_PLAN.days.map((d) => (
            <div
              key={d.day}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="font-semibold text-white">{d.dayTh}</span>
                <span className="text-slate-500 text-sm">({d.day})</span>
                <div className="flex gap-2">
                  {d.focus.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-slate-300 text-sm">{d.noteTh}</p>
              <p className="text-slate-500 text-xs mt-1">{d.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Risk Rules */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-5 text-white">
          {RISK_RULES.titleTh}
        </h2>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          {RISK_RULES.rules.map((rule, i) => (
            <div key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <p className="text-slate-200 text-sm">{rule.th}</p>
                <p className="text-slate-500 text-xs mt-0.5">{rule.en}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-slate-600 text-sm pt-8 border-t border-slate-800">
        <p>
          Data via Finnhub · Short Interest approximate · Not financial advice
        </p>
        <p className="mt-1">
          ข้อมูลจาก Finnhub · Short Interest เป็นค่าประมาณ · ไม่ใช่คำแนะนำการลงทุน
        </p>
      </footer>
    </main>
  );
}
