import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "base" | "large";
  className?: string;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-gold via-gold-bright to-gold text-white shadow-gold hover:-translate-y-0.5 hover:shadow-elevated",
  secondary:
    "border border-white/50 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-teal",
  outline:
    "border border-teal text-teal hover:-translate-y-0.5 hover:bg-teal hover:text-white hover:shadow-teal"
};

const sizes = {
  base: "px-5 py-3 text-sm sm:px-7",
  large: "px-6 py-3.5 text-sm sm:px-9 sm:py-4 sm:text-base"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "base",
  className = ""
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`ai-button inline-flex max-w-full items-center justify-center rounded-full text-center font-semibold transition duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
