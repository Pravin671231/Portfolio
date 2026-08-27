import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
