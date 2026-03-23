import type { Metadata } from "next";
import { Anton, Roboto } from "next/font/google";
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
  title: "Scorecard Website",
  description: "Assessment landing page and quiz funnel.",
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
      </body>
    </html>
  );
}
