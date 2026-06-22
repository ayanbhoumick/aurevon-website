import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import LenisProvider from "@/components/LenisProvider";
import { organizationSchema, websiteSchema, safeJsonLd } from "@/lib/schema";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Aurevon",
    default: "Aurevon: Handmade Amplifiers from Greater Noida",
  },
  description:
    "Handmade amplifiers from Greater Noida. Built to honour music in its truest form.",
  metadataBase: new URL("https://aurevonlabs.com"),
  openGraph: {
    type: "website",
    siteName: "Aurevon",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=tasa-orbiter@100,200,300,400,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd([organizationSchema(), websiteSchema()]),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {/* Glass distortion filter — used by Navbar glass effect */}
        <svg style={{ display: "none" }} aria-hidden="true">
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
            <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
            <feComponentTransfer in="turbulence" result="mapped">
              <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
              <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
              <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
            </feComponentTransfer>
            <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
            <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
              <fePointLight x="-200" y="-200" z="300" />
            </feSpecularLighting>
            <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
            <feDisplacementMap in="SourceGraphic" in2="softMap" scale="80" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
