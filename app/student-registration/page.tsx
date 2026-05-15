import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { PageHero } from "@/components/PageHero";
import { studentFields } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Find a Home Tutor - Student Registration",
  description:
    "Register for home tuition or online tuition in Pakistan and get matched with the right tutor.",
  alternates: {
    canonical: "/student-registration"
  }
};

export default function StudentRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Student Registration"
        title="Student Registration"
        description="Fill out the form below and we will match you with the right tutor."
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
            />
          </div>
        </Container>
      </section>
    </>
  );
}
