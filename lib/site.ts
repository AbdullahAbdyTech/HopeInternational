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
  name: "Hope International Academy",
  url: "https://hopeinternationalacademy.com",
  description:
    "Pakistan's trusted home and online tutoring academy for Matric, FSc, O Levels, A Levels, and all major subjects.",
  email: "hopeinternationaltutoracademy@gmail.com",
  phone: "+92 301 4809150",
  phoneHref: "tel:+923014809150",
  whatsappHref: "https://wa.me/923014809150",
  address: "Lahore, Islamabad & Faisalabad, Pakistan",
  locations: ["Lahore", "Islamabad", "Faisalabad"],
  founded: "2020"
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

export const cities = [
  "Lahore",
  "Islamabad",
  "Faisalabad",
  "Other"
];

export const stats = [
  { value: 3000, suffix: "+", label: "Happy Students" },
  { value: 500, suffix: "+", label: "Qualified Tutors" },
  { value: 50, suffix: "+", label: "Subjects Covered" },
  { value: 3, suffix: "", label: "Service Locations" }
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
    quote:
      "My son's grades improved from C to A in just 3 months. The tutor was professional and very patient.",
    name: "Ayesha K.",
    role: "Parent, Lahore"
  },
  {
    quote:
      "Online classes were convenient and focused. I prepared for my board exams without leaving home.",
    name: "Ahmed R.",
    role: "Student, Faisalabad"
  },
  {
    quote:
      "They matched us with a tutor who understood my daughter's needs and helped her build confidence.",
    name: "Fatima S.",
    role: "Parent, Islamabad"
  }
];
