import type { Metadata } from "next";

import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Best Home Tutor in Lahore, Islamabad, Faisalabad",
  description:
    "Verified home tutors in Lahore, Islamabad, and Faisalabad for Matric, FSc, O/A Levels, and all major subjects.",
  alternates: {
    canonical: "/home-tutoring"
  }
};

export default function HomeTutoringPage() {
  return (
    <ServicePage
      eyebrow="Home Tutoring"
      title="In-Home Tutoring Services"
      description="Professional tutors at your doorstep for personalized, one-on-one learning in a comfortable environment."
      introTitle="Why Choose Home Tutoring?"
      intro="Home tutoring provides the most personalized learning experience. Your child learns in a familiar environment with focused attention from a qualified tutor, leading to faster academic improvement."
      features={[
        "One-on-one sessions with verified, experienced tutors",
        "All subjects from primary to university level",
        "Flexible scheduling in mornings, evenings, or weekends",
        "Regular progress reports for parents",
        "Custom study plans and exam preparation strategies",
        "Available in Lahore, Islamabad, and Faisalabad"
      ]}
      steps={[
        ["Register", "Fill out the student registration form with your requirements."],
        ["Get Matched", "We match you with the best available tutor in your area."],
        ["Start Learning", "Begin sessions at your preferred time and location."]
      ]}
      jsonLdName="In-Home Tutoring"
    />
  );
}
