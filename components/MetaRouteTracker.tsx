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
  const viewedContentPaths = useRef(new Set<string>());

  useEffect(() => {
    const params = {
      content_name: document.title || "Hope International Tutor Academy",
      content_category: "Education",
      content_type: "page",
      page_path: pathname
    };

    trackMetaEvent("PageView", params);
  }, [pathname]);

  useEffect(() => {
    const params = getViewContentParams(pathname);

    if (!params || viewedContentPaths.current.has(pathname)) return;

    viewedContentPaths.current.add(pathname);

    trackMetaEvent("ViewContent", params);
  }, [pathname]);

  useEffect(() => {
    function handleContactClick(event: MouseEvent) {
      const anchor = getClickedAnchor(event.target);
      const params = getContactClickParams(anchor, pathname);

      if (!params) return;

      trackMetaEvent("Contact", params);
    }

    document.addEventListener("click", handleContactClick, true);

    return () => {
      document.removeEventListener("click", handleContactClick, true);
    };
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

  if (pathname === "/thank-you") {
    return {
      content_name: "Enrollment Thank You Page",
      content_category: "Education",
      content_type: "confirmation_page",
      content_ids: ["thank-you"]
    };
  }

  return null;
}

function trackMetaEvent(eventName: "PageView" | "ViewContent" | "Contact", params: Record<string, unknown>) {
  const eventId = generateEventId(eventName);

  window.fbq?.("track", eventName, params, { eventID: eventId });

  void fetch("/api/enrollment-lead.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: "track_event",
      event_name: eventName,
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
}

function getClickedAnchor(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;

  return target.closest<HTMLAnchorElement>("a[href]");
}

function getContactClickParams(anchor: HTMLAnchorElement | null, pathname: string) {
  if (!anchor) return null;

  const href = anchor.getAttribute("href") || "";
  const absoluteHref = anchor.href;
  const normalizedHref = href.toLowerCase();
  let channel = "";

  if (normalizedHref.startsWith("tel:")) {
    channel = "phone";
  } else if (normalizedHref.startsWith("mailto:")) {
    channel = "email";
  } else if (/wa\.me|whatsapp\.com|api\.whatsapp\.com/i.test(absoluteHref)) {
    channel = "whatsapp";
  } else {
    try {
      const url = new URL(absoluteHref);
      const path = url.pathname.replace(/\/+$/, "").replace(/\.html$/, "") || "/";
      if (path === "/contact") {
        channel = "contact_page";
      }
    } catch {
      channel = "";
    }
  }

  if (!channel) return null;

  return {
    content_name: "Contact Click",
    content_category: "Education",
    content_type: "contact_action",
    content_ids: [`contact-${channel}`],
    contact_channel: channel,
    link_url: absoluteHref,
    link_text: anchor.textContent?.trim().slice(0, 120) || "",
    page_path: pathname
  };
}

function generateEventId(eventName: string) {
  return `hita-${eventName.toLowerCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getCookie(name: string) {
  const pattern = new RegExp(`(?:^|; )${name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&")}=([^;]*)`);
  const match = document.cookie.match(pattern);
  return match ? decodeURIComponent(match[1]) : "";
}
