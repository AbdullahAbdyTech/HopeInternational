"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/Container";
import { mainNav, servicesNav, site } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const nextScrolled = window.scrollY > 48;

      if (nextScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateScrollState);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const servicesActive = servicesNav.some((item) => isActive(pathname, item.href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${
        isScrolled
          ? "border-black/5 bg-white/95 shadow-soft"
          : "border-white/30 bg-white/90"
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-bright font-heading text-xl font-extrabold text-white shadow-gold sm:h-12 sm:w-12 sm:text-2xl">
            H
          </span>
          <span className="font-heading text-sm font-bold leading-tight text-ink sm:text-base">
            Hope International
            <br />
            <span className="text-[0.68rem] uppercase tracking-[0.16em] text-gold sm:text-xs sm:tracking-[0.2em]">
              Academy
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className={`fixed bottom-0 top-0 z-40 w-[min(20rem,calc(100vw-1rem))] overflow-y-auto bg-white px-5 pt-20 shadow-elevated transition duration-300 sm:px-7 sm:pt-24 lg:static lg:z-auto lg:h-auto lg:w-auto lg:overflow-visible lg:bg-transparent lg:p-0 lg:shadow-none ${
            isOpen ? "right-0" : "-right-[22rem] lg:right-auto"
          }`}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:items-center">
            <li>
              <Link
                href="/"
                className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive(pathname, "/")
                    ? "bg-gold/10 text-gold"
                    : "text-ink-muted hover:bg-gold/5 hover:text-gold"
                }`}
              >
                Home
              </Link>
            </li>
            <li className="group relative">
              <button
                type="button"
                className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition lg:w-auto ${
                  servicesActive ? "bg-gold/10 text-gold" : "text-ink-muted hover:bg-gold/5 hover:text-gold"
                }`}
              >
                Services
                <span className="ml-1 text-xs" aria-hidden="true">
                  v
                </span>
              </button>
              <ul className="mt-1 rounded-2xl border border-black/5 bg-white p-2 shadow-soft lg:absolute lg:left-0 lg:top-full lg:mt-3 lg:min-w-56 lg:translate-y-2 lg:opacity-0 lg:transition lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
                {servicesNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive(pathname, item.href)
                          ? "bg-teal-soft text-teal"
                          : "text-ink-muted hover:bg-gold/5 hover:text-gold"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {mainNav.filter((item) => item.href !== "/").map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive(pathname, item.href)
                      ? "bg-gold/10 text-gold"
                      : "text-ink-muted hover:bg-gold/5 hover:text-gold"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="sr-only">Toggle menu</span>
          <span className="flex w-5 flex-col gap-1.5">
            <span className={`h-0.5 rounded bg-ink transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 rounded bg-ink transition ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 rounded bg-ink transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </Container>
    </header>
  );
}
