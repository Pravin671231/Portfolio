import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="px-(--space-container-x) py-(--space-section-y)">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-accent-blue">
            Testimonials
          </p>
          <h2 className="mb-10 text-h1 font-semibold">What people say</h2>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.1}>
              <blockquote className="rounded-lg border border-border bg-bg-elevated p-6">
                <p className="mb-4 leading-relaxed text-text-muted">&ldquo;{testimonial.quote}&rdquo;</p>
                <footer className="text-sm">
                  <span className="font-medium">{testimonial.author}</span>
                  <span className="text-text-faint"> — {testimonial.role}</span>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
