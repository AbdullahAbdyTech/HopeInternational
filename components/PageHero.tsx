import { Container } from "@/components/Container";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-gradient-to-br from-surface-warm via-teal-soft to-white pt-28 sm:pt-36">
      <Container className="pb-12 text-center sm:pb-16">
        {eyebrow ? (
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold sm:tracking-[0.22em]">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mx-auto max-w-4xl break-words font-heading text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-ink-muted sm:text-lg">{description}</p>
      </Container>
    </section>
  );
}
