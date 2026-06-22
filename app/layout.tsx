import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { StudentRegistrationPrompt } from "@/components/forms/StudentRegistrationPrompt";
import { Header } from "@/components/Header";
import { MetaPixel } from "@/components/MetaPixel";
import { SocialFloatingButtons } from "@/components/SocialFloatingButtons";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Home & Online Tutors Worldwide | Hope International Tutor Academy",
    template: "%s | Hope International Tutor Academy"
  },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  },
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
    title: "Home & Online Tutors Worldwide | Hope International Tutor Academy",
    description: site.description,
    siteName: site.name
  },
  twitter: {
    card: "summary_large_image",
    title: "Home & Online Tutors Worldwide | Hope International Tutor Academy",
    description: site.description
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MetaPixel />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <StudentRegistrationPrompt />
        <main id="main">{children}</main>
        <SocialFloatingButtons />
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
