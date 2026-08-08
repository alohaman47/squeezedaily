export type Signal = "Buy" | "Hold" | "Sell";

export type Stock = {
  symbol: string;
  name: string;
  nameTh: string;
  shortInterest: number;
  daysToCover: number;
  earningsDate: string;
  theme: string;
  themeTh: string;
  priority: number;
  signal: Signal;
  signalReason: string;
  signalReasonTh: string;
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
    signal: "Buy",
    signalReason: "Highest squeeze potential. Enter before or on strong post-earnings reaction.",
    signalReasonTh: "โอกาส Squeeze สูงสุด เข้าก่อนหรือหลัง earnings ถ้ามีแรงซื้อชัด",
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
    signal: "Buy",
    signalReason: "Strong space momentum + earnings catalyst. Good risk/reward.",
    signalReasonTh: "โมเมนตัม Space แรง + มี catalyst จาก earnings",
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
    signal: "Hold",
    signalReason: "Wait for earnings reaction. Buy only on strong breakout with volume.",
    signalReasonTh: "รอ reaction จาก earnings ก่อน ซื้อเฉพาะถ้าทะลุแรงพร้อม volume",
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
    signal: "Hold",
    signalReason: "High short interest but very volatile. Wait for clear post-earnings direction.",
    signalReasonTh: "Short สูงแต่ผันผวนมาก รอทิศทางชัดหลัง earnings ก่อน",
    notes: "High short + AI cloud. Volatile but high potential.",
    notesTh: "Short สูง + AI Cloud ความผันผวนสูง",
  },
  {
    symbol: "SMCI",
    name: "Super Micro Computer",
    nameTh: "Super Micro Computer",
    shortInterest: 14.2,
    daysToCover: 1.8,
    earningsDate: "2026-08-11",
    theme: "AI Server",
    themeTh: "AI Server / Hardware",
    priority: 5,
    signal: "Hold",
    signalReason: "AI server name with earnings. Watch reaction carefully, high volatility.",
    signalReasonTh: "หุ้น AI Server มี earnings ระวังความผันผวน ดู reaction ก่อน",
    notes: "AI infrastructure hardware. Earnings Tuesday.",
    notesTh: "ฮาร์ดแวร์ AI มี earnings วันอังคาร",
  },
  {
    symbol: "COHR",
    name: "Coherent",
    nameTh: "Coherent",
    shortInterest: 9.8,
    daysToCover: 2.1,
    earningsDate: "2026-08-12",
    theme: "AI Photonics",
    themeTh: "AI Photonics / Optics",
    priority: 6,
    signal: "Hold",
    signalReason: "Optics / photonics name. Better to wait for CPI + earnings reaction.",
    signalReasonTh: "กลุ่ม Optics รอ CPI และ earnings reaction ก่อนตัดสินใจ",
    notes: "Related to AI optics theme. Earnings around CPI day.",
    notesTh: "เกี่ยวข้องธีม AI Optics รายงานใกล้วัน CPI",
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
      focus: ["LITE", "CRWV", "SMCI"],
      note: "Watch Monday reaction. Multiple AI + optics names report.",
      noteTh: "ดู reaction จากจันทร์ มีหลายตัวในกลุ่ม AI รายงาน",
    },
    {
      day: "Wednesday 12 Aug",
      dayTh: "พุธ 12 ส.ค.",
      focus: ["CPI", "COHR"],
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
