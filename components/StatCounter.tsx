"use client";

import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  suffix: string;
  label: string;
};

export function StatCounter({ value, suffix, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const duration = 1600;
        const startTime = performance.now();

        const tick = (time: number) => {
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(value * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setCount(value);
          }
        };

        requestAnimationFrame(tick);
        observer.unobserve(element);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-black/5 bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-elevated"
    >
      <p className="font-heading text-4xl font-extrabold text-teal">
        {count}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-2 text-sm font-semibold text-ink-muted">{label}</p>
    </div>
  );
}
