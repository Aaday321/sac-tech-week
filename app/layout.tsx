import type { Metadata } from "next";
import { SmartNav } from "./components/smart-nav";
import "./globals.css";

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
    <html lang="en">
      <body>
        <SmartNav />
        {children}
      </body>
    </html>
  );
}
