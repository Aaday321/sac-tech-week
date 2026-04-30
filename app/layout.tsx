import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
