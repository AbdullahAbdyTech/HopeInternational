import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact for Home & Online Tutors Worldwide",
  description:
    "Contact Hope International Tutor Academy to hire a home tutor or start online tuition worldwide in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and more.",
  keywords: [
    "contact online tutor worldwide",
    "online tutor Saudi Arabia contact",
    "online tutor UAE contact",
    "home tutor worldwide contact",
    "online tutor Pakistan contact",
    "Hope International Tutor Academy contact"
  ],
  alternates: {
    canonical: "/contact"
  }
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact Hope International Tutor Academy",
          description: "Get in touch with Hope International Tutor Academy for tutoring services."
        }}
      />
      <PageHero
        eyebrow="Contact"
        title="Contact Hope International Tutor Academy"
        description="Need a home tutor or online tuition worldwide? Reach out and we will respond as soon as possible."
      />
      <section className="bg-surface py-14 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-elevated">
            <div className="bg-gradient-to-br from-teal-dark via-teal to-neutral-950 p-8 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-soft">Direct Contact</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold">Get In Touch</h2>
              <p className="mt-3 text-sm leading-7 text-white/75">
                Contact us for home tutor matching, online tuition, student registration, tutor applications, or service questions.
              </p>
            </div>
            <div className="space-y-4 p-6 md:p-8">
              <ContactItem icon="mail" title="Email" value={site.email} href={`mailto:${site.email}`} />
              <ContactItem icon="phone" title="Phone" value={site.phone} href={site.phoneHref} />
              <ContactItem icon="location" title="Locations" value={site.locations.join(", ")} />
              <ContactItem icon="clock" title="Hours" value="Mon - Sat: 9:00 AM - 8:00 PM" />
              <div className="grid gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(37,211,102,0.24)] transition hover:-translate-y-0.5"
                >
                  WhatsApp Us
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center rounded-full border border-teal/20 bg-teal-soft px-5 py-3 text-sm font-bold text-teal transition hover:-translate-y-0.5 hover:bg-teal hover:text-white"
                >
                  Send Email
                </a>
              </div>
              <div className="border-t border-black/10 pt-6">
                <p className="mb-3 text-sm font-bold text-ink">Follow us on social media</p>
                <SocialLinks />
              </div>
            </div>
          </aside>
          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-elevated sm:p-6 md:p-10">
            <h2 className="mb-6 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Send a Message</h2>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactItem({
  icon,
  title,
  value,
  href
}: {
  icon: "mail" | "phone" | "location" | "clock";
  title: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-black/5 bg-surface p-4 sm:gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-teal shadow-soft">
        <ContactIcon icon={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-ink">{title}</p>
        {href ? (
          <a href={href} className="break-words text-sm leading-6 text-ink-muted transition hover:text-teal">
            {value}
          </a>
        ) : (
          <p className="text-sm leading-6 text-ink-muted">{value}</p>
        )}
      </div>
    </div>
  );
}

function ContactIcon({ icon }: { icon: "mail" | "phone" | "location" | "clock" }) {
  const common = "h-5 w-5";

  if (icon === "mail") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "phone") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M7 4h3l1.4 4-2 1.2a10.5 10.5 0 0 0 5.4 5.4l1.2-2 4 1.4v3a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 4 6.2 2 2 0 0 1 6 4h1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "location") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
