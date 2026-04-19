import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UptimeMonitor",
  description: "Advanced website uptime and incident monitoring platform.",
};

import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full antialiased bg-[#070D1F] text-[#EDF2FF] selection:bg-[#4FFFB0] selection:text-[#070D1F] scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
