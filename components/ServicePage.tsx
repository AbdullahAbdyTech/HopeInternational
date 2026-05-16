import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

type ServicePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  introTitle: string;
  intro: string;
  features: string[];
  steps: Array<[string, string]>;
  jsonLdName: string;
  relatedKeywords?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
};

export function ServicePage({
  eyebrow,
  title,
  description,
  introTitle,
  intro,
  features,
  steps,
  jsonLdName,
  relatedKeywords = [],
  faqs = []
}: ServicePageProps) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: jsonLdName,
          provider: {
            "@type": "EducationalOrganization",
            name: site.name,
            email: site.email,
            telephone: site.phone,
            url: site.url
          },
          description,
          areaServed: site.locations,
          serviceType: relatedKeywords.length ? relatedKeywords : undefined
        }}
      />
      {faqs.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }}
        />
      ) : null}
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="py-14 sm:py-20">
        <Container className="max-w-4xl">
          <h2 className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">{introTitle}</h2>
          <p className="mt-4 text-base leading-8 text-ink-muted sm:text-lg">{intro}</p>

          <h2 className="mt-10 font-heading text-2xl font-extrabold text-ink sm:mt-12 sm:text-3xl">What We Offer</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="rounded-2xl border border-black/5 bg-surface px-4 py-4 text-sm leading-7 text-ink-muted sm:px-5 sm:text-base">
                {feature}
              </div>
            ))}
          </div>

          <h2 className="mt-10 font-heading text-2xl font-extrabold text-ink sm:mt-12 sm:text-3xl">How It Works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map(([step, detail], index) => (
              <article key={step} className="rounded-3xl border border-black/5 bg-white p-5 shadow-soft sm:p-6">
                <p className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                  {index + 1}
                </p>
                <h3 className="mt-5 font-heading text-xl font-bold text-ink">{step}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-muted">{detail}</p>
              </article>
            ))}
          </div>

          {relatedKeywords.length ? (
            <>
              <h2 className="mt-10 font-heading text-2xl font-extrabold text-ink sm:mt-12 sm:text-3xl">
                Tutoring Searches We Help With
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {relatedKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-teal/15 bg-teal-soft px-4 py-2 text-sm font-semibold text-teal"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </>
          ) : null}

          {faqs.length ? (
            <>
              <h2 className="mt-10 font-heading text-2xl font-extrabold text-ink sm:mt-12 sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-4">
                {faqs.map((faq) => (
                  <article key={faq.question} className="rounded-2xl border border-black/5 bg-surface p-5">
                    <h3 className="font-heading text-lg font-bold text-ink">{faq.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-ink-muted">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </>
          ) : null}

          <div className="mt-12 text-center">
            <ButtonLink href="/student-registration" size="large" className="w-full sm:w-auto">
              Register Now
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
