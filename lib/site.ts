import type { MetadataRoute } from "next";

export type NavItem = {
  label: string;
  href: string;
};

export type SitePage = {
  path: string;
  label: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

export const site = {
  name: "Hope International Tutor Academy",
  url: "https://hopeinternationalacademy.com",
  description:
    "Find verified home and online tutors worldwide for Matric, FSc, O Levels, A Levels, IELTS, Quran learning, and all major subjects.",
  email: "hopeinternationaltutoracademy@gmail.com",
  phone: "+92 301 4809150",
  phoneHref: "tel:+923014809150",
  whatsappHref: "https://wa.me/923014809150",
  address: "Pakistan, Saudi Arabia, UAE & worldwide",
  locations: [
    "Pakistan",
    "Saudi Arabia",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Canada",
    "Australia",
    "Qatar",
    "Oman",
    "Kuwait"
  ],
  founded: "2020",
  sameAs: [
    "https://www.facebook.com/share/1Au3StHi1W/",
    "https://www.instagram.com/hitutoracademy"
  ],
  keywords: [
    "home tutor worldwide",
    "home tuition worldwide",
    "online tutor worldwide",
    "home tutor in Lahore",
    "home tutor in Islamabad",
    "home tutor in Faisalabad",
    "home tutor in Multan",
    "home tutor in Saudi Arabia",
    "home tutor in UAE",
    "home tutor in UK",
    "home tutor in USA",
    "online tutor in Pakistan",
    "online tutor in Saudi Arabia",
    "online tutor in UAE",
    "online tutor in UK",
    "online tutor in USA",
    "online tuition worldwide",
    "online tuition in Saudi Arabia",
    "Matric tutor",
    "FSc tutor",
    "O Level tutor",
    "A Level tutor",
    "home tutor jobs worldwide",
    "online teaching jobs worldwide"
  ]
};

export const pages: SitePage[] = [
  { path: "/", label: "Home", changeFrequency: "weekly", priority: 1 },
  { path: "/about", label: "About Us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/home-tutoring", label: "In-Home Tutoring", changeFrequency: "monthly", priority: 0.9 },
  { path: "/online-tutoring", label: "Online Tutoring", changeFrequency: "monthly", priority: 0.9 },
  { path: "/student-registration", label: "Student Registration", changeFrequency: "monthly", priority: 0.9 },
  { path: "/teacher-registration", label: "Teacher Registration", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", label: "Contact Us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", label: "Privacy Policy", changeFrequency: "yearly", priority: 0.3 }
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Student Registration", href: "/student-registration" },
  { label: "Teacher Registration", href: "/teacher-registration" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" }
];

export const servicesNav: NavItem[] = [
  { label: "In-Home Tutoring", href: "/home-tutoring" },
  { label: "Online Tutoring", href: "/online-tutoring" }
];

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/share/1Au3StHi1W/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/hitutoracademy", icon: "instagram" }
] as const;

export const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Urdu",
  "Computer Science",
  "Islamiat",
  "Pakistan Studies",
  "Accounting",
  "Economics",
  "Statistics"
];

export const classLevels = [
  "Primary classes",
  "Middle school",
  "Matric",
  "FSc",
  "ICS",
  "O Levels",
  "A Levels",
  "Entry tests",
  "University courses"
];

export const serviceAreas = [
  {
    city: "Pakistan",
    title: "Home & Online Tutors in Pakistan",
    description:
      "Qualified male and female home and online tutors for students in Lahore, Islamabad, Faisalabad, Multan, and other major Pakistani cities."
  },
  {
    city: "Saudi Arabia",
    title: "Home & Online Tutors in Saudi Arabia",
    description:
      "Home tutoring and live online tuition for students in Saudi Arabia who need support for school subjects, O Levels, A Levels, IELTS, Quran learning, and exam preparation."
  },
  {
    city: "Worldwide",
    title: "Home & Online Tutors Worldwide",
    description:
      "Home tutoring and online tutoring support for families in the UAE, UK, USA, Canada, Australia, Qatar, Oman, Kuwait, and other major countries."
  }
];

export const cities = [
  "Pakistan",
  "Saudi Arabia",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Qatar",
  "Oman",
  "Kuwait",
  "Other Country"
];

export const stats = [
  { value: 3000, suffix: "+", label: "Happy Students" },
  { value: 1000, suffix: "+", label: "Qualified Tutors" },
  { value: 50, suffix: "+", label: "Subjects Covered" },
  { value: 10, suffix: "+", label: "Countries Served" }
];

export const whyChooseUs = [
  {
    title: "Verified Tutors",
    description: "Every tutor is background-checked, qualified, and experienced.",
    icon: "check"
  },
  {
    title: "Progress Tracking",
    description: "Regular assessments and progress reports keep parents informed.",
    icon: "chart"
  },
  {
    title: "Affordable Rates",
    description: "Quality education at competitive and transparent pricing.",
    icon: "wallet"
  },
  {
    title: "Flexible Scheduling",
    description: "Morning, evening, and weekend sessions are available.",
    icon: "clock"
  },
  {
    title: "Personalized Plans",
    description: "Custom learning plans are tailored to each student's needs.",
    icon: "target"
  },
  {
    title: "Responsive Support",
    description: "A dedicated team supports parents, students, and tutors.",
    icon: "support"
  }
];

export const testimonials = [
  {
    title: "Tutor matching that fits the student's routine",
    detail:
      "Most parents ask for a tutor who can cover weak topics slowly, keep class timing consistent, and share progress after each week.",
    context: "Common parent request - Pakistan"
  },
  {
    title: "Online classes for regular study support",
    detail:
      "Students usually prefer online sessions when they need flexible timing, screen sharing, and quick help before tests or board exams.",
    context: "Student support request - Saudi Arabia"
  },
  {
    title: "Clear communication with parents",
    detail:
      "Families value simple updates about attendance, covered chapters, homework, and where the student still needs practice.",
    context: "Parent feedback theme - UAE"
  }
];
