import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { PageHero } from "@/components/PageHero";
import { teacherFields } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Home Tutor Jobs & Online Teaching Jobs Worldwide - Teacher Registration",
  description:
    "Apply for home tutor jobs and online teaching opportunities worldwide for students in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and more.",
  keywords: [
    "home tutor jobs worldwide",
    "home tutor jobs Saudi Arabia",
    "home tutor jobs UAE",
    "online teaching jobs worldwide",
    "online tutor jobs Saudi Arabia",
    "online tutor jobs UAE",
    "tuition teacher jobs worldwide",
    "teacher registration worldwide",
    "online tutor registration"
  ],
  alternates: {
    canonical: "/teacher-registration"
  }
};

export default function TeacherRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Teacher Registration"
        title="Home Tutor Jobs & Online Teaching Worldwide"
        description="Apply to teach as a home tutor or online tutor for students in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and other countries."
      />
      <section className="bg-surface py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-black/5 bg-white p-5 shadow-elevated sm:p-6 md:p-10">
            <RegistrationForm
              formId="teacherForm"
              collectionName="teacherRegistrations"
              fields={teacherFields}
              submitLabel="Submit Application"
              successMessage="Teacher application submitted successfully."
              emailSubject="New Teacher Application - Hope International Tutor Academy"
              emailFormName="Teacher Registration"
            />
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              ["Home Tutor Jobs", "Teach students at home in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and other major countries."],
              ["Online Tutor Jobs", "Conduct live online tuition for students in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and more."],
              ["Subjects Needed", "Math, science, English, computer science, accounting, Quran, and major school subjects."]
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
