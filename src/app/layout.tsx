import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real-Time Orderbook Viewer",
  description:
    "Multi-venue orderbook viewer with order simulation capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-bg-overlay text-text-primary min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
