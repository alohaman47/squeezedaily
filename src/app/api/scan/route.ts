import { NextResponse } from "next/server";

const FINNHUB = "https://finnhub.io/api/v1";

// Curated high-SI / squeeze-friendly pool (free APIs don't offer full SI screener)
const SQUEEZE_POOL: Record<
  string,
  { shortInterest: number; theme: string; themeTh: string }
> = {
  ASTS: { shortInterest: 20.5, theme: "Space / Satellite", themeTh: "อวกาศ / ดาวเทียม" },
  CRWV: { shortInterest: 19.5, theme: "AI Cloud", themeTh: "AI Cloud Infrastructure" },
  SMCI: { shortInterest: 14.2, theme: "AI Server", themeTh: "AI Server / Hardware" },
  LITE: { shortInterest: 11.3, theme: "AI Optics", themeTh: "AI Optics / Photonics" },
  RKLB: { shortInterest: 8.5, theme: "Space / Launch", themeTh: "อวกาศ / จรวด" },
  COHR: { shortInterest: 9.8, theme: "AI Photonics", themeTh: "AI Photonics / Optics" },
  GME: { shortInterest: 22.0, theme: "Meme / Retail", themeTh: "Meme / Retail" },
  AMC: { shortInterest: 18.0, theme: "Meme / Retail", themeTh: "Meme / Retail" },
  BYND: { shortInterest: 35.0, theme: "High SI", themeTh: "Short Interest สูง" },
  CVNA: { shortInterest: 16.0, theme: "Consumer", themeTh: "Consumer" },
  UPST: { shortInterest: 15.0, theme: "Fintech", themeTh: "Fintech" },
  PLTR: { shortInterest: 7.5, theme: "AI Software", themeTh: "AI Software" },
  SOFI: { shortInterest: 12.0, theme: "Fintech", themeTh: "Fintech" },
  NIO: { shortInterest: 14.0, theme: "EV", themeTh: "EV" },
  MARA: { shortInterest: 20.0, theme: "Crypto Miner", themeTh: "Crypto Miner" },
  RIOT: { shortInterest: 18.0, theme: "Crypto Miner", themeTh: "Crypto Miner" },
};

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) {
    return NextResponse.json({
      error: "FINNHUB_API_KEY not set",
      candidates: [],
      scannedAt: new Date().toISOString(),
    });
  }

  const today = new Date();
  const from = formatDate(today);
  const toDate = new Date(today);
  toDate.setDate(toDate.getDate() + 10);
  const to = formatDate(toDate);

  try {
    const calRes = await fetch(
      `${FINNHUB}/calendar/earnings?from=${from}&to=${to}&token=${key}`,
      { next: { revalidate: 1800 } }
    );
    const cal = await calRes.json();
    const earningsList: any[] = Array.isArray(cal?.earningsCalendar)
      ? cal.earningsCalendar
      : [];

    const earningsMap = new Map<string, any>();
    for (const e of earningsList) {
      if (!e?.symbol) continue;
      if (!earningsMap.has(e.symbol)) earningsMap.set(e.symbol, e);
    }

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

    const candidates: Candidate[] = [];

    // A) Squeeze pool
    for (const [symbol, meta] of Object.entries(SQUEEZE_POOL)) {
      const e = earningsMap.get(symbol);
      const hasEarnings = !!e;
      let score = meta.shortInterest;
      if (hasEarnings) score += 25;

      const hour = e?.hour || "amc";
      const earningsTime =
        hour === "bmo" || hour === "tmco" ? "BMO" : hour === "amc" ? "AMC" : "Unknown";

      candidates.push({
        symbol,
        earningsDate: e?.date || "—",
        earningsTime: hasEarnings ? earningsTime : "—",
        shortInterest: meta.shortInterest,
        theme: meta.theme,
        themeTh: meta.themeTh,
        inSqueezePool: true,
        score,
        reason: hasEarnings
          ? `High SI + earnings ${e.date}`
          : `High SI watch (no earnings in window)`,
        reasonTh: hasEarnings
          ? `Short สูง + มี earnings ${e.date}`
          : `Short สูง เฝ้าดู (ยังไม่มี earnings ใกล้ๆ)`,
      });
    }

    // B) Other earnings (limited)
    let extra = 0;
    for (const e of earningsList) {
      const sym = e.symbol as string;
      if (!sym || SQUEEZE_POOL[sym] || sym.includes(".")) continue;
      if (extra >= 12) break;
      extra++;

      const hour = e.hour || "amc";
      const earningsTime =
        hour === "bmo" || hour === "tmco" ? "BMO" : hour === "amc" ? "AMC" : "Unknown";

      candidates.push({
        symbol: sym,
        earningsDate: e.date,
        earningsTime,
        shortInterest: null,
        theme: "Earnings Catalyst",
        themeTh: "มี Earnings ใกล้ๆ",
        inSqueezePool: false,
        score: 10,
        reason: `Earnings ${e.date}`,
        reasonTh: `มี Earnings ${e.date}`,
      });
    }

    const sorted = candidates.sort((a, b) => b.score - a.score);
    const toQuote = sorted.slice(0, 12);

    await Promise.all(
      toQuote.map(async (c) => {
        try {
          const qRes = await fetch(
            `${FINNHUB}/quote?symbol=${c.symbol}&token=${key}`,
            { next: { revalidate: 60 } }
          );
          const q = await qRes.json();
          if (q && typeof q.c === "number" && q.c > 0) {
            c.price = q.c;
            c.percent = q.dp;
            if (Math.abs(q.dp || 0) > 5) c.score += 5;
          }
        } catch {
          /* ignore */
        }
      })
    );

    sorted.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      from,
      to,
      scannedAt: new Date().toISOString(),
      totalEarnings: earningsList.length,
      candidates: sorted.slice(0, 20),
    });
  } catch (e: any) {
    return NextResponse.json({
      error: e?.message || "Scan failed",
      candidates: [],
      scannedAt: new Date().toISOString(),
    });
  }
}
