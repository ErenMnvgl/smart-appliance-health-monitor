import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Vestel Smart Appliance Connection & Health Monitor",
  description: "A premium connected smart home ecosystem dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-black text-white min-h-screen selection:bg-red-600 selection:text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
