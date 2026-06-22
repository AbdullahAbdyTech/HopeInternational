import type { Metadata } from "next";

import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { EnrollmentCompletionTracker } from "@/components/EnrollmentCompletionTracker";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Enrollment Request Received",
  description: "Thank you for submitting your student enrollment request to Hope International Tutor Academy.",
  alternates: {
    canonical: "/thank-you"
  },
  robots: {
    index: false,
    follow: true
  },
  openGraph: {
    title: "Enrollment Request Received",
    description: "Your student enrollment request has been received. Our team will contact you with the next steps.",
    url: "/thank-you",
    type: "website"
  }
};

const nextSteps = [
  ["Requirement review", "We check the course, location, and preferred learning mode."],
  ["Contact confirmation", "You may receive a WhatsApp, phone, or email follow-up."],
  ["Tutor matching", "We share suitable options based on availability."]
];

export default function ThankYouPage() {
  return (
    <>
      <EnrollmentCompletionTracker />
      <section
        className="grid min-h-[82svh] items-center bg-cover bg-center py-28 sm:py-36"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(249,248,245,0.96)), url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1500&q=70')"
        }}
      >
        <Container>
          <div className="mx-auto max-w-4xl rounded-3xl border border-black/5 bg-white/90 p-6 text-center shadow-elevated sm:p-10 md:p-14">
            <span className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl font-extrabold text-green-700">
              ✓
            </span>
            <h1 className="font-heading text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
              Enrollment request received
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-ink-muted">
              Thank you for contacting Hope International Tutor Academy. Our team will review your request and contact you with the next steps.
            </p>
            <div className="my-8 grid gap-4 text-left md:grid-cols-3">
              {nextSteps.map(([title, detail], index) => (
                <article key={title} className="rounded-2xl border border-black/5 bg-surface p-5">
                  <strong className="block text-ink">
                    {index + 1}. {title}
                  </strong>
                  <span className="mt-2 block text-sm leading-7 text-ink-muted">{detail}</span>
                </article>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/" className="w-full sm:w-auto">
                Back to Home
              </ButtonLink>
              <ButtonLink href={site.whatsappHref} variant="outline" className="w-full sm:w-auto">
                Message on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
