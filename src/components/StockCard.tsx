"use client";

import { useEffect, useState } from "react";
import { Stock, Signal } from "@/lib/stocks";

type Quote = {
  price?: number;
  change?: number;
  percent?: number;
  volume?: number | null;
  avgVolume?: number | null;
  relativeVolume?: number | null;
};

function SignalBadge({ signal }: { signal: Signal }) {
  if (signal === "Buy") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        Buy
      </span>
    );
  }
  if (signal === "Sell") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        Sell
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-amber-500/10 text-amber-400/90 border border-amber-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
      Hold
    </span>
  );
}

export default function StockCard({ stock }: { stock: Stock }) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

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
  const rvol = quote?.relativeVolume;
  const squeezeLabel =
    stock.shortInterest >= 18 ? "สูงมาก" : stock.shortInterest >= 12 ? "สูง" : "ปานกลาง";

  return (
    <article className="card-premium p-5 flex flex-col h-full">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[15px] font-semibold tracking-tight text-white truncate">
              {stock.symbol}
            </h3>
            <span className="text-[10px] font-medium text-slate-500 tabular-nums">
              #{stock.priority}
            </span>
          </div>
          <p className="text-[12px] text-slate-500 truncate">{stock.name}</p>
        </div>

        <div className="text-right shrink-0">
          {loading ? (
            <div className="h-5 w-16 bg-white/5 animate-pulse rounded" />
          ) : quote?.price ? (
            <>
              <p className="text-[17px] font-semibold tabular-nums tracking-tight text-white">
                ${quote.price.toFixed(2)}
              </p>
              <p
                className={`text-[12px] font-medium tabular-nums ${
                  isUp ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {isUp ? "+" : ""}
                {quote.percent?.toFixed(2)}%
              </p>
            </>
          ) : (
            <p className="text-[12px] text-slate-600">—</p>
          )}
        </div>
      </div>

      {/* Signal */}
      <div className="mb-3">
        <SignalBadge signal={stock.signal} />
      </div>

      {/* Reason */}
      <p className="text-[13px] text-slate-300 leading-relaxed mb-4 line-clamp-2">
        {stock.signalReasonTh}
      </p>

      {/* Metrics grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] px-2.5 py-2">
          <p className="text-[10px] text-slate-500 mb-0.5">Short %</p>
          <p className="text-[13px] font-semibold tabular-nums text-amber-300/90">
            {stock.shortInterest}%
          </p>
        </div>
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] px-2.5 py-2">
          <p className="text-[10px] text-slate-500 mb-0.5">Squeeze</p>
          <p className="text-[13px] font-semibold text-rose-300/90">{squeezeLabel}</p>
        </div>
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] px-2.5 py-2">
          <p className="text-[10px] text-slate-500 mb-0.5">RVOL</p>
          <p
            className={`text-[13px] font-semibold tabular-nums ${
              rvol && rvol >= 2
                ? "text-emerald-400"
                : rvol && rvol >= 1.5
                ? "text-amber-300"
                : "text-slate-300"
            }`}
          >
            {rvol ? `${rvol.toFixed(1)}x` : "—"}
          </p>
        </div>
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] px-2.5 py-2">
          <p className="text-[10px] text-slate-500 mb-0.5">Earnings</p>
          <p className="text-[12px] font-medium text-slate-200">
            {stock.earningsDate.slice(5)}
            <span className="text-indigo-400 ml-1 text-[10px]">{stock.earningsTime}</span>
          </p>
        </div>
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] px-2.5 py-2">
          <p className="text-[10px] text-slate-500 mb-0.5">Imp. Move</p>
          <p className="text-[12px] font-medium text-violet-300/90">{stock.impliedMove}</p>
        </div>
        <div className="rounded-lg bg-white/[0.03] border border-white/[0.04] px-2.5 py-2">
          <p className="text-[10px] text-slate-500 mb-0.5">Risk</p>
          <p
            className={`text-[12px] font-medium ${
              stock.riskLevel === "High"
                ? "text-rose-400"
                : stock.riskLevel === "Medium"
                ? "text-amber-400"
                : "text-emerald-400"
            }`}
          >
            {stock.riskLevel}
          </p>
        </div>
      </div>

      {/* Position size */}
      <div className="mt-auto pt-3 border-t border-white/[0.05]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Position Size</span>
          <span className="text-[12px] font-medium text-slate-200">
            {stock.positionSizeTh}
          </span>
        </div>
      </div>
    </article>
  );
}
