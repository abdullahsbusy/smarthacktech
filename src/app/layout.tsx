import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeScript } from "@/components/theme-script";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { KairaWidget } from "@/components/kaira/kaira-widget";
import { CommandPalette } from "@/components/command-palette/command-palette";
import "./globals.css";

const inter = localFont({
  src: "../../public/fonts/inter-var.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: "../../public/fonts/spacegrotesk-var.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
});

const SITE_URL = "https://www.hacktechzone.com";
const SITE_DESCRIPTION =
  "HackTech is a Pakistani IoT & AI company, SOTMS fleet telematics, smart-home automation, security, with software and training to complete the stack.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HackTech, Pakistan's IoT & AI Ecosystem",
    template: "%s | HackTech",
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: "/images/hacktech-mark.svg",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "HackTech",
    url: SITE_URL,
    title: "HackTech, Pakistan's IoT & AI Ecosystem",
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HackTech, Pakistan's IoT & AI Ecosystem",
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HackTech",
  url: SITE_URL,
  logo: `${SITE_URL}/og-image.png`,
  description:
    "Pakistan's IoT & AI ecosystem, smart fleets, smart homes, security and the software that ties it together.",
  email: "contact.hacktechzone@gmail.com",
  telephone: "+92-327-5516703",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFab />
        <KairaWidget />
        <CommandPalette />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
