import { site } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp at ${site.phone}`}
      className="fixed bottom-4 right-4 z-[45] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.34)] ring-1 ring-white/30 transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(37,211,102,0.44)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 4.5A11.43 11.43 0 0 0 6.2 21.75L4.9 26.5l4.86-1.27A11.43 11.43 0 1 0 16.04 4.5Zm0 2.07a9.36 9.36 0 1 1-5.03 17.25l-.36-.22-2.88.75.77-2.8-.24-.37A9.36 9.36 0 0 1 16.04 6.57Zm-4.1 4.93c-.21 0-.55.08-.84.4-.29.31-1.1 1.08-1.1 2.62 0 1.55 1.13 3.05 1.28 3.26.16.2 2.18 3.5 5.39 4.77 2.67 1.05 3.21.84 3.79.79.58-.06 1.86-.76 2.12-1.49.26-.73.26-1.36.18-1.49-.08-.13-.29-.21-.61-.37-.31-.16-1.86-.92-2.15-1.02-.29-.11-.5-.16-.71.15-.21.32-.81 1.03-.99 1.24-.18.21-.37.24-.68.08-.32-.16-1.33-.49-2.54-1.57-.94-.84-1.57-1.87-1.76-2.18-.18-.32-.02-.49.14-.65.14-.14.31-.37.47-.55.16-.19.21-.32.31-.53.11-.21.06-.4-.02-.55-.08-.16-.71-1.72-.97-2.36-.26-.62-.52-.54-.71-.55h-.62Z"
        />
      </svg>
    </a>
  );
}
