import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/site/ProjectDetail";
import { findProject, projectsIn } from "@/data/projects";

export function generateStaticParams() {
  return projectsIn("hospitality").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = findProject("hospitality", slug);
  return { title: project ? `${project.title.en} | Studio Ajid` : "Studio Ajid" };
}

// Reading the URL happens inside Suspense, so navigation stays instant
export default function HospitalityProjectPage({ params }) {
  return (
    <Suspense fallback={null}>
      <Details params={params} />
    </Suspense>
  );
}

async function Details({ params }) {
  const { slug } = await params;
  if (!findProject("hospitality", slug)) notFound();
  return <ProjectDetail key={slug} category="hospitality" slug={slug} />;
}
