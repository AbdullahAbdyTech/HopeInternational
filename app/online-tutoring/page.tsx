import type { Metadata } from "next";

import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Online Tutor Worldwide for Matric, FSc, O/A Levels",
  description:
    "Live one-on-one online tuition worldwide for students in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, Qatar, Oman, Kuwait, and more.",
  keywords: [
    "online tutor in Pakistan",
    "online tutor in Saudi Arabia",
    "online tutor in UAE",
    "online tutor in UK",
    "online tutor in USA",
    "online tutor worldwide",
    "online tuition in Pakistan",
    "online math tutor Pakistan",
    "online O Level tutor",
    "online A Level tutor",
    "Matric online tuition",
    "FSc online tutor"
  ],
  alternates: {
    canonical: "/online-tutoring"
  }
};

export default function OnlineTutoringPage() {
  return (
    <ServicePage
      eyebrow="Online Tutoring"
      title="Online Tutor Worldwide for Every Major Subject"
      description="Live interactive online tuition with expert tutors for students in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, and other major countries."
      introTitle="One-on-One Online Tuition Worldwide"
      intro="Our online tutoring service connects students with qualified tutors in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, Qatar, Oman, Kuwait, and other countries. Live video sessions, digital whiteboards, screen sharing, and structured lesson plans make online tuition effective for regular study support, weak subject improvement, and exam preparation."
      features={[
        "Live one-on-one video sessions with expert tutors",
        "Interactive digital whiteboard for real-time problem solving",
        "Screen sharing for computer science and IT subjects",
        "Online tuition for Matric, FSc, ICS, O Levels, A Levels, IELTS, and Quran learning",
        "Flexible timing that works around your schedule",
        "Math, science, English, Urdu, computer science, accounting, economics, and more"
      ]}
      steps={[
        ["Register", "Complete the student registration form."],
        ["Get Matched", "We assign a suitable online tutor for your subject, class, syllabus, and goals."],
        ["Connect", "Join live sessions from your phone, tablet, or computer."]
      ]}
      jsonLdName="Online Tutoring"
      relatedKeywords={[
        "online tutor in Pakistan",
        "online tutor in Saudi Arabia",
        "online tutor in UAE",
        "online tutor worldwide",
        "online tuition in Pakistan",
        "online Matric tutor",
        "online FSc tutor",
        "online O Level tutor",
        "online A Level tutor",
        "online math tutor",
        "online science tutor"
      ]}
      faqs={[
        {
          question: "Do you provide online tutors worldwide?",
          answer:
            "Yes. Online tutoring is available for students in Pakistan, Saudi Arabia, UAE, UK, USA, Canada, Australia, Qatar, Oman, Kuwait, and other countries."
        },
        {
          question: "Which classes and subjects are available for online tuition?",
          answer:
            "We support primary classes, Matric, FSc, ICS, O Levels, A Levels, IELTS, Quran learning, and major subjects including math, science, English, Urdu, and computer science."
        },
        {
          question: "How are online tutoring sessions conducted?",
          answer:
            "Sessions are conducted live through video calls with screen sharing, digital whiteboards, and direct interaction between student and tutor."
        }
      ]}
    />
  );
}
