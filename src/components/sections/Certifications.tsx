import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { certifications } from "@/data/certifications";

export function Certifications() {
  return (
    <section id="certifications" className="px-(--space-container-x) py-(--space-section-y)">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">
            Certifications
          </p>
          <h2 className="mb-10 text-h1 font-semibold">Credentials</h2>
        </ScrollReveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} delay={index * 0.1}>
              <div className="rounded-lg border border-border bg-bg-elevated p-6">
                <h3 className="mb-1 text-h2 font-semibold">
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-accent-blue"
                    >
                      {cert.title}
                    </a>
                  ) : (
                    cert.title
                  )}
                </h3>
                <p className="mb-2 text-sm text-text-muted">{cert.issuer}</p>
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-faint">
                  {cert.date}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
