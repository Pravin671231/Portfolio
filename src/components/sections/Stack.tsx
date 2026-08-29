import {
  Atom,
  Code2,
  Container,
  Database,
  Layers,
  Palette,
  Server,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { skills } from "@/data/skills";

const ICONS: Record<string, LucideIcon> = {
  "code-2": Code2,
  atom: Atom,
  layers: Layers,
  server: Server,
  database: Database,
  container: Container,
  palette: Palette,
};

export function Stack() {
  return (
    <section id="stack" className="px-(--space-container-x) py-(--space-section-y)">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">Stack</p>
          <h2 className="mb-10 text-h1 font-semibold">What I build with</h2>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skills.map((skill, index) => {
            const Icon = ICONS[skill.icon];
            return (
              <ScrollReveal key={skill.id} delay={index * 0.05}>
                <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-bg-elevated px-4 py-6 text-center">
                  {Icon && <Icon size={24} className="text-accent-blue" aria-hidden />}
                  <span className="text-sm font-medium">{skill.name}</span>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
