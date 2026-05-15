import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { PageHero } from "@/components/PageHero";
import { teacherFields } from "@/lib/forms";

export const metadata: Metadata = {
  title: "Home Tutor Jobs in Pakistan - Teacher Registration",
  description:
    "Join Hope International Academy as a home tutor or online tutor in Lahore, Islamabad, and Faisalabad.",
  alternates: {
    canonical: "/teacher-registration"
  }
};

export default function TeacherRegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Teacher Registration"
        title="Teacher Registration"
        description="Join our team of professional tutors and start making a difference."
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
            />
          </div>
        </Container>
      </section>
    </>
  );
}
