"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTouch = useMediaQuery("(pointer: coarse)");
  const prefersReducedMotion = useReducedMotion();
  const pinnedMode = isDesktop && !isTouch && !prefersReducedMotion;

  useLayoutEffect(() => {
    if (!pinnedMode) return; // zero ScrollTrigger instances created in the fallback branch

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pinnedMode]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-(--space-container-x) py-(--space-section-y)"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">
          Selected Work
        </p>
        <h2 className="mb-12 text-h1 font-semibold">Projects</h2>
      </div>

      {pinnedMode ? (
        <div className="h-screen overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-8 will-change-transform">
            {projects.map((project, i) => (
              <div key={project.slug} className="w-[85vw] max-w-xl shrink-0">
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-6xl gap-8">
          {projects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={Math.min(i * 0.1, 0.3)}>
              <ProjectCard project={project} index={i} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </section>
  );
}
