import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://grapl.ai"),
  title: {
    default: "grapl.ai — AI Tools for Everyday Challenges",
    template: "%s — grapl.ai",
  },
  description: "Small tools. Big impact. AI micro-apps that help you grapple with everyday challenges.",
  keywords: ["grapl.ai", "AI micro-apps", "productivity", "experiments", "tools"],
  themeColor: "#111827",
  openGraph: {
    title: "grapl.ai — AI Tools for Everyday Challenges",
    description:
      "Small tools. Big impact. AI micro-apps that help you grapple with everyday challenges.",
    url: "/",
    siteName: "grapl.ai",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "grapl.ai — AI micro-apps for everyday challenges",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "grapl.ai — AI Tools for Everyday Challenges",
    description:
      "Small tools. Big impact. AI micro-apps that help you grapple with everyday challenges.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.png"],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased bg-gray-900 text-white`}
      >
        {children}
        {/* Plausible Analytics — privacy-first, no cookies, GDPR-compliant */}
        <Script
          defer
          data-domain="grapl.ai,defecttrack.grapl.ai"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2LV8M16JH1"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2LV8M16JH1');
          `}
        </Script>
      </body>
    </html>
  );
}
