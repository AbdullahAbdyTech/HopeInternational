import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { PageHero } from "@/components/PageHero";
import { teacherFields } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Home Tutor Jobs in Pakistan - Teacher Registration",
  description:
    "Apply for home tutor jobs in Pakistan. Join as a home tutor or online tutor in Lahore, Islamabad, Faisalabad, and teach Matric, FSc, O/A Levels, and more.",
  keywords: [
    "home tutor jobs in Pakistan",
    "home tutor jobs Lahore",
    "tuition teacher jobs Lahore",
    "online teaching jobs Pakistan",
    "teacher registration Pakistan",
    "tutor jobs Islamabad",
    "tutor jobs Faisalabad"
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
        title="Home Tutor Jobs in Pakistan"
        description="Apply to teach as a home tutor or online tutor for students in Lahore, Islamabad, Faisalabad, and across Pakistan."
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
              emailSubject="New Teacher Application - Hope International Academy"
              emailFormName="Teacher Registration"
            />
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
            {[
              ["Home Tutor Jobs", "Teach students at home in Lahore, Islamabad, and Faisalabad."],
              ["Online Tutor Jobs", "Conduct live online tuition for students across Pakistan."],
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
