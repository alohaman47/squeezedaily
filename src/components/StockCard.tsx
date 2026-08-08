"use client";

import { useEffect, useState } from "react";
import { Stock, Signal } from "@/lib/stocks";
import type { CardView } from "./ViewToggle";

type Quote = {
  price?: number;
  percent?: number;
  relativeVolume?: number | null;
};

function SignalBadge({ signal }: { signal: Signal }) {
  if (signal === "Buy") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase"
        style={{
          background: "rgba(52, 211, 153, 0.12)",
          color: "var(--positive)",
          border: "1px solid rgba(52, 211, 153, 0.22)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--positive)" }} />
        Buy
      </span>
    );
  }
  if (signal === "Sell") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase"
        style={{
          background: "rgba(248, 113, 113, 0.12)",
          color: "var(--negative)",
          border: "1px solid rgba(248, 113, 113, 0.22)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--negative)" }} />
        Sell
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase"
      style={{
        background: "rgba(251, 191, 36, 0.12)",
        color: "var(--warning)",
        border: "1px solid rgba(251, 191, 36, 0.22)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--warning)" }} />
      Hold
    </span>
  );
}

function Meter({
  value,
  max = 100,
  color,
  label,
  display,
}: {
  value: number;
  max?: number;
  color: string;
  label: string;
  display: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
        <span className="text-[12px] font-semibold tabular-nums" style={{ color }}>
          {display}
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--surface)" }}>
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
          }}
        />
      </div>
    </div>
  );
}

function RiskRing({ level }: { level: "Low" | "Medium" | "High" }) {
  const map = {
    Low: { pct: 30, color: "var(--positive)", label: "ต่ำ" },
    Medium: { pct: 60, color: "var(--warning)", label: "ปานกลาง" },
    High: { pct: 90, color: "var(--negative)", label: "สูง" },
  };
  const { pct, color, label } = map[level];
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="48" height="48" className="-rotate-90">
        <circle cx="24" cy="24" r={r} fill="none" stroke="var(--surface)" strokeWidth="4" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="text-[10px] font-medium" style={{ color }}>
        Risk {label}
      </span>
    </div>
  );
}

function PlanRow({ title, bodyTh, bodyEn }: { title: string; bodyTh: string; bodyEn: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[11px] font-semibold tracking-wide uppercase" style={{ color: "var(--accent)" }}>
        {title}
      </p>
      <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-primary)" }}>
        {bodyTh}
      </p>
      <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {bodyEn}
      </p>
    </div>
  );
}

export default function StockCard({
  stock,
  view = "visual",
}: {
  stock: Stock;
  view?: CardView;
}) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/quote?symbol=${stock.symbol}`)
      .then((r) => r.json())
      .then((data) => {
        setQuote(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [stock.symbol]);

  const isUp = (quote?.percent ?? 0) >= 0;
  const rvol = quote?.relativeVolume ?? 0;
  const squeezeLabel =
    stock.shortInterest >= 18 ? "สูงมาก" : stock.shortInterest >= 12 ? "สูง" : "ปานกลาง";

  const impMatch = stock.impliedMove.match(/(\d+(?:\.\d+)?)/g);
  const impMid =
    impMatch && impMatch.length >= 2
      ? (parseFloat(impMatch[0]) + parseFloat(impMatch[1])) / 2
      : impMatch
      ? parseFloat(impMatch[0])
      : 12;

  return (
    <article
      className="card-premium p-5 flex flex-col h-full cursor-pointer"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[15px] font-semibold tracking-tight truncate" style={{ color: "var(--text-primary)" }}>
              {stock.symbol}
            </h3>
            <span className="text-[10px] font-medium tabular-nums" style={{ color: "var(--text-muted)" }}>
              #{stock.priority}
            </span>
          </div>
          <p className="text-[12px] truncate" style={{ color: "var(--text-muted)" }}>
            {stock.name}
          </p>
        </div>

        <div className="text-right shrink-0">
          {loading ? (
            <div className="h-5 w-16 animate-pulse rounded" style={{ background: "var(--surface)" }} />
          ) : quote?.price ? (
            <>
              <p className="text-[17px] font-semibold tabular-nums tracking-tight" style={{ color: "var(--text-primary)" }}>
                ${quote.price.toFixed(2)}
              </p>
              <p
                className="text-[12px] font-medium tabular-nums"
                style={{ color: isUp ? "var(--positive)" : "var(--negative)" }}
              >
                {isUp ? "+" : ""}
                {quote.percent?.toFixed(2)}%
              </p>
            </>
          ) : (
            <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>—</p>
          )}
        </div>
      </div>

      {view === "visual" && (
        <>
          <div className="flex items-center justify-between mb-4">
            <SignalBadge signal={stock.signal} />
            <RiskRing level={stock.riskLevel} />
          </div>
          <p className="text-[13px] leading-relaxed mb-5 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {stock.signalReasonTh}
          </p>
          <div className="space-y-3.5 mb-5">
            <Meter label="Short Interest" value={stock.shortInterest} max={30} color="var(--warning)" display={`${stock.shortInterest}%`} />
            <Meter
              label="Relative Volume"
              value={Math.min(rvol || 0, 5)}
              max={5}
              color={rvol >= 2 ? "var(--positive)" : rvol >= 1.5 ? "var(--warning)" : "var(--text-muted)"}
              display={rvol ? `${rvol.toFixed(1)}x` : "—"}
            />
            <Meter label="Implied Move" value={impMid} max={30} color="var(--accent)" display={stock.impliedMove} />
          </div>
        </>
      )}

      {view === "classic" && (
        <>
          <div className="mb-3">
            <SignalBadge signal={stock.signal} />
          </div>
          <p className="text-[13px] leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
            {stock.signalReasonTh}
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Short %", value: `${stock.shortInterest}%`, color: "var(--warning)" },
              { label: "Squeeze", value: squeezeLabel, color: "var(--negative)" },
              {
                label: "RVOL",
                value: rvol ? `${rvol.toFixed(1)}x` : "—",
                color: rvol >= 2 ? "var(--positive)" : rvol >= 1.5 ? "var(--warning)" : "var(--text-primary)",
              },
              {
                label: "Earnings",
                value: `${stock.earningsDate.slice(5)} ${stock.earningsTime}`,
                color: "var(--text-primary)",
              },
              { label: "Imp. Move", value: stock.impliedMove, color: "var(--accent)" },
              {
                label: "Risk",
                value: stock.riskLevel,
                color:
                  stock.riskLevel === "High"
                    ? "var(--negative)"
                    : stock.riskLevel === "Medium"
                    ? "var(--warning)"
                    : "var(--positive)",
              },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-lg px-2.5 py-2"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <p className="text-[10px] mb-0.5" style={{ color: "var(--text-muted)" }}>
                  {m.label}
                </p>
                <p className="text-[12px] font-semibold tabular-nums" style={{ color: m.color }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div
        className="mt-auto pt-3 flex items-center justify-between text-[11px]"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-3">
          <span style={{ color: "var(--text-muted)" }}>
            {stock.earningsDate.slice(5)}{" "}
            <span style={{ color: "var(--accent)" }}>{stock.earningsTime}</span>
          </span>
          <span style={{ color: "var(--text-muted)" }}>·</span>
          <span style={{ color: "var(--text-muted)" }}>DTC {stock.daysToCover}</span>
        </div>
        <span className="font-medium" style={{ color: open ? "var(--accent)" : "var(--text-primary)" }}>
          {open ? "ปิดแผน ▲" : "ดูแผนเทรด ▼"}
        </span>
      </div>

      {open && (
        <div
          className="mt-4 pt-4 space-y-4"
          style={{ borderTop: "1px solid var(--border)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>
              แผนเทรด · {stock.symbol}
            </p>
            <span
              className="text-[10px] px-2 py-0.5 rounded-md font-medium"
              style={{
                background: stock.signal === "Buy" ? "rgba(52,211,153,0.12)" : "rgba(251,191,36,0.12)",
                color: stock.signal === "Buy" ? "var(--positive)" : "var(--warning)",
              }}
            >
              {stock.signal}
            </span>
          </div>

          <PlanRow title="ก่อน Earnings" bodyTh={stock.plan.preEarningsTh} bodyEn={stock.plan.preEarnings} />
          <PlanRow title="หลัง Earnings" bodyTh={stock.plan.postEarningsTh} bodyEn={stock.plan.postEarnings} />
          <PlanRow title="จุดตัดขาดทุน (Stop)" bodyTh={stock.plan.stopTh} bodyEn={stock.plan.stop} />
          <PlanRow title="เป้าทำกำไร (Take Profit)" bodyTh={stock.plan.takeProfitTh} bodyEn={stock.plan.takeProfit} />

          <div
            className="rounded-xl px-3 py-2.5 text-[12px]"
            style={{ background: "var(--accent-soft)", color: "var(--text-secondary)" }}
          >
            <p>{stock.plan.notesTh}</p>
            <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
              {stock.plan.notes}
            </p>
          </div>

          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            Size ที่แนะนำ: {stock.positionSizeTh} · ความเสี่ยง: {stock.riskLevel} · ไม่ใช่คำแนะนำการลงทุน
          </p>
        </div>
      )}
    </article>
  );
}
