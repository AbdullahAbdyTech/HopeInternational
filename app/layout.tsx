import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SocialFloatingButtons } from "@/components/SocialFloatingButtons";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Best Home Tutor & Online Tutor in Pakistan | Hope International Academy",
    template: "%s | Hope International Academy"
  },
  description: site.description,
  authors: [{ name: site.name }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: "Best Home Tutor & Online Tutor in Pakistan | Hope International Academy",
    description: site.description,
    siteName: site.name
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Home Tutor & Online Tutor in Pakistan | Hope International Academy",
    description: site.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <SocialFloatingButtons />
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
