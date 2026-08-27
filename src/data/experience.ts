// TODO: replace with real experience/journey entries once finalized.

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export const experience: ExperienceEntry[] = [
  {
    id: "current",
    role: "Full Stack Developer",
    company: "Placeholder — replace with real role/company",
    period: "2026 — Present",
    description: "Placeholder description of current focus (Next.js, TypeScript, Docker, CI/CD).",
  },
  {
    id: "prior",
    role: "Web Developer",
    company: "Placeholder — replace with real role/company",
    period: "2025",
    description: "Placeholder description of prior focus (React, Node.js, MongoDB).",
  },
];
