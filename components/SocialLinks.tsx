import { socialLinks } from "@/lib/site";

type SocialLinksProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function SocialLinks({ tone = "dark", className = "" }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white shadow-soft transition hover:-translate-y-0.5 ${getBrandClass(link.icon, tone)}`}
        >
          <SocialIcon icon={link.icon} />
        </a>
      ))}
    </div>
  );
}

function SocialIcon({ icon }: { icon: (typeof socialLinks)[number]["icon"] }) {
  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2V8.6H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="2.1" />
      <circle cx="17.3" cy="6.7" r="1.25" fill="currentColor" />
    </svg>
  );
}

function getBrandClass(icon: (typeof socialLinks)[number]["icon"], tone: SocialLinksProps["tone"]) {
  const ring = tone === "light" ? "hover:ring-2 hover:ring-white/25" : "hover:ring-2 hover:ring-black/5";

  if (icon === "facebook") {
    return `bg-[#1877F2] hover:bg-[#166FE5] ${ring}`;
  }

  return `bg-[radial-gradient(circle_at_30%_110%,#fdf497_0%,#fdf497_8%,#fd5949_42%,#d6249f_62%,#285AEB_100%)] ${ring}`;
}
