import type { Metadata } from "next";

import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Home Tutor Worldwide - Pakistan, Saudi Arabia, UAE, UK & USA",
  description:
    "Hire verified home tutors worldwide for Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, Qatar, Oman, Kuwait, and other major countries.",
  keywords: [
    "home tutor worldwide",
    "home tuition worldwide",
    "home tutor in Lahore",
    "home tutor in Islamabad",
    "home tutor in Faisalabad",
    "home tutor in Multan",
    "home tutor in Saudi Arabia",
    "home tutor in UAE",
    "home tutor in UK",
    "home tutor in USA",
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
      title="Home Tutor Worldwide"
      description="Verified home tutors at your doorstep in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, Qatar, Oman, Kuwait, and other major countries."
      introTitle="Personalized Home Tuition for Better Results"
      intro="Hope International Tutor Academy helps parents find qualified home tutors worldwide for regular study support, weak subject improvement, homework help, and board exam preparation. Students learn in a familiar environment with focused attention from a tutor matched to their country, city, class, syllabus, and learning pace."
      features={[
        "One-on-one home tuition with verified, experienced tutors",
        "Male and female tutors for Matric, FSc, ICS, O Levels, A Levels, and primary classes",
        "Mathematics, science, English, languages, computer science, programming, accounting, business studies, test preparation, and more",
        "Flexible scheduling in mornings, evenings, or weekends",
        "Regular progress updates for parents and guardians",
        "Available for families in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, Qatar, Oman, Kuwait, and other major countries"
      ]}
      steps={[
        ["Register", "Fill out the student registration form with your requirements."],
        ["Get Matched", "We match you with a suitable tutor for your location, subject, class, and preferred timing."],
        ["Start Learning", "Begin sessions at your preferred time and location."]
      ]}
      jsonLdName="In-Home Tutoring"
      relatedKeywords={[
        "home tutor worldwide",
        "home tuition worldwide",
        "home tutor in Lahore",
        "home tutor in Islamabad",
        "home tutor in Faisalabad",
        "home tutor in Multan",
        "home tutor in Saudi Arabia",
        "home tutor in UAE",
        "home tutor in UK",
        "home tutor in USA",
        "home tuition for Matric",
        "O Level home tutor",
        "A Level home tutor",
        "math tutor at home",
        "science tutor at home"
      ]}
      faqs={[
        {
          question: "How do I find a home tutor worldwide?",
          answer:
            "Submit the student registration form with your country, location, class, subjects, and preferred timing. We review your requirements and connect you with a suitable home tutor where available."
        },
        {
          question: "Do you provide tutors for Matric, FSc, O Level, and A Level students?",
          answer:
            "Yes. We arrange tutors for primary classes, Matric, FSc, ICS, O Levels, A Levels, entry tests, and selected university subjects."
        },
        {
          question: "Can parents request a tutor for specific subjects?",
          answer:
            "Yes. Parents can request tutors for mathematics, science, English, languages, computer science, programming, accounting, economics, business studies, Quran studies, IELTS/TOEFL, SAT/ACT, and other major subjects."
        }
      ]}
    />
  );
}
