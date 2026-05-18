import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { PageHero } from "@/components/PageHero";
import { studentFields } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Find Home & Online Tutors Worldwide - Student Registration",
  description:
    "Register to find a verified home tutor or online tutor worldwide for Matric, FSc, O Levels, A Levels, IELTS, Quran learning, and more.",
  keywords: [
    "find home tutor worldwide",
    "find online tutor worldwide",
    "student registration for home tuition",
    "home tutor in Saudi Arabia",
    "home tutor in UAE",
    "online tutor in Saudi Arabia",
    "online tutor in UAE",
    "online tuition registration worldwide"
  ],
  alternates: {
    canonical: "/student-registration"
  }
};

export default function StudentRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Student Registration"
        title="Find Home & Online Tutors Worldwide"
        description="Register for home tuition or online tuition in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, Qatar, Oman, Kuwait, and other countries."
      />
      <section className="bg-surface py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-black/5 bg-white p-5 shadow-elevated sm:p-6 md:p-10">
            <RegistrationForm
              formId="studentForm"
              collectionName="studentRegistrations"
              fields={studentFields}
              submitLabel="Submit Registration"
              successMessage="Student registration submitted successfully."
              emailSubject="New Student Registration - Hope International Tutor Academy"
              emailFormName="Student Registration"
            />
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              ["Home Tuition", "Get a verified tutor at your home in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and other major countries."],
              ["Online Tuition", "Study live with an online tutor from Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and other countries."],
              ["Exam Support", "Prepare for Matric, FSc, O Levels, A Levels, and school assessments."]
            ].map(([title, detail]) => (
              <article key={title} className="rounded-2xl border border-black/5 bg-white p-5 shadow-soft">
                <h2 className="font-heading text-lg font-bold text-ink">{title}</h2>
                <p className="mt-2 text-sm leading-7 text-ink-muted">{detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
