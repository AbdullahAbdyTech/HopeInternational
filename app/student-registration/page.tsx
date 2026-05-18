import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { PageHero } from "@/components/PageHero";
import { studentFields } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Find a Home Tutor in Pakistan - Student Registration",
  description:
    "Register to find a verified home tutor in Lahore, Islamabad, or Faisalabad, or get online tuition in Pakistan for Matric, FSc, O Levels, and A Levels.",
  keywords: [
    "find home tutor in Pakistan",
    "student registration for home tuition",
    "home tutor in Lahore",
    "home tutor in Islamabad",
    "home tutor in Faisalabad",
    "online tuition registration Pakistan"
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
        title="Find a Home Tutor or Online Tutor in Pakistan"
        description="Register for home tuition in Lahore, Islamabad, or Faisalabad, or online tuition anywhere in Pakistan."
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
              ["Home Tuition", "Get a verified tutor at your home in Lahore, Islamabad, or Faisalabad."],
              ["Online Tuition", "Study live with an online tutor from anywhere in Pakistan."],
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
