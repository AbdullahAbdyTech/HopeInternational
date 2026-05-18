import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Hope International Tutor Academy.",
  alternates: {
    canonical: "/privacy"
  }
};

const sections: Array<{ title: string; body: ReactNode }> = [
  {
    title: "Information We Collect",
    body:
      "We collect personal information you provide when registering as a student or teacher, including name, email, phone number, city, and educational details. We may also collect usage data through cookies and analytics."
  },
  {
    title: "How We Use Your Information",
    body:
      "Your information is used to match students with appropriate tutors, communicate about our services, improve our platform, and send relevant updates with your consent."
  },
  {
    title: "Data Protection",
    body:
      "We implement practical security measures to protect your data, including secure services and restricted access. We do not sell your personal information to third parties."
  },
  {
    title: "Cookies",
    body:
      "Our website may use cookies to improve user experience and analyze traffic. You can control cookie settings through your browser preferences."
  },
  {
    title: "Your Rights",
    body: (
      <>
        You can request access, correction, or deletion of your personal information by contacting us at{" "}
        <a href={`mailto:${site.email}`} className="font-semibold text-teal transition hover:text-gold">
          {site.email}
        </a>
        .
      </>
    )
  },
  {
    title: "Contact",
    body: (
      <>
        For privacy questions, contact us at{" "}
        <a href={`mailto:${site.email}`} className="font-semibold text-teal transition hover:text-gold">
          {site.email}
        </a>{" "}
        or{" "}
        <a href={site.phoneHref} className="font-semibold text-teal transition hover:text-gold">
          {site.phone}
        </a>
        .
      </>
    )
  }
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        description="Your privacy is important to us. This policy explains how we handle your information."
      />
      <section className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <p className="mb-8 text-sm font-semibold text-ink-muted">Last updated: April 1, 2026</p>
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.title} className="rounded-3xl border border-black/5 bg-white p-5 shadow-soft sm:p-7">
                <h2 className="font-heading text-xl font-bold text-ink sm:text-2xl">{section.title}</h2>
                <p className="mt-3 leading-8 text-ink-muted">{section.body}</p>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
