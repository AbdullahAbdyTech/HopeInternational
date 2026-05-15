import type { Metadata } from "next";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { HeroParticles } from "@/components/HeroParticles";
import { IconBadge } from "@/components/IconBadge";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { StatCounter } from "@/components/StatCounter";
import { servicesNav, site, stats, subjects, testimonials, whyChooseUs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Best Home Tutor & Online Tutor in Pakistan",
  description:
    "Pakistan's trusted home tutoring and online tuition academy. Find verified tutors for Matric, FSc, O Levels, A Levels, and all major subjects.",
  alternates: {
    canonical: "/"
  }
};

const services = [
  {
    title: "In-Home Tutoring",
    description:
      "Professional tutors come to your home for focused one-on-one sessions in a comfortable learning environment.",
    href: "/home-tutoring",
    icon: "home"
  },
  {
    title: "Online Tutoring",
    description:
      "Live interactive classes from anywhere with screen sharing, digital whiteboards, and flexible scheduling.",
    href: "/online-tutoring",
    icon: "online"
  },
  {
    title: "Exam Preparation",
    description:
      "Focused preparation for board exams, entry tests, and competitive exams with proven study strategies.",
    href: "/contact",
    icon: "exam"
  }
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: site.name,
          url: site.url,
          description: site.description,
          email: site.email,
          telephone: site.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: site.locations.join(", "),
            addressCountry: "PK"
          },
          areaServed: site.locations,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: site.phone,
            contactType: "customer service",
            availableLanguage: ["English", "Urdu"]
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Tutoring Services",
            itemListElement: servicesNav.map((service) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: service.label }
            }))
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "3000",
            bestRating: "5"
          }
        }}
      />

      <section
        className="galaxy-hero relative min-h-[88svh] overflow-hidden bg-cover bg-center pt-24 text-white sm:min-h-[92vh] sm:pt-32"
        style={{
          backgroundImage:
            "radial-gradient(circle at 78% 30%, rgba(125, 229, 255, 0.28), transparent 32%), radial-gradient(circle at 55% 62%, rgba(229, 168, 32, 0.2), transparent 34%), linear-gradient(90deg, rgba(2, 6, 23, 0.94), rgba(10, 18, 45, 0.76), rgba(3, 7, 18, 0.45)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80')"
        }}
      >
        <div className="ai-hero-grid" aria-hidden="true" />
        <HeroParticles />
        <Container className="relative z-10 grid min-h-[calc(88svh-6rem)] items-center pb-12 sm:min-h-[calc(92vh-8rem)] sm:pb-16">
          <Reveal className="max-w-3xl">
            <p className="galaxy-badge mb-5 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <span className="mr-2 h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,0.9)]" />
              Enrolling Now
            </p>
            <h1 className="break-words font-heading text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
              Pakistan&apos;s <span className="text-luxury">Home & Online</span> Tutoring Academy
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/80 sm:mt-6 md:text-xl">
              Unlock your child&apos;s potential with personalized tutoring from qualified professionals.
              Expert tutors for every subject and every grade.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
              <ButtonLink href="/student-registration" size="large" className="w-full sm:w-auto">
                Get Started
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="large" className="w-full sm:w-auto">
                Contact Us
              </ButtonLink>
            </div>
            <div className="galaxy-trust mt-8 inline-flex max-w-full flex-wrap justify-center rounded-full border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white/80 backdrop-blur sm:mt-9 sm:px-5">
              Trusted by <span className="px-1 text-white">3,000+</span> families across Pakistan
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="-mt-8 bg-white pb-12 sm:-mt-10 sm:pb-16">
        <Container className="relative z-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <StatCounter {...stat} />
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="bg-gradient-to-b from-surface to-surface-warm py-20">
        <Container>
          <SectionHeader
            eyebrow="Our Services"
            title="Tailored Tutoring Solutions"
            description="Personalized education that adapts to every student's learning style, academic level, and schedule."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 90}>
                <article className="elegant-card h-full rounded-3xl border border-black/5 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elevated sm:p-8">
                  <IconBadge icon={service.icon} />
                  <h3 className="mt-6 font-heading text-2xl font-bold text-ink">{service.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink-muted">{service.description}</p>
                  <ButtonLink href={service.href} variant="outline" className="mt-7">
                    Learn More
                  </ButtonLink>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader eyebrow="Why Choose Us" title="The Hope International Difference" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <article className="elegant-card h-full rounded-3xl border border-black/5 bg-white p-6 shadow-soft transition hover:-translate-y-1 sm:p-7">
                  <IconBadge icon={item.icon} />
                  <h3 className="mt-5 font-heading text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-muted">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container>
          <SectionHeader eyebrow="Subjects" title="We Cover All Major Subjects" />
          <div className="flex flex-wrap justify-center gap-3">
            {subjects.map((subject, index) => (
              <Reveal key={subject} delay={index * 35}>
                <span className="inline-flex rounded-full border border-black/5 bg-white px-4 py-2.5 text-sm font-bold text-ink-muted shadow-soft transition hover:-translate-y-0.5 hover:text-teal sm:px-6 sm:py-3">
                  {subject}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeader eyebrow="Testimonials" title="What Parents & Students Say" />
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 90}>
                <article className="elegant-card h-full rounded-3xl border border-black/5 bg-surface-warm p-6 shadow-soft sm:p-8">
                  <p className="text-lg tracking-[0.15em] text-gold">*****</p>
                  <p className="mt-5 text-sm leading-7 text-ink-muted">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-6 border-t border-black/10 pt-5">
                    <p className="font-bold text-ink">{testimonial.name}</p>
                    <p className="text-sm text-ink-muted">{testimonial.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="cosmic-cta bg-gradient-to-br from-teal-dark via-teal to-neutral-950 py-16 text-white sm:py-20">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-extrabold sm:text-4xl">Ready to Start Your Learning Journey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            Join students who are already improving with personalized support from Hope International Academy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/student-registration" size="large" className="w-full sm:w-auto">
              Register as Student
            </ButtonLink>
            <ButtonLink href="/teacher-registration" variant="secondary" size="large" className="w-full sm:w-auto">
              Join as Tutor
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
