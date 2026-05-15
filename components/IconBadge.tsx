type IconName = "check" | "chart" | "wallet" | "clock" | "target" | "support" | "home" | "online" | "exam";

type IconBadgeProps = {
  icon: IconName | string;
};

export function IconBadge({ icon }: IconBadgeProps) {
  return (
    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-surface-warm to-teal-soft text-teal">
      <Icon icon={icon} />
    </span>
  );
}

function Icon({ icon }: IconBadgeProps) {
  const common = "h-7 w-7";

  switch (icon) {
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path d="m5 12 4.2 4.2L19.5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path d="M4 19V5M4 19h16M8 15l3-3 3 2 5-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "wallet":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="currentColor" strokeWidth="2.2" />
          <path d="M17 12h3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.2" />
          <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2.2" />
          <path d="m16.5 7.5 2-2M18 6h2v2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "support":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path d="M5 12a7 7 0 0 1 14 0v3a2 2 0 0 1-2 2h-2v-5h4M5 12v5h4v-5H5Zm7 7h3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "home":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-7.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "online":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <rect x="4" y="5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2.2" />
          <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "exam":
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path d="M7 4h7l3 3v13H7V4Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M14 4v4h4M9.5 12h5M9.5 16h5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}
