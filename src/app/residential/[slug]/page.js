import { Suspense } from "react";
import { notFound } from "next/navigation";
import PageFallback from "@/components/site/PageFallback";
import ProjectDetail from "@/components/site/ProjectDetail";
import { findProject, projectsIn } from "@/data/projects";

export function generateStaticParams() {
  return projectsIn("residential").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = findProject("residential", slug);
  return { title: project ? `${project.title.en} | Studio Ajid` : "Studio Ajid" };
}

// Reading the URL happens inside Suspense, so navigation stays instant
export default function ResidentialProjectPage({ params }) {
  return (
    <Suspense fallback={<PageFallback active="interiors" />}>
      <Details params={params} />
    </Suspense>
  );
}

async function Details({ params }) {
  const { slug } = await params;
  if (!findProject("residential", slug)) notFound();
  return <ProjectDetail key={slug} category="residential" slug={slug} />;
}
