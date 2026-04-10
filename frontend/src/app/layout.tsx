import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "PathAI | Autonomous Career Roadmap Architect",
  description: "Navigate your software engineering career with AI-driven personalized roadmaps, resume intelligence, and mentor guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={outfit.className}>
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
