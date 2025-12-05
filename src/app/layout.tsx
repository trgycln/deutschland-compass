import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deutschland Compass | Dayanışma Ağı",
  description: "Almanya'daki profesyoneller için karşılıklı fayda esaslı, kapalı devre rehberlik ve tecrübe paylaşım platformu.",
  openGraph: {
    title: "Deutschland Compass | Dayanışma Ağı",
    description: "Almanya'daki profesyoneller için karşılıklı fayda esaslı, kapalı devre rehberlik ve tecrübe paylaşım platformu.",
    siteName: "Deutschland Compass",
    images: [
      {
        url: "/dc_logo.png",
        width: 800,
        height: 800,
        alt: "Deutschland Compass Logo",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
