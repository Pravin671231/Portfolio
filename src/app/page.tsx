import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Stack } from "@/components/sections/Stack";
import { Process } from "@/components/sections/Process";
import { Github } from "@/components/sections/Github";
import { Journey } from "@/components/sections/Journey";
import { Certifications } from "@/components/sections/Certifications";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Process />
      <Github />
      <Journey />
      <Certifications />
      <Testimonials />
      <Contact />
    </main>
  );
}
