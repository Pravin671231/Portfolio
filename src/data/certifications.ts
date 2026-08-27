// TODO: replace with real certifications once finalized.

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    id: "ai-augmented-dev",
    title: "AI-Augmented Development",
    issuer: "LearnzConnect (placeholder)",
    date: "2026",
    url: "#",
  },
  {
    id: "fullstack-web-dev",
    title: "Full Stack Web Development",
    issuer: "Placeholder Issuer",
    date: "2026",
    url: "#",
  },
];
