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
  error?: string;
  mock?: boolean;
};

function SignalBadge({ signal }: { signal: Signal }) {
  const styles = {
    Buy: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    Hold: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    Sell: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  };
  return (
    <span className={`text-sm font-bold px-3 py-1 rounded-full border ${styles[signal]}`}>
      {signal.toUpperCase()}
    </span>
  );
}

function RiskBadge({ level }: { level: "Low" | "Medium" | "High" }) {
  const styles = { Low: "text-emerald-400", Medium: "text-amber-400", High: "text-rose-400" };
  const labels = { Low: "ความเสี่ยงต่ำ", Medium: "ความเสี่ยงปานกลาง", High: "ความเสี่ยงสูง" };
  return <span className={`text-xs font-medium ${styles[level]}`}>{labels[level]}</span>;
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
  const squeezeScore =
    stock.shortInterest >= 18 ? "สูงมาก" : stock.shortInterest >= 12 ? "สูง" : "ปานกลาง";

  const rvol = quote?.relativeVolume;
  const rvolColor =
    rvol && rvol >= 2 ? "text-emerald-300" : rvol && rvol >= 1.5 ? "text-amber-300" : "text-slate-300";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg hover:border-slate-700 transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">{stock.symbol}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
              #{stock.priority}
            </span>
          </div>
          <p className="text-sm text-slate-400">{stock.name}</p>
        </div>
        <div className="text-right">
          {loading ? (
            <div className="h-6 w-20 bg-slate-800 animate-pulse rounded" />
          ) : quote?.price ? (
            <>
              <p className="text-xl font-semibold">${quote.price.toFixed(2)}</p>
              <p className={`text-sm ${isUp ? "text-emerald-400" : "text-rose-400"}`}>
                {isUp ? "+" : ""}
                {quote.percent?.toFixed(2)}%
              </p>
            </>
          ) : (
            <p className="text-sm text-slate-500">No data</p>
          )}
        </div>
      </div>

      {/* Signal + Risk */}
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <SignalBadge signal={stock.signal} />
        <RiskBadge level={stock.riskLevel} />
      </div>

      <div className="mb-4">
        <p className="text-sm text-slate-200 font-medium">{stock.signalReasonTh}</p>
        <p className="text-xs text-slate-500 mt-0.5">{stock.signalReason}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2.5 text-sm">
        <div className="bg-slate-800/50 rounded-lg p-2.5">
          <p className="text-slate-400 text-xs">Short Interest</p>
          <p className="font-semibold text-amber-300">{stock.shortInterest}%</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2.5">
          <p className="text-slate-400 text-xs">Days to Cover</p>
          <p className="font-semibold">{stock.daysToCover}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2.5">
          <p className="text-slate-400 text-xs">Squeeze Score</p>
          <p className="font-semibold text-rose-300">{squeezeScore}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2.5">
          <p className="text-slate-400 text-xs">Earnings</p>
          <p className="font-semibold">
            {stock.earningsDate.slice(5)}{" "}
            <span className="text-indigo-300 text-xs">{stock.earningsTime}</span>
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2.5">
          <p className="text-slate-400 text-xs">Implied Move (ประมาณ)</p>
          <p className="font-semibold text-violet-300">{stock.impliedMoveTh}</p>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-2.5">
          <p className="text-slate-400 text-xs">Relative Volume</p>
          <p className={`font-semibold ${rvolColor}`}>
            {rvol ? `${rvol.toFixed(2)}x` : "—"}
          </p>
        </div>
      </div>

      {/* Position Size */}
      <div className="mt-3 rounded-lg bg-slate-800/40 border border-slate-700/50 px-3 py-2.5">
        <p className="text-xs text-slate-400">แนะนำขนาด Position</p>
        <p className="text-sm font-medium text-white">{stock.positionSizeTh}</p>
        <p className="text-xs text-slate-500">{stock.positionSize}</p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800">
        <p className="text-xs text-slate-400 mb-1">
          {stock.themeTh} · {stock.theme}
        </p>
        <p className="text-sm text-slate-300">{stock.notesTh}</p>
      </div>
    </div>
  );
}
