import Link from "next/link";

import { Container } from "@/components/Container";
import { servicesNav, site } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  ...servicesNav
];

const audienceLinks = [
  { label: "Student Enrollment", href: "/student-enrollment" },
  { label: "Student Registration", href: "/student-registration" },
  { label: "Teacher Registration", href: "/teacher-registration" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" }
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-neutral-950 to-black pt-14 text-white/70 sm:pt-16">
      <Container className="grid gap-10 pb-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-bright font-heading text-2xl font-extrabold text-white shadow-gold">
              H
            </span>
            <span className="font-heading text-base font-bold leading-tight text-white">
              Hope International
              <br />
              <span className="text-xs uppercase tracking-[0.12em] text-gold-bright">Tutor Academy</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7">
            Providing quality education through home tutoring and online tutoring worldwide since {site.founded}.
          </p>
        </div>

        <FooterColumn title="Quick Links" links={quickLinks} />
        <FooterColumn title="For You" links={audienceLinks} />

        <div>
          <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white">Contact</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="break-words transition hover:text-gold-bright">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="transition hover:text-gold-bright">
                {site.phone}
              </a>
            </li>
            <li>{site.locations.join(", ")}</li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10 px-16 pb-24 pt-6 text-center text-xs text-white/45 sm:px-0 sm:py-6">
        <Container>
          <p>&copy; 2026 Hope International Tutor Academy. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h2 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white">{title}</h2>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition hover:text-gold-bright">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
