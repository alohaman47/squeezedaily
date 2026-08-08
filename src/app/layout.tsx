import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SqueezeDaily | Short Squeeze & Daily Trade Plan",
  description: "Daily & Weekly trading plan for ASTS, RKLB, LITE, CRWV – Short Squeeze focused",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
