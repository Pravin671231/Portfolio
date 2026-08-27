"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { GlowBackground } from "@/components/ui/GlowBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useCursor } from "@/context/CursorContext";

export function Contact() {
  const { setCursor } = useCursor();

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-(--space-container-x) py-[clamp(6rem,14vw,10rem)]"
    >
      <GlowBackground />
      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">
          Have an idea?
        </p>
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[1.02] tracking-tight">
          <AnimatedText text="LET'S" mode="chars" trigger="inView" className="block" />
          <AnimatedText text="BUILD" mode="chars" trigger="inView" delay={0.2} className="block" />
          <AnimatedText text="IT." mode="chars" trigger="inView" delay={0.4} className="block" />
        </h2>
        <MagneticButton className="mt-10">
          <a
            href="mailto:pravinkumar671231@gmail.com"
            onMouseEnter={() => setCursor("talk")}
            onMouseLeave={() => setCursor("default")}
            className="inline-flex items-center rounded-sm bg-text px-8 py-4 text-sm font-medium text-bg transition-opacity hover:opacity-90"
          >
            Let&apos;s Talk
          </a>
        </MagneticButton>
      </div>
    </section>
  );
}
