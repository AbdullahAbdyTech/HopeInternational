import type { FormField } from "@/components/forms/FormTypes";
import { cities } from "@/lib/site";

const cityOptions = cities.map((city) => ({ label: city }));

const tutoringTypeOptions = [
  { label: "Home Tutoring" },
  { label: "Online Tutoring" },
  { label: "Both" }
];

export const studentFields: FormField[] = [
  {
    name: "studentName",
    label: "Student Name",
    type: "text",
    required: true,
    placeholder: "Full name"
  },
  {
    name: "parentName",
    label: "Parent/Guardian Name",
    type: "text",
    required: true,
    placeholder: "Parent's name"
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "email@example.com"
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "+92 3XX XXXXXXX"
  },
  {
    name: "grade",
    label: "Grade/Class",
    type: "select",
    required: true,
    options: [
      { label: "Play Group / Nursery" },
      { label: "KG / Prep" },
      { label: "Class 1-5" },
      { label: "Class 6-8" },
      { label: "Class 9-10 (Matric)" },
      { label: "Class 11-12 (FSc/ICS)" },
      { label: "O-Levels" },
      { label: "A-Levels" },
      { label: "University" }
    ]
  },
  {
    name: "city",
    label: "Country / Location",
    type: "select",
    required: true,
    options: cityOptions
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    required: true,
    placeholder: "House no, area, city, country..."
  },
  {
    name: "subjects",
    label: "Subjects Needed",
    type: "text",
    required: true,
    placeholder: "e.g. Mathematics, IELTS, Programming, Physics"
  },
  {
    name: "tutoringType",
    label: "Tutoring Type",
    type: "select",
    required: true,
    options: tutoringTypeOptions
  },
  {
    name: "message",
    label: "Additional Message",
    type: "textarea",
    placeholder: "Any specific requirements or preferred timings..."
  }
];

export const teacherFields: FormField[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Your full name"
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "email@example.com"
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    required: true,
    placeholder: "+92 3XX XXXXXXX"
  },
  {
    name: "currentOccupation",
    label: "Current Occupation",
    type: "text",
    required: true,
    placeholder: "e.g. Teacher, Student, Lecturer"
  },
  {
    name: "city",
    label: "Country / Location",
    type: "select",
    required: true,
    options: cityOptions
  },
  {
    name: "qualification",
    label: "Highest Qualification",
    type: "select",
    required: true,
    options: [
      { label: "Intermediate (FSc/ICS/FA)" },
      { label: "Bachelor's Degree" },
      { label: "Master's Degree" },
      { label: "M.Phil / MS" },
      { label: "PhD" }
    ]
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    required: true,
    placeholder: "House no, area, city, country..."
  },
  {
    name: "subjects",
    label: "Subjects You Can Teach",
    type: "text",
    required: true,
    placeholder: "e.g. Mathematics, Chemistry, IELTS, Coding"
  },
  {
    name: "experience",
    label: "Teaching Experience",
    type: "select",
    required: true,
    options: [
      { label: "Less than 1 year" },
      { label: "1-3 years" },
      { label: "3-5 years" },
      { label: "5-10 years" },
      { label: "10+ years" }
    ]
  },
  {
    name: "tutoringType",
    label: "Preferred Tutoring Type",
    type: "select",
    required: true,
    options: tutoringTypeOptions
  },
  {
    name: "about",
    label: "Tell Us About Yourself",
    type: "textarea",
    placeholder: "Your teaching philosophy, availability, etc."
  }
];
