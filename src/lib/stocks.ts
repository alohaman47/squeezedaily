export type Stock = {
  symbol: string;
  name: string;
  nameTh: string;
  shortInterest: number; // % of float
  daysToCover: number;
  earningsDate: string;
  theme: string;
  themeTh: string;
  priority: number;
  notes: string;
  notesTh: string;
};

export const STOCKS: Stock[] = [
  {
    symbol: "ASTS",
    name: "AST SpaceMobile",
    nameTh: "AST SpaceMobile",
    shortInterest: 20.5,
    daysToCover: 3.8,
    earningsDate: "2026-08-10",
    theme: "Space / Satellite",
    themeTh: "อวกาศ / ดาวเทียม",
    priority: 1,
    notes: "Highest squeeze potential. High short interest + earnings Monday.",
    notesTh: "โอกาส Squeeze สูงสุด Short สูง + Earnings จันทร์",
  },
  {
    symbol: "RKLB",
    name: "Rocket Lab",
    nameTh: "Rocket Lab",
    shortInterest: 8.5,
    daysToCover: 2.4,
    earningsDate: "2026-08-10",
    theme: "Space / Launch",
    themeTh: "อวกาศ / จรวด",
    priority: 2,
    notes: "Strong space momentum + earnings. Good catalyst play.",
    notesTh: "โมเมนตัม Space แรง + Earnings ดี",
  },
  {
    symbol: "LITE",
    name: "Lumentum",
    nameTh: "Lumentum",
    shortInterest: 11.3,
    daysToCover: 2.2,
    earningsDate: "2026-08-11",
    theme: "AI Optics",
    themeTh: "AI Optics / Photonics",
    priority: 3,
    notes: "AI optics play with strong recent momentum.",
    notesTh: "เล่นธีม AI Optics โมเมนตัมดี",
  },
  {
    symbol: "CRWV",
    name: "CoreWeave",
    nameTh: "CoreWeave",
    shortInterest: 19.5,
    daysToCover: 2.5,
    earningsDate: "2026-08-11",
    theme: "AI Cloud",
    themeTh: "AI Cloud Infrastructure",
    priority: 4,
    notes: "High short + AI cloud. Volatile but high potential.",
    notesTh: "Short สูง + AI Cloud ความผันผวนสูง",
  },
];

export const WEEKLY_PLAN = {
  theme: "Space + AI Infrastructure + CPI",
  themeTh: "Space + AI Infrastructure + CPI",
  days: [
    {
      day: "Monday 10 Aug",
      dayTh: "จันทร์ 10 ส.ค.",
      focus: ["ASTS", "RKLB"],
      note: "Both report after close. ASTS highest squeeze priority.",
      noteTh: "ทั้งคู่รายงานหลังปิด ASTS สำคัญสุดเรื่อง Squeeze",
    },
    {
      day: "Tuesday 11 Aug",
      dayTh: "อังคาร 11 ส.ค.",
      focus: ["LITE", "CRWV"],
      note: "Watch Monday reaction. LITE momentum, CRWV volatile.",
      noteTh: "ดู reaction จากจันทร์ LITE เล่น momentum, CRWV ผันผวน",
    },
    {
      day: "Wednesday 12 Aug",
      dayTh: "พุธ 12 ส.ค.",
      focus: ["CPI Reaction"],
      note: "CPI day – wait for the number before new positions.",
      noteTh: "วัน CPI รอตัวเลขก่อนเปิด position ใหม่",
    },
    {
      day: "Thu–Fri",
      dayTh: "พฤหัส–ศุกร์",
      focus: ["Follow-through"],
      note: "Watch which names continue or reverse after earnings/CPI.",
      noteTh: "ดูตัวที่ยังมีแรงหรือถูกขายหลัง earnings/CPI",
    },
  ],
};
