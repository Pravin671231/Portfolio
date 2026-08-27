import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Project } from "@/data/projects";

export function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article className="px-(--space-container-x) py-(--space-section-y)">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal delay={0}>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">
            {project.tagline}
          </p>
          <h1 className="mb-6 text-h1 font-semibold">{project.title}</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
            <Image
              src={project.coverImage}
              alt={`${project.title} cover`}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mb-6 leading-relaxed text-text-muted">{project.description}</p>
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-sm border border-border px-3 py-1 font-mono text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="mb-12 flex gap-4">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-text px-5 py-2.5 text-sm font-medium text-bg"
            >
              Live Site
            </a>
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-border px-5 py-2.5 text-sm font-medium"
            >
              Source
            </a>
          </div>
        </ScrollReveal>

        {project.caseStudy && (
          <div className="space-y-10">
            <ScrollReveal delay={0}>
              <h2 className="mb-2 text-h2 font-semibold">Problem</h2>
              <p className="leading-relaxed text-text-muted">{project.caseStudy.problem}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mb-2 text-h2 font-semibold">Architecture</h2>
              <p className="leading-relaxed text-text-muted">{project.caseStudy.architecture}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mb-2 text-h2 font-semibold">Features</h2>
              <ul className="list-inside list-disc space-y-1 text-text-muted">
                {project.caseStudy.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mb-2 text-h2 font-semibold">Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.caseStudy.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-sm bg-accent-blue/10 px-3 py-1 font-mono text-xs text-accent-blue"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="mb-2 text-h2 font-semibold">Result</h2>
              <p className="leading-relaxed text-text-muted">{project.caseStudy.result}</p>
            </ScrollReveal>
          </div>
        )}
      </div>
    </article>
  );
}
