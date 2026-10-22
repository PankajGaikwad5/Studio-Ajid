"use client";

import Image from "next/image";
import Link from "next/link";
import { useCopy } from "./useCopy";
import { FINISHES } from "@/data/products";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Square beige tile: the piece centred as a cut-out, its type and finishes in
// the top corners, name, material and size along the bottom. On hover the
// piece lifts and crossfades to its second view.
export default function ProductCard({ product, sizes = "(min-width: 1024px) 22vw, (min-width: 640px) 32vw, 50vw" }) {
  const { c, pick } = useCopy();
  const [first, second] = product.images;

  return (
    <Link
      href={`/${product.collection}/${product.slug}`}
      className="group relative flex flex-col aspect-square bg-beige text-navy p-4 md:p-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-navy"
    >
      <div className="flex items-start justify-between gap-3 text-xs">
        <span>{c.gallery.types[product.type]}</span>
        <ul className="flex gap-1" aria-label={c.facts.finish}>
          {product.finishes.map((f) => (
            <li
              key={f}
              title={pick(FINISHES[f].name)}
              className="w-2.5 h-2.5 rounded-full ring-1 ring-navy/20"
              style={{ backgroundColor: FINISHES[f].hex }}
            />
          ))}
        </ul>
      </div>

      <div className="relative flex-1 my-2">
        <Image
          src={first}
          alt={pick(product.name)}
          fill
          sizes={sizes}
          className={`object-contain p-[8%] transition-[transform,opacity] duration-1000 ${EASE} group-hover:-translate-y-1.5 ${second ? "group-hover:opacity-0" : ""}`}
        />
        {second && (
          <Image
            src={second}
            alt=""
            fill
            sizes={sizes}
            className={`object-contain p-[8%] opacity-0 transition-[transform,opacity] duration-1000 ${EASE} group-hover:opacity-100 group-hover:-translate-y-1.5`}
          />
        )}
      </div>

      <div>
        <h3 className="text-sm uppercase leading-snug">{pick(product.name)}</h3>
        <div className="mt-1 flex items-baseline justify-between gap-3 text-xs">
          <span className="truncate">{pick(product.material)}</span>
          <span className="shrink-0 tabular-nums">{product.dimensions}</span>
        </div>
      </div>
    </Link>
  );
}
