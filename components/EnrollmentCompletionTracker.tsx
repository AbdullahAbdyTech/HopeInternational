"use client";

import { useEffect } from "react";

const params = {
  content_name: "Student Enrollment Lead",
  content_category: "Education",
  content_type: "lead_form",
  content_ids: ["student-enrollment"],
  status: "submitted"
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function EnrollmentCompletionTracker() {
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    const eventId = search.get("event_id");
    const registrationEventId = search.get("registration_event_id");
    const program = search.get("program") || "Student Enrollment";
    const eventParams = { ...params, program };

    if (eventId && sessionStorage.getItem(`hita-lead-fired-${eventId}`) !== "true") {
      window.fbq?.("track", "Lead", eventParams, { eventID: eventId });
      sessionStorage.setItem(`hita-lead-fired-${eventId}`, "true");
    }

    if (
      registrationEventId &&
      sessionStorage.getItem(`hita-registration-fired-${registrationEventId}`) !== "true"
    ) {
      window.fbq?.("track", "CompleteRegistration", eventParams, { eventID: registrationEventId });
      sessionStorage.setItem(`hita-registration-fired-${registrationEventId}`, "true");
    }
  }, []);

  return null;
}
