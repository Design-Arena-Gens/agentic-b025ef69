import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TeamForgeProvider } from "@/lib/state";
import { NavBar } from "@/components/layout/nav-bar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Forge — Assemble Legendary Founder Cells",
  description:
    "Drop into curated 3-6 person startup squads. Team Forge auto-matches Product, Tech, Design, Growth, Community, and Ops builders based on pure vibe and mission.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TeamForgeProvider>
          <div className="flex min-h-screen flex-col gap-10 pb-16">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </TeamForgeProvider>
      </body>
    </html>
  );
}
