"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import type { FormField } from "@/components/forms/FormTypes";
import { getDb } from "@/lib/firebase";

type RegistrationFormProps = {
  formId: string;
  collectionName: string;
  fields: FormField[];
  submitLabel: string;
  successMessage: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function RegistrationForm({
  formId,
  collectionName,
  fields,
  submitLabel,
  successMessage
}: RegistrationFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const buttonText = useMemo(() => {
    if (state === "submitting") return "Submitting...";
    if (state === "success") return "Submitted";
    if (state === "error") return "Try Again";
    return submitLabel;
  }, [state, submitLabel]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      await addDoc(collection(getDb(), collectionName), {
        ...payload,
        source: "next-frontend",
        submittedAt: serverTimestamp()
      });

      form.reset();
      setState("success");
      window.setTimeout(() => setState("idle"), 3000);
    } catch (submitError) {
      setState("error");
      setError(submitError instanceof Error ? submitError.message : "Unable to submit the form right now.");
    }
  }

  return (
    <form id={formId} className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <FieldControl key={field.name} field={field} />
        ))}
      </div>

      {state === "success" ? (
        <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {successMessage}
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
        {buttonText}
      </button>
    </form>
  );
}

function FieldControl({ field }: { field: FormField }) {
  const baseClass =
    "mt-2 w-full rounded-2xl border border-black/10 bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-teal focus:bg-white focus:ring-4 focus:ring-teal/10 sm:text-sm";
  const isWide = field.type === "textarea" || field.name === "subjects" || field.name === "about" || field.name === "message";

  return (
    <label className={`block text-sm font-semibold text-ink ${isWide ? "md:col-span-2" : ""}`}>
      {field.label} {field.required ? <span className="text-gold">*</span> : null}
      {field.type === "textarea" ? (
        <textarea
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          className={`${baseClass} min-h-32 resize-y`}
        />
      ) : field.type === "select" ? (
        <select name={field.name} required={field.required} className={baseClass} defaultValue="">
          <option value="" disabled>
            Select
          </option>
          {field.options?.map((option) => (
            <option key={option.value ?? option.label} value={option.value ?? option.label}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          className={baseClass}
        />
      )}
    </label>
  );
}
