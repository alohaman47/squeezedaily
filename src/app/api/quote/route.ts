import { NextRequest, NextResponse } from "next/server";

const FINNHUB = "https://finnhub.io/api/v1";

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get("symbol");
  if (!symbol) {
    return NextResponse.json({ error: "symbol required" }, { status: 400 });
  }

  const key = process.env.FINNHUB_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "FINNHUB_API_KEY not set", mock: true },
      { status: 200 }
    );
  }

  try {
    const quoteRes = await fetch(
      `${FINNHUB}/quote?symbol=${symbol}&token=${key}`,
      { next: { revalidate: 30 } }
    );
    const quote = await quoteRes.json();

    // Try to get additional candle data for volume (latest daily)
    let volume: number | null = null;
    try {
      const to = Math.floor(Date.now() / 1000);
      const from = to - 60 * 60 * 24 * 5; // last 5 days
      const candleRes = await fetch(
        `${FINNHUB}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${key}`,
        { next: { revalidate: 300 } }
      );
      const candle = await candleRes.json();
      if (candle.s === "ok" && candle.v?.length) {
        volume = candle.v[candle.v.length - 1];
      }
    } catch {
      // volume optional
    }

    return NextResponse.json({
      symbol,
      price: quote.c,
      change: quote.d,
      percent: quote.dp,
      high: quote.h,
      low: quote.l,
      open: quote.o,
      prevClose: quote.pc,
      volume,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
