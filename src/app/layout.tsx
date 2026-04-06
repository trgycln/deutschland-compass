import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { AudioProvider } from "@/context/AudioContext";
import { GlobalAudioPlayer } from "@/components/global-audio-player";
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
  metadataBase: new URL("https://deutschland-compass-self.vercel.app"),
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
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css"
        />
        <Script id="cleanup-extension-attributes" strategy="beforeInteractive">
          {`
            (() => {
              const attrs = ['bis_skin_checked', 'data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'];

              const stripAttrs = (root) => {
                if (!root || typeof root.querySelectorAll !== 'function') return;

                attrs.forEach((attr) => {
                  if (typeof root.removeAttribute === 'function') {
                    root.removeAttribute(attr);
                  }

                  root.querySelectorAll('[' + attr + ']').forEach((element) => {
                    element.removeAttribute(attr);
                  });
                });
              };

              const start = () => {
                stripAttrs(document.documentElement);
                stripAttrs(document.body);

                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.target instanceof Element) {
                      attrs.forEach((attr) => mutation.target.removeAttribute(attr));
                    }

                    mutation.addedNodes.forEach((node) => {
                      if (node instanceof Element) {
                        stripAttrs(node);
                      }
                    });
                  });
                });

                observer.observe(document.documentElement, {
                  subtree: true,
                  childList: true,
                  attributes: true,
                  attributeFilter: attrs,
                });
              };

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', start, { once: true });
              } else {
                start();
              }
            })();
          `}
        </Script>
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AudioProvider>
          <AppShell>
            {children}
          </AppShell>
          <GlobalAudioPlayer />
          <Analytics />
        </AudioProvider>
      </body>
    </html>
  );
}
