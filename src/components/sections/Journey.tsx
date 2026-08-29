import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { experience } from "@/data/experience";

export function Journey() {
  return (
    <section id="journey" className="px-(--space-container-x) py-(--space-section-y)">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">Journey</p>
          <h2 className="mb-10 text-h1 font-semibold">Where I&apos;ve worked</h2>
        </ScrollReveal>
        <div className="space-y-8">
          {experience.map((entry, index) => (
            <ScrollReveal key={entry.id} delay={index * 0.1}>
              <div className="border-l-2 border-border pl-6">
                <p className="mb-1 font-mono text-xs uppercase tracking-[0.08em] text-text-faint">
                  {entry.period}
                </p>
                <h3 className="text-h2 font-semibold">{entry.role}</h3>
                <p className="mb-2 text-sm text-text-muted">{entry.company}</p>
                <p className="leading-relaxed text-text-muted">{entry.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
