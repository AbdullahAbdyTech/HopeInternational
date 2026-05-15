type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-4 inline-flex rounded-full border border-gold/15 bg-gold/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl font-extrabold leading-tight text-ink md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-ink-muted">{description}</p> : null}
    </div>
  );
}
