import type { Metadata } from "next";

import { ServicePage } from "@/components/ServicePage";

export const metadata: Metadata = {
  title: "Best Online Tutor & Online Tuition in Pakistan",
  description:
    "Live one-on-one online tuition for Matric, FSc, O Levels, A Levels, Cambridge, IELTS, Quran, math, science, English, and more.",
  alternates: {
    canonical: "/online-tutoring"
  }
};

export default function OnlineTutoringPage() {
  return (
    <ServicePage
      eyebrow="Online Tutoring"
      title="Online Tutoring Services"
      description="Live interactive classes with expert tutors from the comfort of your home. Learn anytime, anywhere."
      introTitle="Learn From Anywhere in Pakistan"
      intro="Our online tutoring connects you with the best tutors regardless of your location. Video sessions, digital whiteboards, and screen sharing help us deliver focused support from any device."
      features={[
        "Live one-on-one video sessions with expert tutors",
        "Interactive digital whiteboard for real-time problem solving",
        "Screen sharing for computer science and IT subjects",
        "Recorded sessions available for revision",
        "Flexible timing that works around your schedule",
        "All subjects from primary to university level"
      ]}
      steps={[
        ["Register", "Complete the student registration form."],
        ["Get Matched", "We assign the best tutor for your subject and level."],
        ["Connect", "Join live sessions from your phone, tablet, or computer."]
      ]}
      jsonLdName="Online Tutoring"
    />
  );
}
