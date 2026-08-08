export type Signal = "Buy" | "Hold" | "Sell";

export type Stock = {
  symbol: string;
  name: string;
  nameTh: string;
  shortInterest: number;
  daysToCover: number;
  earningsDate: string;
  earningsTime: "BMO" | "AMC" | "Unknown"; // Before Market Open / After Market Close
  theme: string;
  themeTh: string;
  priority: number;
  signal: Signal;
  signalReason: string;
  signalReasonTh: string;
  notes: string;
  notesTh: string;
  riskLevel: "Low" | "Medium" | "High";
  positionSize: string; // suggested % of capital
  positionSizeTh: string;
};

export const STOCKS: Stock[] = [
  {
    symbol: "ASTS",
    name: "AST SpaceMobile",
    nameTh: "AST SpaceMobile",
    shortInterest: 20.5,
    daysToCover: 3.8,
    earningsDate: "2026-08-10",
    earningsTime: "AMC",
    theme: "Space / Satellite",
    themeTh: "อวกาศ / ดาวเทียม",
    priority: 1,
    signal: "Buy",
    signalReason: "Highest squeeze potential. Enter before or on strong post-earnings reaction.",
    signalReasonTh: "โอกาส Squeeze สูงสุด เข้าก่อนหรือหลัง earnings ถ้ามีแรงซื้อชัด",
    notes: "Highest squeeze potential. High short interest + earnings Monday.",
    notesTh: "โอกาส Squeeze สูงสุด Short สูง + Earnings จันทร์",
    riskLevel: "High",
    positionSize: "1-2% of capital",
    positionSizeTh: "1-2% ของทุน",
  },
  {
    symbol: "RKLB",
    name: "Rocket Lab",
    nameTh: "Rocket Lab",
    shortInterest: 8.5,
    daysToCover: 2.4,
    earningsDate: "2026-08-10",
    earningsTime: "AMC",
    theme: "Space / Launch",
    themeTh: "อวกาศ / จรวด",
    priority: 2,
    signal: "Buy",
    signalReason: "Strong space momentum + earnings catalyst. Good risk/reward.",
    signalReasonTh: "โมเมนตัม Space แรง + มี catalyst จาก earnings",
    notes: "Strong space momentum + earnings. Good catalyst play.",
    notesTh: "โมเมนตัม Space แรง + Earnings ดี",
    riskLevel: "Medium",
    positionSize: "2-3% of capital",
    positionSizeTh: "2-3% ของทุน",
  },
  {
    symbol: "LITE",
    name: "Lumentum",
    nameTh: "Lumentum",
    shortInterest: 11.3,
    daysToCover: 2.2,
    earningsDate: "2026-08-11",
    earningsTime: "AMC",
    theme: "AI Optics",
    themeTh: "AI Optics / Photonics",
    priority: 3,
    signal: "Hold",
    signalReason: "Wait for earnings reaction. Buy only on strong breakout with volume.",
    signalReasonTh: "รอ reaction จาก earnings ก่อน ซื้อเฉพาะถ้าทะลุแรงพร้อม volume",
    notes: "AI optics play with strong recent momentum.",
    notesTh: "เล่นธีม AI Optics โมเมนตัมดี",
    riskLevel: "Medium",
    positionSize: "1-2% of capital",
    positionSizeTh: "1-2% ของทุน",
  },
  {
    symbol: "CRWV",
    name: "CoreWeave",
    nameTh: "CoreWeave",
    shortInterest: 19.5,
    daysToCover: 2.5,
    earningsDate: "2026-08-11",
    earningsTime: "AMC",
    theme: "AI Cloud",
    themeTh: "AI Cloud Infrastructure",
    priority: 4,
    signal: "Hold",
    signalReason: "High short interest but very volatile. Wait for clear post-earnings direction.",
    signalReasonTh: "Short สูงแต่ผันผวนมาก รอทิศทางชัดหลัง earnings ก่อน",
    notes: "High short + AI cloud. Volatile but high potential.",
    notesTh: "Short สูง + AI Cloud ความผันผวนสูง",
    riskLevel: "High",
    positionSize: "0.5-1.5% of capital",
    positionSizeTh: "0.5-1.5% ของทุน",
  },
  {
    symbol: "SMCI",
    name: "Super Micro Computer",
    nameTh: "Super Micro Computer",
    shortInterest: 14.2,
    daysToCover: 1.8,
    earningsDate: "2026-08-11",
    earningsTime: "AMC",
    theme: "AI Server",
    themeTh: "AI Server / Hardware",
    priority: 5,
    signal: "Hold",
    signalReason: "AI server name with earnings. Watch reaction carefully, high volatility.",
    signalReasonTh: "หุ้น AI Server มี earnings ระวังความผันผวน ดู reaction ก่อน",
    notes: "AI infrastructure hardware. Earnings Tuesday.",
    notesTh: "ฮาร์ดแวร์ AI มี earnings วันอังคาร",
    riskLevel: "High",
    positionSize: "1% of capital",
    positionSizeTh: "1% ของทุน",
  },
  {
    symbol: "COHR",
    name: "Coherent",
    nameTh: "Coherent",
    shortInterest: 9.8,
    daysToCover: 2.1,
    earningsDate: "2026-08-12",
    earningsTime: "AMC",
    theme: "AI Photonics",
    themeTh: "AI Photonics / Optics",
    priority: 6,
    signal: "Hold",
    signalReason: "Optics / photonics name. Better to wait for CPI + earnings reaction.",
    signalReasonTh: "กลุ่ม Optics รอ CPI และ earnings reaction ก่อนตัดสินใจ",
    notes: "Related to AI optics theme. Earnings around CPI day.",
    notesTh: "เกี่ยวข้องธีม AI Optics รายงานใกล้วัน CPI",
    riskLevel: "Medium",
    positionSize: "1-2% of capital",
    positionSizeTh: "1-2% ของทุน",
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
      note: "Both report after close (AMC). ASTS highest squeeze priority.",
      noteTh: "ทั้งคู่รายงานหลังปิด (AMC) ASTS สำคัญสุดเรื่อง Squeeze",
    },
    {
      day: "Tuesday 11 Aug",
      dayTh: "อังคาร 11 ส.ค.",
      focus: ["LITE", "CRWV", "SMCI"],
      note: "Watch Monday reaction. Multiple AI + optics names report AMC.",
      noteTh: "ดู reaction จากจันทร์ มีหลายตัวในกลุ่ม AI รายงาน AMC",
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

export const RISK_RULES = {
  title: "Risk Rules · กรอบความเสี่ยง",
  titleTh: "กรอบความเสี่ยงที่แนะนำ",
  rules: [
    {
      en: "Never risk more than 1% of total capital on a single trade.",
      th: "อย่าเสี่ยงเกิน 1% ของทุนทั้งหมดในหนึ่งออเดอร์",
    },
    {
      en: "High short interest + earnings = higher gap risk. Use smaller size.",
      th: "Short สูง + มี earnings = เสี่ยง gap สูง ใช้ size เล็กลง",
    },
    {
      en: "Prefer entering after confirmation (volume + direction) rather than guessing the earnings number.",
      th: "ควรเข้าหลังมี confirmation (volume + ทิศทาง) ดีกว่าเดาตัวเลข earnings",
    },
    {
      en: "Scale out on strength. Do not wait for the exact top.",
      th: "ขายทำกำไรเป็นส่วนๆ เมื่อราคาวิ่งแรง อย่ารอจุดสูงสุด",
    },
    {
      en: "If CPI comes out hot, reduce or avoid new positions in high-beta names.",
      th: "ถ้า CPI ออกมาแรง ให้ลดหรือเลี่ยงเปิด position ใหม่ในหุ้นผันผวนสูง",
    },
  ],
};
