"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { FormEvent } from "react";
import { useState } from "react";

import { getDb } from "@/lib/firebase";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    try {
      const form = event.currentTarget;
      const payload = Object.fromEntries(new FormData(form).entries());

      await addDoc(collection(getDb(), "contactMessages"), {
        ...payload,
        source: "next-frontend",
        submittedAt: serverTimestamp()
      });

      form.reset();
      setState("success");
      window.setTimeout(() => setState("idle"), 3000);
    } catch (submitError) {
      setState("error");
      setError(submitError instanceof Error ? submitError.message : "Unable to send your message right now.");
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput name="name" label="Name" placeholder="Your name" required />
        <TextInput name="email" label="Email" type="email" placeholder="email@example.com" required />
      </div>
      <TextInput name="subject" label="Subject" placeholder="How can we help?" required />
      <label className="block text-sm font-semibold text-ink">
        Message <span className="text-gold">*</span>
        <textarea
          name="message"
          required
          placeholder="Your message..."
          className="mt-2 min-h-36 w-full resize-y rounded-2xl border border-black/10 bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10 sm:text-sm"
        />
      </label>

      {state === "success" ? (
        <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Message sent successfully.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gold via-gold-bright to-gold px-6 py-4 text-sm font-semibold text-white shadow-gold transition hover:-translate-y-0.5 hover:shadow-elevated disabled:cursor-not-allowed disabled:opacity-70 sm:px-8 sm:text-base"
      >
        {state === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function TextInput({
  name,
  label,
  type = "text",
  placeholder,
  required
}: {
  name: string;
  label: string;
  type?: "text" | "email";
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-ink">
      {label} {required ? <span className="text-gold">*</span> : null}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-black/10 bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10 sm:text-sm"
      />
    </label>
  );
}
