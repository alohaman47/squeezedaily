"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";

type Candidate = {
  symbol: string;
  earningsDate: string;
  earningsTime: string;
  shortInterest: number | null;
  theme: string;
  themeTh: string;
  inSqueezePool: boolean;
  score: number;
  reason: string;
  reasonTh: string;
  price?: number;
  percent?: number;
};

type ScanResult = {
  from?: string;
  to?: string;
  scannedAt?: string;
  totalEarnings?: number;
  candidates: Candidate[];
  error?: string;
};

export default function ScanPage() {
  const [data, setData] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);

  const runScan = () => {
    setLoading(true);
    fetch("/api/scan")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        setData({ candidates: [], error: err.message });
        setLoading(false);
      });
  };

  useEffect(() => {
    runScan();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Nav />

      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            className="text-[12px] font-medium tracking-[0.12em] uppercase mb-2"
            style={{ color: "var(--accent)" }}
          >
            Auto Scanner
          </p>
          <h1
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Scan
          </h1>
          <p className="mt-1.5 text-[13px]" style={{ color: "var(--text-secondary)" }}>
            ดึงหุ้นอัตโนมัติจาก Earnings Calendar + Squeeze Pool
          </p>
        </div>
        <button
          onClick={runScan}
          disabled={loading}
          className="px-4 py-2 rounded-lg text-[13px] font-medium transition-all disabled:opacity-50"
          style={{
            background: "var(--accent)",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(99, 102, 241, 0.25)",
          }}
        >
          {loading ? "กำลังสแกน..." : "สแกนใหม่"}
        </button>
      </header>

      {/* Meta */}
      {data && !loading && (
        <div
          className="mb-6 rounded-xl px-4 py-3 text-[12px] flex flex-wrap gap-x-4 gap-y-1"
          style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-muted)" }}
        >
          <span>
            ช่วง: {data.from} → {data.to}
          </span>
          <span>Earnings ในระบบ: {data.totalEarnings ?? 0}</span>
          {data.scannedAt && (
            <span>
              สแกนเมื่อ:{" "}
              {new Date(data.scannedAt).toLocaleString("th-TH", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </span>
          )}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl animate-pulse"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            />
          ))}
        </div>
      ) : data?.error ? (
        <div
          className="rounded-2xl p-5"
          style={{ border: "1px solid rgba(251, 191, 36, 0.25)", background: "rgba(251, 191, 36, 0.06)" }}
        >
          <p className="text-[13px] font-medium" style={{ color: "var(--warning)" }}>
            สแกนไม่สำเร็จ
          </p>
          <p className="text-[12px] mt-1 opacity-80" style={{ color: "var(--warning)" }}>
            {data.error}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {(data?.candidates || []).map((c, i) => {
            const isUp = (c.percent ?? 0) >= 0;
            return (
              <div
                key={c.symbol + i}
                className="rounded-2xl p-4 flex flex-wrap items-center gap-4"
                style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              >
                {/* Rank + Symbol */}
                <div className="flex items-center gap-3 min-w-[120px]">
                  <span
                    className="w-7 h-7 rounded-lg text-[11px] font-bold flex items-center justify-center"
                    style={{
                      background: i < 3 ? "var(--accent-soft)" : "var(--surface)",
                      color: i < 3 ? "var(--accent)" : "var(--text-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[14px] font-semibold" style={{ color: "var(--text-primary)" }}>
                      {c.symbol}
                    </p>
                    <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                      {c.themeTh}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="min-w-[80px]">
                  {c.price != null ? (
                    <>
                      <p className="text-[14px] font-semibold tabular-nums" style={{ color: "var(--text-primary)" }}>
                        ${c.price.toFixed(2)}
                      </p>
                      <p
                        className="text-[11px] tabular-nums"
                        style={{ color: isUp ? "var(--positive)" : "var(--negative)" }}
                      >
                        {isUp ? "+" : ""}
                        {c.percent?.toFixed(2)}%
                      </p>
                    </>
                  ) : (
                    <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>—</p>
                  )}
                </div>

                {/* SI + Earnings */}
                <div className="flex gap-4 text-[12px] min-w-[140px]">
                  <div>
                    <p style={{ color: "var(--text-muted)" }}>Short %</p>
                    <p className="font-semibold" style={{ color: "var(--warning)" }}>
                      {c.shortInterest != null ? `${c.shortInterest}%` : "—"}
                    </p>
                  </div>
                  <div>
                    <p style={{ color: "var(--text-muted)" }}>Earnings</p>
                    <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                      {c.earningsDate !== "—" ? (
                        <>
                          {c.earningsDate.slice(5)}{" "}
                          <span style={{ color: "var(--accent)" }}>{c.earningsTime}</span>
                        </>
                      ) : (
                        "—"
                      )}
                    </p>
                  </div>
                </div>

                {/* Score + Reason */}
                <div className="flex-1 min-w-[160px]">
                  <div className="flex items-center gap-2 mb-0.5">
                    {c.inSqueezePool && (
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                        style={{
                          background: "rgba(251, 191, 36, 0.12)",
                          color: "var(--warning)",
                        }}
                      >
                        SQUEEZE POOL
                      </span>
                    )}
                    <span className="text-[11px] tabular-nums" style={{ color: "var(--text-muted)" }}>
                      Score {c.score.toFixed(0)}
                    </span>
                  </div>
                  <p className="text-[12px]" style={{ color: "var(--text-secondary)" }}>
                    {c.reasonTh}
                  </p>
                </div>
              </div>
            );
          })}

          {(data?.candidates || []).length === 0 && (
            <p className="text-center py-16 text-[13px]" style={{ color: "var(--text-muted)" }}>
              ไม่พบรายชื่อจากสแกนนี้
            </p>
          )}
        </div>
      )}

      {/* How it works */}
      <section
        className="mt-10 rounded-2xl p-5 text-[12px] leading-relaxed space-y-2"
        style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text-secondary)" }}
      >
        <p className="font-medium" style={{ color: "var(--text-primary)" }}>
          ระบบสแกนทำงานยังไง
        </p>
        <p>
          1. ดึง <strong>Earnings Calendar</strong> 10 วันข้างหน้าจาก Finnhub
        </p>
        <p>
          2. เทียบกับ <strong>Squeeze Pool</strong> (รายชื่อ Short Interest สูงที่เรารวบรวมไว้)
        </p>
        <p>
          3. ให้คะแนน: Short % + โบนัสถ้ามี Earnings ใกล้ๆ + โบนัสถ้าราคาขยับแรง
        </p>
        <p>
          4. เรียงตามคะแนน — ตัวที่น่าสนใจขึ้นอันดับต้นๆ
        </p>
        <p style={{ color: "var(--text-muted)" }}>
          หมายเหตุ: Short Interest แบบเต็มตลาดหาฟรียาก จึงใช้ Pool ที่คัดไว้ + อัปเดตเป็นครั้งคราว
        </p>
      </section>
    </main>
  );
}
