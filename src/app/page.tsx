import { STOCKS, WEEKLY_PLAN, RISK_RULES, ENTRY_CHECKLIST } from "@/lib/stocks";
import WatchlistSection from "@/components/WatchlistSection";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Nav />

      {/* Hero */}
      <header className="mb-10">
        <p className="text-[12px] font-medium tracking-[0.12em] uppercase mb-2" style={{ color: "var(--accent)" }}>
          Trading Desk
        </p>
        <h1 className="text-3xl md:text-[2.5rem] font-semibold tracking-tight leading-[1.15]" style={{ color: "var(--text-primary)" }}>
          SqueezeDaily
        </h1>
        <p className="mt-2.5 text-[14px] max-w-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Short-term catalyst & squeeze desk · แผนเทรด 1–7 วัน · โฟกัส ASTS · RKLB · AI names
        </p>
      </header>

      {/* Theme banner */}
      <section
        className="mb-8 rounded-2xl px-5 py-4"
        style={{
          border: "1px solid var(--border)",
          background: "var(--accent-soft)",
        }}
      >
        <p className="text-[11px] font-medium tracking-wider uppercase mb-1" style={{ color: "var(--accent)" }}>
          This Week
        </p>
        <p className="text-[15px] font-medium" style={{ color: "var(--text-primary)" }}>
          {WEEKLY_PLAN.themeTh}
        </p>
        <p className="text-[12px] mt-0.5" style={{ color: "var(--text-muted)" }}>
          {WEEKLY_PLAN.theme}
        </p>
      </section>

      {/* Quick signals - visual strip */}
      <section className="mb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {STOCKS.map((s) => {
          const barPct = Math.min(100, (s.shortInterest / 25) * 100);
          const barColor = s.signal === "Buy" ? "var(--positive)" : "var(--warning)";
          return (
            <div
              key={s.symbol}
              className="rounded-xl px-3.5 py-3"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  {s.symbol}
                </span>
                <span className="text-[11px] font-semibold" style={{ color: barColor }}>
                  {s.signal}
                </span>
              </div>
              <div className="h-1 rounded-full overflow-hidden mb-1.5" style={{ background: "var(--border)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${barPct}%`,
                    background: `linear-gradient(90deg, ${barColor}66, ${barColor})`,
                  }}
                />
              </div>
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                SI {s.shortInterest}% · {s.earningsTime}
              </p>
            </div>
          );
        })}
      </section>

      {/* Watchlist */}
      <WatchlistSection />

      {/* Daily Plan */}
      <section className="mb-14">
        <h2 className="text-[15px] font-semibold tracking-tight mb-5" style={{ color: "var(--text-primary)" }}>
          Daily Plan
        </h2>
        <div className="space-y-2.5">
          {WEEKLY_PLAN.days.map((d) => (
            <div
              key={d.day}
              className="rounded-xl px-5 py-4"
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
            >
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <span className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>
                  {d.dayTh}
                </span>
                <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                  {d.day}
                </span>
                <div className="flex gap-1.5 ml-auto">
                  {d.focus.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {d.noteTh}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Checklist + Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
        <section>
          <h2 className="text-[15px] font-semibold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            {ENTRY_CHECKLIST.titleTh}
          </h2>
          <div
            className="rounded-2xl p-5 space-y-3.5"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            {ENTRY_CHECKLIST.items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span
                  className="shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center mt-0.5"
                  style={{
                    background: "rgba(52, 211, 153, 0.12)",
                    color: "var(--positive)",
                    border: "1px solid rgba(52, 211, 153, 0.2)",
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-[13px] leading-snug" style={{ color: "var(--text-secondary)" }}>
                  {item.th}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[15px] font-semibold tracking-tight mb-4" style={{ color: "var(--text-primary)" }}>
            {RISK_RULES.titleTh}
          </h2>
          <div
            className="rounded-2xl p-5 space-y-3.5"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            {RISK_RULES.rules.map((rule, i) => (
              <div key={i} className="flex gap-3">
                <span
                  className="shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center mt-0.5"
                  style={{
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {i + 1}
                </span>
                <p className="text-[13px] leading-snug" style={{ color: "var(--text-secondary)" }}>
                  {rule.th}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="pt-8 text-center" style={{ borderTop: "1px solid var(--border)" }}>
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
          Data via Finnhub · Implied Move approximate · Not financial advice
        </p>
        <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
          ข้อมูลจาก Finnhub · ไม่ใช่คำแนะนำการลงทุน
        </p>
      </footer>
    </main>
  );
}
