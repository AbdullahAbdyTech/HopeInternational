import type { Metadata } from "next";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { EnrollmentLeadForm } from "@/components/forms/EnrollmentLeadForm";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Student Enrollment for Home & Online Tutoring",
  description:
    "Enroll a student for home tutoring or online tutoring worldwide. Submit your details and Hope International Tutor Academy will contact you with next steps.",
  keywords: [
    "student enrollment",
    "home tutor enrollment",
    "online tutor enrollment",
    "student lead form",
    "enroll for tuition",
    "home tuition worldwide",
    "online tuition worldwide"
  ],
  alternates: {
    canonical: "/student-enrollment"
  },
  openGraph: {
    title: "Student Enrollment for Home & Online Tutoring",
    description:
      "Request a verified home or online tutor for Matric, FSc, O/A Levels, IELTS, Quran studies, coding, and major school subjects.",
    url: "/student-enrollment",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=70",
        width: 1200,
        height: 800,
        alt: "Students walking on an academy campus"
      }
    ]
  }
};

const steps = [
  ["Submit inquiry", "Share the student and course details."],
  ["Get contacted", "We confirm requirements and availability."],
  ["Start learning", "Begin home or online tutoring sessions."]
];

export default function StudentEnrollmentPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Student Enrollment for Home and Online Tutoring",
          url: `${site.url}/student-enrollment`,
          description: "Enrollment lead form for students requesting home tutoring or online tutoring worldwide.",
          publisher: {
            "@type": "EducationalOrganization",
            name: site.name,
            url: site.url,
            email: site.email,
            telephone: site.phone
          },
          potentialAction: {
            "@type": "RegisterAction",
            target: `${site.url}/student-enrollment`,
            name: "Submit student enrollment inquiry"
          }
        }}
      />

      <section
        className="relative min-h-[88svh] overflow-hidden bg-cover bg-center pt-28 text-white sm:pt-36"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(2,6,23,0.94), rgba(9,86,88,0.82), rgba(2,6,23,0.55)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1500&q=70')"
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(255,255,255,0.28)_0_1px,transparent_1.8px)] bg-[length:190px_170px]" />
        <Container className="relative z-10 grid min-h-[calc(88svh-9rem)] items-center gap-10 pb-14 lg:grid-cols-[1.05fr_0.55fr]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-gold-soft backdrop-blur">
              Student Enrollment
            </p>
            <h1 className="mt-6 break-words font-heading text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
              Find the right tutor for your next study goal
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-xl">
              Request home tutoring or online tutoring for Matric, FSc, O/A Levels, IGCSE, IELTS, Quran studies,
              coding, and major school subjects.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#enrollment-form" size="large" className="w-full sm:w-auto">
                Enroll Now
              </ButtonLink>
              <ButtonLink href={site.whatsappHref} variant="secondary" size="large" className="w-full sm:w-auto">
                WhatsApp Us
              </ButtonLink>
            </div>
          </div>

          <aside className="grid max-w-lg gap-4 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-elevated backdrop-blur">
            {[
              ["3,000+", "students supported"],
              ["10+", "countries served"],
              ["50+", "subjects covered"]
            ].map(([value, label]) => (
              <div key={label} className="flex items-center justify-between gap-5 border-b border-white/15 pb-4 last:border-b-0 last:pb-0">
                <strong className="font-heading text-3xl text-gold-soft">{value}</strong>
                <span className="text-right text-sm font-semibold text-white/75">{label}</span>
              </div>
            ))}
          </aside>
        </Container>
      </section>

      <section id="enrollment-form" className="bg-gradient-to-b from-white to-surface py-16 sm:py-20">
        <Container className="grid items-start gap-8 lg:grid-cols-[0.65fr_1fr]">
          <div className="lg:sticky lg:top-28">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Quick Tutor Match</p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Submit your student details
            </h2>
            <p className="mt-4 text-base leading-8 text-ink-muted">
              Our team reviews the course, city, preferred learning mode, and contact details before sharing the next steps.
            </p>
            <ul className="mt-7 grid gap-3">
              {steps.map(([title, detail], index) => (
                <li key={title} className="grid grid-cols-[2.6rem_1fr] items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-soft">
                  <span className="row-span-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal font-bold text-white">
                    {index + 1}
                  </span>
                  <strong className="leading-tight text-ink">{title}</strong>
                  <small className="text-sm leading-6 text-ink-muted">{detail}</small>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-elevated sm:p-6 md:p-10">
            <EnrollmentLeadForm />
          </div>
        </Container>
      </section>
    </>
  );
}
