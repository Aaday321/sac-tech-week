import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SmartNav } from "./components/smart-nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sacramento Tech Week",
  description: "Sacramento Tech Week",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SmartNav />
        {children}
      </body>
    </html>
  );
}
