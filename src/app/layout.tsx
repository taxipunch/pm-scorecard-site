import type { Metadata } from "next";
import { Anton, Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const heading = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading"
});
const body = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Automation Readiness Scorecard | TaxiPunch",
  description: "10 questions. 3 minutes. See how much ground your operation covers — when you're not there.",
  openGraph: {
    title: "Automation Readiness Scorecard | TaxiPunch",
    description: "Find out how automated your operation really is — and what your competitors are doing that you're not. Free. 3 minutes. Immediate results.",
    url: "https://taxipunch.com",
    siteName: "TaxiPunch",
    images: [
      {
        url: "/images/hero.png",
        width: 2048,
        height: 2048,
        alt: "Automation Readiness Scorecard",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automation Readiness Scorecard | TaxiPunch",
    description: "Find out how automated your operation really is. Free. 3 minutes. Immediate results.",
    images: ["/images/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
