"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  { n: "01", title: "Understand", body: "Clarify the problem before touching code." },
  { n: "02", title: "Design", body: "Sketch architecture and data flow." },
  { n: "03", title: "Build", body: "Ship in small, testable increments." },
  { n: "04", title: "Test", body: "Verify against real usage, not assumptions." },
  { n: "05", title: "Deploy", body: "Ship with monitoring in place." },
  { n: "06", title: "Improve", body: "Iterate based on real feedback." },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (!lineRef.current) return;

    if (prefersReducedMotion) {
      // Static, fully filled — no ScrollTrigger instance created at all.
      gsap.set(lineRef.current, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative px-(--space-container-x) py-(--space-section-y)"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">
          How I Build
        </p>
        <h2 className="mb-12 text-h1 font-semibold">Process</h2>

        <ol className="relative space-y-10 pl-8">
          <div ref={lineRef} className="absolute bottom-0 left-0 top-0 w-px bg-accent-blue" />
          {STEPS.map((step) => (
            <ScrollReveal key={step.n} delay={0} y={16}>
              <li className="relative">
                <span className="absolute -left-7.25 top-1 h-2.5 w-2.5 rounded-full bg-accent-blue" />
                <p className="mb-1 font-mono text-xs text-text-faint">{step.n}</p>
                <h3 className="mb-1 font-semibold">{step.title}</h3>
                <p className="text-sm text-text-muted">{step.body}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
