"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageShell, { PAGE_GUTTER } from "./PageShell";
import { useCopy } from "./useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projects, projectsIn } from "@/data/projects";

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// A calm title over a hairline, as on the home page, then three even
// columns of landscape photographs, each captioned beneath in small capitals:
// "NAME, CITY". "interiors" lists residential and hospitality together, with a
// filter for each, styled like the gallery's.
export default function ProjectIndex({ category }) {
  const { c, pick } = useCopy();
  const { t } = useLanguage();
  const isInteriors = category === "interiors";
  const [filter, setFilter] = useState("all");
  const list = isInteriors ? (filter === "all" ? projects : projectsIn(filter)) : projectsIn(category);
  const title = isInteriors ? t.nav.interiors : c[category].title;
  const filters = [
    ["all", c.allProjects],
    ["residential", c.residential.title],
    ["hospitality", c.hospitality.title],
  ];

  return (
    <PageShell active="interiors">
      <div className={`${PAGE_GUTTER} pt-12 md:pt-20 pb-24 md:pb-32`}>
        <div className={`flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-navy/15 ${isInteriors ? "" : "mb-10 md:mb-14"}`}>
          <h1 className="text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em]">{title}</h1>
        </div>

        {isInteriors && (
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 pt-4 pb-3 mb-10 md:mb-14 border-b border-navy/15">
            <div role="group" aria-label={title} className="flex flex-wrap gap-x-5 gap-y-1">
              {filters.map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                  className={`text-base cursor-pointer underline-offset-[9px] decoration-1 focus-visible:outline-none focus-visible:underline ${
                    filter === key ? "underline" : "hover:underline"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-9 gap-y-10">
          {list.map((p, i) => (
            <Link key={p.slug} href={`/${p.category}/${p.slug}`} className="group block focus-visible:outline-none">
              <div className="relative aspect-7/5 overflow-hidden group-focus-visible:ring-1 group-focus-visible:ring-navy">
                <Image
                  src={p.cover}
                  alt={pick(p.title)}
                  fill
                  preload={i < 3}
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 90vw"
                  className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.03]`}
                />
              </div>
              <p className="mt-3 text-xs tracking-[0.08em] uppercase">
                {pick(p.title)}, {pick(p.location)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
