// TODO: replace with real skill set once finalized.

export interface StackNode {
  id: string;
  name: string;
  category: "frontend" | "backend" | "database" | "tooling" | "other";
  icon: string;
  /** Reserved for the Phase 2 SVG connection-diagram treatment; unused in MVP. */
  connectsTo?: string[];
}

export const skills: StackNode[] = [
  { id: "typescript", name: "TypeScript", category: "frontend", icon: "code-2" },
  { id: "react", name: "React", category: "frontend", icon: "atom" },
  { id: "nextjs", name: "Next.js", category: "frontend", icon: "layers" },
  { id: "nodejs", name: "Node.js", category: "backend", icon: "server" },
  { id: "mongodb", name: "MongoDB", category: "database", icon: "database" },
  { id: "postgresql", name: "PostgreSQL", category: "database", icon: "database" },
  { id: "docker", name: "Docker", category: "tooling", icon: "container" },
  { id: "tailwind", name: "Tailwind CSS", category: "tooling", icon: "palette" },
];
