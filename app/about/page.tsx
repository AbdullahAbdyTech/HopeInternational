import type { Metadata } from "next";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { site, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Hope International Tutor Academy - Worldwide Home & Online Tutoring",
  description:
    "Learn about Hope International Tutor Academy, a home tutoring and online tuition service helping students worldwide in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and more.",
  keywords: [
    "worldwide home tutoring academy",
    "worldwide online tutoring academy",
    "home tuition academy worldwide",
    "online tuition Saudi Arabia",
    "online tuition UAE",
    "Hope International Tutor Academy"
  ],
  alternates: {
    canonical: "/about"
  }
};

const values = [
  "Excellence in tutor selection and teaching quality.",
  "Accessible education for families worldwide.",
  "Personalized support for every student's learning style.",
  "Transparent processes that build parent confidence."
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Hope International Tutor Academy",
          description: "Learn about our mission to provide quality home tutoring and online tutoring worldwide."
        }}
      />
      <PageHero
        eyebrow="About Us"
        title="About Hope International Tutor Academy"
        description="Empowering students in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and other countries with quality personalized education since 2020."
      />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.78fr]">
          <div className="max-w-none">
            <h2 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">Our Mission</h2>
            <p className="mt-4 text-ink-muted">
              At {site.name}, we believe every student deserves access to quality education. Our
              mission is to connect families with expert educators through personalized one-on-one
              tutoring at home and online for Matric, FSc, O Levels, A Levels, and major school subjects.
            </p>
            <h2 className="mt-10 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Our Story</h2>
            <p className="mt-4 text-ink-muted">
              Founded in 2020, Hope International Tutor Academy started with a simple goal: make quality
              tutoring accessible and affordable for families wherever they study. What began as a small
              team of educators has grown into a network of 1000+ verified tutors serving students in
              Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and other major countries.
            </p>
            <h2 className="mt-10 font-heading text-2xl font-extrabold text-ink sm:text-3xl">Our Values</h2>
            <ul className="mt-5 space-y-3 text-ink-muted">
              {values.map((value) => (
                <li key={value} className="rounded-2xl border border-black/5 bg-surface px-5 py-4">
                  {value}
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-3xl bg-gradient-to-br from-teal-dark to-teal p-6 text-white shadow-elevated sm:p-8">
            <h2 className="font-heading text-2xl font-extrabold sm:text-3xl">Our Impact</h2>
            <p className="mt-4 text-white/75">
              Over 3,000 students have received study support through our home tutoring and online
              tutoring services worldwide.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/15 bg-white/10 p-5">
                  <p className="font-heading text-3xl font-bold">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="text-sm text-white/75">{stat.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </Container>
      </section>
      <section className="bg-surface py-14 sm:py-20">
        <Container className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-ink sm:text-4xl">Join the Hope International Tutor Family</h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-muted">
            Whether you are a student seeking help or an educator looking to make a difference, we
            are ready to connect you with the right opportunity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/student-registration" size="large" className="w-full sm:w-auto">
              Register as Student
            </ButtonLink>
            <ButtonLink href="/teacher-registration" variant="outline" size="large" className="w-full sm:w-auto">
              Join as Tutor
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
