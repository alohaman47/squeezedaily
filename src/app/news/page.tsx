"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import { STOCKS } from "@/lib/stocks";

type NewsItem = {
  id: number;
  headline: string;
  headlineTh?: string;
  summary: string;
  summaryTh?: string;
  source: string;
  datetime: number;
};

export default function NewsPage() {
  const [selected, setSelected] = useState("ASTS");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setExpanded(null);
    fetch(`/api/news?symbol=${selected}`)
      .then((r) => r.json())
      .then((data) => {
        setNews(data.news || []);
        if (data.error) setError(data.error);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Network error");
        setLoading(false);
      });
  }, [selected]);

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Nav />

      <header className="mb-8">
        <p className="text-[12px] font-medium tracking-[0.12em] uppercase mb-2" style={{ color: "var(--accent)" }}>
          Intelligence
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ color: "var(--text-primary)" }}>
          News
        </h1>
        <p className="mt-1.5 text-[13px]" style={{ color: "var(--text-secondary)" }}>
          ข่าวบริษัท · แปลไทยอัตโนมัติ · อ่านในแอป
        </p>
      </header>

      <div className="flex flex-wrap gap-1.5 mb-8">
        {STOCKS.map((s) => (
          <button
            key={s.symbol}
            onClick={() => setSelected(s.symbol)}
            className="px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-all"
            style={
              selected === s.symbol
                ? {
                    background: "var(--accent)",
                    color: "#fff",
                    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
                  }
                : {
                    background: "var(--surface)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                  }
            }
          >
            {s.symbol}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 rounded-2xl animate-pulse"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            />
          ))}
          <p className="text-[12px] text-center pt-3" style={{ color: "var(--text-muted)" }}>
            กำลังโหลดและแปลข่าว...
          </p>
        </div>
      ) : error ? (
        <div
          className="rounded-2xl p-5"
          style={{ border: "1px solid rgba(251, 191, 36, 0.25)", background: "rgba(251, 191, 36, 0.06)" }}
        >
          <p className="text-[13px] font-medium" style={{ color: "var(--warning)" }}>
            ไม่สามารถโหลดข่าวได้
          </p>
          <p className="text-[12px] mt-1 opacity-70" style={{ color: "var(--warning)" }}>
            {error}
          </p>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[13px]" style={{ color: "var(--text-muted)" }}>
            ไม่พบข่าวล่าสุดของ {selected}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {news.map((item) => {
            const isOpen = expanded === item.id;
            const hasThai = item.headlineTh && item.headlineTh !== item.headline;

            return (
              <article
                key={item.id}
                onClick={() => setExpanded(isOpen ? null : item.id)}
                className="rounded-2xl p-5 cursor-pointer transition-all duration-200"
                style={{
                  border: isOpen ? "1px solid rgba(99, 102, 241, 0.3)" : "1px solid var(--border)",
                  background: isOpen ? "var(--accent-soft)" : "var(--surface)",
                }}
              >
                <div className="flex items-center gap-2 mb-2 text-[11px]">
                  <span
                    className="px-1.5 py-0.5 rounded font-medium"
                    style={{ background: "var(--surface)", color: "var(--text-muted)" }}
                  >
                    {item.source}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>·</span>
                  <time style={{ color: "var(--text-muted)" }}>
                    {new Date(item.datetime * 1000).toLocaleString("th-TH", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>

                <h2 className="text-[15px] font-medium leading-snug tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {item.headlineTh || item.headline}
                </h2>

                {hasThai && (
                  <p className="text-[12px] mt-1.5 leading-snug" style={{ color: "var(--text-muted)" }}>
                    {item.headline}
                  </p>
                )}

                {(item.summaryTh || item.summary) && (
                  <p
                    className={`text-[13px] mt-3 leading-relaxed ${isOpen ? "" : "line-clamp-2"}`}
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {item.summaryTh || item.summary}
                  </p>
                )}

                <div className="mt-3 flex justify-end">
                  <span className="text-[11px] font-medium" style={{ color: isOpen ? "var(--accent)" : "var(--text-muted)" }}>
                    {isOpen ? "ย่อ" : "อ่านเพิ่ม"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
