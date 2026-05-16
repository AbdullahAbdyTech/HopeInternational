import type { Metadata } from "next";

import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Home Tutor in Lahore, Islamabad & Faisalabad",
  description:
    "Hire verified home tutors in Lahore, Islamabad, and Faisalabad for Matric, FSc, O Level, A Level, math, science, English, and exam preparation.",
  keywords: [
    "home tutor in Lahore",
    "home tutor in Islamabad",
    "home tutor in Faisalabad",
    "home tuition in Lahore",
    "private tutor Pakistan",
    "Matric home tutor",
    "O Level home tutor"
  ],
  alternates: {
    canonical: "/home-tutoring"
  }
};

export default function HomeTutoringPage() {
  return (
    <ServicePage
      eyebrow="Home Tutoring"
      title="Home Tutor in Lahore, Islamabad & Faisalabad"
      description="Verified home tutors at your doorstep for one-on-one tuition, exam preparation, and subject support across major classes and boards."
      introTitle="Personalized Home Tuition for Better Results"
      intro="Hope International Academy helps parents find a qualified home tutor in Lahore, Islamabad, or Faisalabad for regular study support, weak subject improvement, homework help, and board exam preparation. Students learn in a familiar environment with focused attention from a tutor matched to their class, syllabus, and learning pace."
      features={[
        "One-on-one home tuition with verified, experienced tutors",
        "Male and female tutors for Matric, FSc, ICS, O Levels, A Levels, and primary classes",
        "Math, physics, chemistry, biology, English, computer science, accounting, and more",
        "Flexible scheduling in mornings, evenings, or weekends",
        "Regular progress updates for parents and guardians",
        "Available for families in Lahore, Islamabad, and Faisalabad"
      ]}
      steps={[
        ["Register", "Fill out the student registration form with your requirements."],
        ["Get Matched", "We match you with a suitable tutor for your city, subject, class, and preferred timing."],
        ["Start Learning", "Begin sessions at your preferred time and location."]
      ]}
      jsonLdName="In-Home Tutoring"
      relatedKeywords={[
        "home tutor in Lahore",
        "home tutor in Islamabad",
        "home tutor in Faisalabad",
        "home tuition for Matric",
        "O Level home tutor",
        "A Level home tutor",
        "math tutor at home",
        "science tutor at home"
      ]}
      faqs={[
        {
          question: "How do I find a home tutor in Lahore, Islamabad, or Faisalabad?",
          answer:
            "Submit the student registration form with your city, class, subjects, and preferred timing. We review your requirements and connect you with a suitable home tutor."
        },
        {
          question: "Do you provide tutors for Matric, FSc, O Level, and A Level students?",
          answer:
            "Yes. We arrange tutors for primary classes, Matric, FSc, ICS, O Levels, A Levels, entry tests, and selected university subjects."
        },
        {
          question: "Can parents request a tutor for specific subjects?",
          answer:
            "Yes. Parents can request tutors for math, physics, chemistry, biology, English, Urdu, computer science, accounting, economics, and other major subjects."
        }
      ]}
    />
  );
}
