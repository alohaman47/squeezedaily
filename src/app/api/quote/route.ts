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
    const [quoteRes, profileRes] = await Promise.all([
      fetch(`${FINNHUB}/quote?symbol=${symbol}&token=${key}`, {
        next: { revalidate: 30 },
      }),
      fetch(`${FINNHUB}/stock/profile2?symbol=${symbol}&token=${key}`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const quote = await quoteRes.json();
    const profile = await profileRes.json();

    return NextResponse.json({
      symbol,
      price: quote.c,
      change: quote.d,
      percent: quote.dp,
      high: quote.h,
      low: quote.l,
      open: quote.o,
      prevClose: quote.pc,
      name: profile.name || symbol,
      logo: profile.logo,
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
