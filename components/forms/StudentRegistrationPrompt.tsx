"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { studentFields } from "@/lib/forms";

const RegistrationForm = dynamic(
  () => import("@/components/forms/RegistrationForm").then((module) => module.RegistrationForm),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-black/5 bg-surface px-5 py-8 text-center text-sm font-semibold text-ink-muted">
        Loading registration form...
      </div>
    )
  }
);

const promptDismissedKey = "student-registration-prompt-dismissed";
const registrationPages = new Set(["/student-registration", "/student-enrollment", "/teacher-registration", "/thank-you"]);

export function StudentRegistrationPrompt() {
  const pathname = usePathname();
  const initialLoadHandled = useRef(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (registrationPages.has(pathname)) {
      initialLoadHandled.current = true;
      sessionStorage.setItem(promptDismissedKey, "true");
      setIsOpen(false);
      return;
    }

    if (!initialLoadHandled.current) {
      const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

      if (navigationEntry?.type === "reload") {
        sessionStorage.removeItem(promptDismissedKey);
      }

      initialLoadHandled.current = true;
    }

    if (sessionStorage.getItem(promptDismissedKey) === "true") return;
    setIsOpen(true);
  }, [pathname]);

  function closePrompt() {
    sessionStorage.setItem(promptDismissedKey, "true");
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/72 px-4 py-5 backdrop-blur-sm sm:py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="student-registration-prompt-title"
    >
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/20 bg-white p-4 shadow-elevated sm:p-6 md:p-8">
        <button
          type="button"
          onClick={closePrompt}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-ink-muted shadow-soft transition hover:bg-surface hover:text-ink focus:outline-none focus:ring-4 focus:ring-teal/20"
          aria-label="Close student registration form"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="mb-6 pr-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Student Registration</p>
          <h2 id="student-registration-prompt-title" className="mt-2 font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Find Home & Online Tutors Worldwide
          </h2>
          <p className="mt-2 text-sm leading-7 text-ink-muted">
            Submit your details to get matched with a verified tutor in your country or location. You can close this form to continue to the homepage.
          </p>
        </div>

        <RegistrationForm
          formId="studentPromptForm"
          collectionName="studentRegistrations"
          fields={studentFields}
          submitLabel="Submit Registration"
          successMessage="Student registration submitted successfully."
          emailSubject="New Student Registration - Hope International Tutor Academy"
          emailFormName="Student Registration"
          onSuccess={() => window.setTimeout(closePrompt, 1200)}
        />
      </div>
    </div>
  );
}
