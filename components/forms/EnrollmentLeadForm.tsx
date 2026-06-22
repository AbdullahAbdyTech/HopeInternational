"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import { sendFormEmail } from "@/lib/email";

type Lead = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  courseProgram: string;
  message: string;
  website: string;
};

type FormState = "idle" | "submitting" | "error";

const endpoint = "/api/enrollment-lead.php";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function EnrollmentLeadForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof Lead, string>>>({});
  const [status, setStatus] = useState("");

  const buttonText = useMemo(() => (state === "submitting" ? "Submitting..." : "Submit Enrollment Request"), [state]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const lead = readLead(formData);
    const nextErrors = validateLead(lead);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setState("error");
      setStatus("Please correct the highlighted fields.");
      return;
    }

    if (lead.website) {
      window.location.href = "/thank-you";
      return;
    }

    const eventId = generateEventId("Lead");
    const registrationEventId = generateEventId("CompleteRegistration");
    let response: Response | undefined;

    setState("submitting");
    setStatus("Submitting your enrollment request...");

    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "submit_enrollment",
          lead,
          event_id: eventId,
          registration_event_id: registrationEventId,
          event_source_url: window.location.href,
          fbp: getCookie("_fbp"),
          fbc: getCookie("_fbc")
        })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        throw new Error(result.message || "Unable to submit your enrollment request right now.");
      }

      if (result.email_sent !== true) {
        await sendFormEmail({
          formName: "Student Enrollment Lead",
          subject: "New Student Enrollment Lead - Hope International Tutor Academy",
          fields: formDataToFields(lead)
        });
      }

      redirectToThankYou(lead, eventId, registrationEventId);
    } catch (submitError) {
      if (!response || response.status >= 500) {
        try {
          await sendFormEmail({
            formName: "Student Enrollment Lead",
            subject: "New Student Enrollment Lead - Hope International Tutor Academy",
            fields: formDataToFields(lead)
          });
          redirectToThankYou(lead, eventId, registrationEventId);
          return;
        } catch (fallbackError) {
          console.warn("Browser email fallback failed.", fallbackError);
        }
      }

      setState("error");
      setStatus(submitError instanceof Error ? submitError.message : "Unable to submit your enrollment request.");
    } finally {
      setState((current) => (current === "submitting" ? "idle" : current));
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextInput name="fullName" label="Full Name" placeholder="Student or parent name" error={errors.fullName} />
        <TextInput name="email" label="Email Address" type="email" placeholder="email@example.com" error={errors.email} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <TextInput name="phone" label="Phone Number" type="tel" placeholder="+92 3XX XXXXXXX" error={errors.phone} />
        <TextInput name="city" label="City" placeholder="City or country" error={errors.city} />
      </div>

      <TextInput
        name="courseProgram"
        label="Course/Program Interested In"
        placeholder="e.g. O Levels Mathematics"
        list="courseProgramOptions"
        error={errors.courseProgram}
      />
      <datalist id="courseProgramOptions">
        <option value="Home Tutoring" />
        <option value="Online Tutoring" />
        <option value="Matric / FSc" />
        <option value="O Levels / A Levels" />
        <option value="IGCSE" />
        <option value="IELTS / TOEFL" />
        <option value="SAT / ACT" />
        <option value="Quran Studies" />
        <option value="Coding / Computer Science" />
      </datalist>

      <label className="block text-sm font-semibold text-ink">
        Additional Message
        <textarea
          name="message"
          placeholder="Preferred timing, class level, tutor preference, or learning goals..."
          className="mt-2 min-h-32 w-full resize-y rounded-2xl border border-black/10 bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10 sm:text-sm"
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <span className="mt-1 block text-xs font-bold text-red-700">{errors.message}</span> : null}
      </label>

      {status ? (
        <p
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            state === "error" ? "border border-red-200 bg-red-50 text-red-700" : "bg-teal-soft text-teal"
          }`}
        >
          {status}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gold via-gold-bright to-gold px-6 py-4 text-sm font-semibold text-white shadow-gold transition hover:-translate-y-0.5 hover:shadow-elevated disabled:cursor-not-allowed disabled:opacity-70 sm:px-8 sm:text-base"
      >
        {buttonText}
      </button>
    </form>
  );
}

function TextInput({
  name,
  label,
  type = "text",
  placeholder,
  list,
  error
}: {
  name: keyof Lead;
  label: string;
  type?: "text" | "email" | "tel";
  placeholder: string;
  list?: string;
  error?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-ink">
      {label} <span className="text-gold">*</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        list={list}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full rounded-2xl border border-black/10 bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10 sm:text-sm"
      />
      {error ? <span className="mt-1 block text-xs font-bold text-red-700">{error}</span> : null}
    </label>
  );
}

function readLead(formData: FormData): Lead {
  return {
    fullName: readField(formData, "fullName"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    city: readField(formData, "city"),
    courseProgram: readField(formData, "courseProgram"),
    message: readField(formData, "message"),
    website: readField(formData, "website")
  };
}

function readField(formData: FormData, name: keyof Lead) {
  return String(formData.get(name) || "").trim();
}

function validateLead(lead: Lead) {
  const errors: Partial<Record<keyof Lead, string>> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+\-()\s]{7,20}$/;

  if (lead.fullName.length < 2) errors.fullName = "Enter the student or parent full name.";
  if (!emailPattern.test(lead.email)) errors.email = "Enter a valid email address.";
  if (!phonePattern.test(lead.phone)) errors.phone = "Enter a valid phone number.";
  if (lead.city.length < 2) errors.city = "Enter your city or country.";
  if (lead.courseProgram.length < 2) errors.courseProgram = "Select or enter a course/program.";
  if (lead.message.length > 1000) errors.message = "Keep the message under 1000 characters.";

  return errors;
}

function redirectToThankYou(lead: Lead, eventId: string, registrationEventId: string) {
  const thankYouUrl = new URL("/thank-you", window.location.origin);
  thankYouUrl.searchParams.set("event_id", eventId);
  thankYouUrl.searchParams.set("registration_event_id", registrationEventId);
  thankYouUrl.searchParams.set("program", lead.courseProgram);
  window.location.href = `${thankYouUrl.pathname}${thankYouUrl.search}`;
}

function generateEventId(eventName: string) {
  return `hita-${eventName.toLowerCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getCookie(name: string) {
  const pattern = new RegExp(`(?:^|; )${name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&")}=([^;]*)`);
  const match = document.cookie.match(pattern);
  return match ? decodeURIComponent(match[1]) : "";
}

function formDataToFields(lead: Lead): Record<string, FormDataEntryValue> {
  return {
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    city: lead.city,
    courseProgram: lead.courseProgram,
    message: lead.message
  };
}
