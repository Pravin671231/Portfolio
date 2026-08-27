// TODO: replace with real project data — links, images, and case studies below are placeholders.

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  coverImage: string;
  liveUrl: string;
  repoUrl: string;
  featured: boolean;
  caseStudy?: {
    problem: string;
    architecture: string;
    features: string[];
    stack: string[];
    result: string;
  };
}

export const projects: Project[] = [
  {
    slug: "techcart",
    title: "TechCart",
    tagline: "Full Stack E-Commerce",
    description:
      "Placeholder description — replace with a real project summary once content is finalized.",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    coverImage: "/projects/techcart-cover.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    caseStudy: {
      problem: "Placeholder — the problem this project solved.",
      architecture: "Placeholder — how the system was structured.",
      features: ["Placeholder feature one", "Placeholder feature two"],
      stack: ["Next.js", "TypeScript", "MongoDB"],
      result: "Placeholder — the outcome/impact.",
    },
  },
  {
    slug: "movienest",
    title: "MovieNest",
    tagline: "Movie Discovery Platform",
    description:
      "Placeholder description — replace with a real project summary once content is finalized.",
    tags: ["React", "Node.js"],
    coverImage: "/projects/movienest-cover.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    slug: "phoneshop",
    title: "PhoneShop",
    tagline: "Mobile Retail Storefront",
    description:
      "Placeholder description — replace with a real project summary once content is finalized.",
    tags: ["Next.js", "Stripe"],
    coverImage: "/projects/phoneshop-cover.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    slug: "leafflow",
    title: "LeafFlow",
    tagline: "Issue-to-PR Workflow Tool",
    description:
      "Placeholder description — replace with a real project summary once content is finalized.",
    tags: ["TypeScript", "Node.js"],
    coverImage: "/projects/leafflow-cover.svg",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
  },
];
