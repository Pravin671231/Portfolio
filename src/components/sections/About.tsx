import { ScrollReveal } from "@/components/ui/ScrollReveal";

const SKILLS = ["React", "Next.js", "TypeScript", "Node.js"];

export function About() {
  return (
    <section id="about" className="relative px-(--space-container-x) py-(--space-section-y)">
      <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
        <ScrollReveal delay={0}>
          <div className="flex aspect-4/5 items-center justify-center rounded-lg border border-border bg-bg-elevated">
            <span className="text-sm text-text-faint">[ portrait placeholder ]</span>
          </div>
        </ScrollReveal>
        <div>
          <ScrollReveal delay={0.1}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">About</p>
            <h2 className="mb-4 text-h1 font-semibold">Pravin K</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mb-2 text-text-muted">Full Stack Developer</p>
            <p className="mb-6 leading-relaxed text-text-muted">
              Placeholder bio — replace with real copy. I build end-to-end web applications with a
              focus on clean architecture, performance, and interfaces that feel considered rather
              than decorated.
            </p>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-sm border border-border px-3 py-1 font-mono text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
