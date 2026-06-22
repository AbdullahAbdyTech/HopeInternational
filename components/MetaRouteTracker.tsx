"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function MetaRouteTracker() {
  const pathname = usePathname();
  const initialRender = useRef(true);
  const viewedContentPaths = useRef(new Set<string>());

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    window.fbq?.("track", "PageView");
  }, [pathname]);

  useEffect(() => {
    const params = getViewContentParams(pathname);

    if (!params || viewedContentPaths.current.has(pathname)) return;

    viewedContentPaths.current.add(pathname);

    const eventId = generateEventId("ViewContent");
    window.fbq?.("track", "ViewContent", params, { eventID: eventId });

    void fetch("/api/enrollment-lead.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "track_event",
        event_name: "ViewContent",
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        custom_data: params
      }),
      keepalive: true
    }).catch((error) => {
      console.warn("Meta CAPI tracking request failed.", error);
    });
  }, [pathname]);

  return null;
}

function getViewContentParams(pathname: string) {
  if (pathname === "/student-enrollment") {
    return {
      content_name: "Student Enrollment Lead Funnel",
      content_category: "Education",
      content_type: "lead_form",
      content_ids: ["student-enrollment"]
    };
  }

  if (pathname === "/student-registration") {
    return {
      content_name: "Student Registration",
      content_category: "Education",
      content_type: "lead_form",
      content_ids: ["student-registration"]
    };
  }

  if (pathname === "/teacher-registration") {
    return {
      content_name: "Teacher Registration",
      content_category: "Education",
      content_type: "lead_form",
      content_ids: ["teacher-registration"]
    };
  }

  return null;
}

function generateEventId(eventName: string) {
  return `hita-${eventName.toLowerCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getCookie(name: string) {
  const pattern = new RegExp(`(?:^|; )${name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&")}=([^;]*)`);
  const match = document.cookie.match(pattern);
  return match ? decodeURIComponent(match[1]) : "";
}
