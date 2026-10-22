import { Suspense } from "react";
import { notFound } from "next/navigation";
import PageFallback from "@/components/site/PageFallback";
import ProductDetail from "@/components/site/ProductDetail";
import { findProduct, products } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  return { title: product ? `${product.name.en} | Studio Ajid` : "Studio Ajid" };
}

// Every piece stays reachable here, since older home versions link to /gallery/<slug>;
// Objects pieces also have their own /objects/<slug> pages
// Reading the URL happens inside Suspense, so navigation stays instant
export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<PageFallback active="gallery" />}>
      <Details params={params} />
    </Suspense>
  );
}

async function Details({ params }) {
  const { slug } = await params;
  if (!findProduct(slug)) notFound();
  return <ProductDetail key={slug} slug={slug} />;
}
