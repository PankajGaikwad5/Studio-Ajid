"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Minus, Plus } from "lucide-react";
import PageShell from "./PageShell";
import ProductCard from "./ProductCard";
import { useCopy } from "./useCopy";
import { products, productsIn, PRODUCT_TYPES } from "@/data/products";

// Column counts the + and − controls step through; tiles get larger with fewer
const DENSITY = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

// `collection` ("objects" or "gallery") limits the page to that collection, with
// its own title and introduction; without it every piece is shown
export default function GalleryIndex({ collection }) {
  const { c, isRTL } = useCopy();
  const pieces = collection ? productsIn(collection) : products;
  const copy = { ...c.gallery, ...(collection && c[collection]) };
  const [type, setType] = useState("all");
  const [cols, setCols] = useState(3);
  const gridRef = useRef(null);

  const shown = type === "all" ? pieces : pieces.filter((p) => p.type === type);

  // Each filter or size change: the tiles fade up, so the change is visible
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !gridRef.current) return;
    const tween = gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.04 }
    );
    return () => tween.kill();
  }, [type, cols]);

  // Only the types this collection has
  const types = PRODUCT_TYPES.filter((t) => pieces.some((p) => p.type === t));
  const filters = [["all", c.gallery.all], ...types.map((t) => [t, c.gallery.types[t]])];

  return (
    <PageShell active={collection ?? "gallery"}>
      <div dir="ltr" className="flex">
        {/* Room for the docked menu column (phones have none); the grid runs flush
            to the right edge */}
        <div aria-hidden="true" className="shrink-0 max-md:hidden md:w-56 lg:w-66" />

        <div dir={isRTL ? "rtl" : "ltr"} className="flex-1 min-w-0">
          {/* Page header: large title, introduction and what is in the gallery */}
          <header className="grid md:grid-cols-12 gap-6 items-end px-5 sm:px-8 md:px-5 pt-12 md:pt-20 pb-8 md:pb-10">
            <h1 className="md:col-span-7 text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em]">{copy.title}</h1>
            <div className="md:col-span-5 md:pb-3">
              <p className="text-base leading-relaxed max-w-[40ch]">{copy.intro}</p>
            </div>
          </header>

          {/* Filter bar, then the size controls */}
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pt-4 pb-3 px-5 sm:px-8 md:px-5 border-y border-navy/15">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <div role="group" aria-label={copy.title} className="flex flex-wrap gap-x-5 gap-y-1">
                {filters.map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={type === key}
                    onClick={() => setType(key)}
                    className={`text-base cursor-pointer transition-colors underline-offset-[9px] decoration-1 focus-visible:outline-none focus-visible:underline ${
                      type === key ? "underline" : "hover:underline"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCols((n) => Math.max(2, n - 1))}
                disabled={cols === 2}
                aria-label={c.gallery.larger}
                className="p-1 cursor-pointer disabled:opacity-30 disabled:cursor-default hover:opacity-60"
              >
                <Plus className="w-6 h-6" strokeWidth={1} />
              </button>
              <button
                type="button"
                onClick={() => setCols((n) => Math.min(4, n + 1))}
                disabled={cols === 4}
                aria-label={c.gallery.smaller}
                className="p-1 cursor-pointer disabled:opacity-30 disabled:cursor-default hover:opacity-60"
              >
                <Minus className="w-6 h-6" strokeWidth={1} />
              </button>
            </div>
          </div>

          {/* Edge-to-edge tiles; the 1px gaps over a navy tint draw the hairlines */}
          <div ref={gridRef} className={`grid ${DENSITY[cols]} gap-px bg-navy/12 border-b border-navy/12`}>
            {shown.map((p) => (
              <ProductCard key={p.slug} product={p} sizes={`(min-width: 1024px) ${Math.round(85 / cols)}vw, 50vw`} />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
