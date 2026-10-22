"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import { LatinMarkPaths, LATIN_VIEWBOX } from "@/components/marks";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projects, projectsIn } from "@/data/projects";
import { products } from "@/data/products";
import { Railed, DESTINATIONS } from "@/components/alts/shared";
import V13Nav from "./V13Nav";

// v13: v2's sections on the brand navy, the explore section as opening strips (from
// v7, refined), and a menu that folds from the hero line into a left column.
// Every section after the hero leaves the left rail clear for that column.
const PAD = "px-6 md:px-10 lg:px-14";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

function Statement({ c }) {
  return (
    <Railed id="about" rail="bg-navy" className=" text-navy">
      <div className={`${PAD} py-24 md:py-36 grid md:grid-cols-12 gap-10 md:gap-6 items-end`}>
        <p className="md:col-span-8 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04] tracking-[-0.015em] max-w-[20ch]">
          {c.home2.statement}
        </p>
        <p className="md:col-span-4 text-lg leading-relaxed text-navy/75 max-w-[38ch]">{c.home2.body}</p>
      </div>
    </Railed>
  );
}

// What each open strip previews: a few projects, pieces, or the studio's details
function Peek({ id, c, t, pick }) {
  if (id === "residential" || id === "hospitality") {
    return (
      <div className="flex gap-3">
        {projectsIn(id).slice(0, 3).map((p) => (
          <figure key={p.slug} className="w-20 md:w-24">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image src={p.cover} alt="" fill sizes="96px" className="object-cover" />
            </div>
            <figcaption className="mt-1.5 text-xs leading-tight">{pick(p.title)}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  if (id === "gallery") {
    return (
      <div className="flex gap-3">
        {products.slice(0, 3).map((p) => (
          <figure key={p.slug} className="w-20 md:w-24">
            <div className="relative aspect-square ">
              <Image src={p.images[0]} alt="" fill sizes="96px" className="object-contain p-2" />
            </div>
            <figcaption className="mt-1.5 text-xs leading-tight">{pick(p.name)}</figcaption>
          </figure>
        ))}
      </div>
    );
  }
  if (id === "about") {
    return (
      <ul className="flex gap-6 ">
        {c.footer.cities.split(/,\s*|،\s*/).map((city) => (
          <li key={city} className="border-t pt-2 min-w-20">{city}</li>
        ))}
      </ul>
    );
  }
  return <p className=" border-t pt-2 inline-block">{t.contact.emailAddress}</p>;
}

// Five tall strips; the one pointed at or focused opens wide and previews what
// is inside. Closed strips keep their title and count; phones show every strip.
function Strips({ c, t, lang, pick }) {
  const [open, setOpen] = useState(1);
  const counts = {
    residential: c.projectsCount(projectsIn("residential").length),
    hospitality: c.projectsCount(projectsIn("hospitality").length),
    gallery: c.pieces(products.length),
  };
  const enter = { en: "Enter", ar: "ادخل" }[lang];
  const totals = [
    c.projectsCount(projects.length),
    c.pieces(products.length),
    c.footer.cities,
  ];

  return (
    <Railed className="bg-navy ">
      <div className={`${PAD} pt-20 md:pt-28 pb-24`}>
        {/* Header: title, a line about the studio, and what there is to see */}
        <div className="grid md:grid-cols-12 gap-6 items-end pb-8 mb-8 md:mb-10 border-b ">
          <h2 className="md:col-span-5 text-[clamp(2.25rem,4.5vw,4rem)] leading-none tracking-[-0.015em]">{c.home2.waysTitle}</h2>
          <p className="md:col-span-4 leading-relaxed max-w-[40ch]">{c.home2.body}</p>
          <ul className="md:col-span-3 text-sm space-y-1 md:text-end">
            {totals.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:h-[78vh] md:min-h-[600px]">
          {DESTINATIONS.map((d, i) => {
            const isOpen = open === i;
            return (
              <Link
                key={d.id}
                href={d.href}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                aria-describedby={`strip-${d.id}`}
                className={`group relative block overflow-hidden min-h-[60vh] md:min-h-0 md:h-auto md:basis-0 md:min-w-24 transition-[flex-grow] duration-[900ms] ${EASE} ${
 isOpen ? "md:grow-[5]" : "md:grow"
 } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset `}
              >
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 55vw, 90vw"
                  className={`object-cover transition-[transform,filter] duration-[1400ms] ${EASE} ${
 isOpen ? "scale-100 brightness-90" : "md:scale-110 md:brightness-[0.7] md:saturate-[0.85]"
 }`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/95 via-navy/30 to-navy/10" />
                <span aria-hidden="true" className="absolute inset-y-0 start-0 w-px" />

                {/* Closed: count at the top, title running up from the bottom */}
                <span className={`hidden md:block absolute top-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap [writing-mode:vertical-rl] transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                  {counts[d.id] ?? t.navGrid.items[d.id]}
                </span>
                <span className={`hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-2xl whitespace-nowrap transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                  {t.nav[d.id]}
                </span>

                {/* Open: count, title, description, a preview of what is inside, and a way in */}
                <div
                  id={`strip-${d.id}`}
                  className={`absolute inset-x-0 bottom-0 p-6 md:p-9 transition-[opacity,transform] duration-700 ${EASE} ${
 isOpen ? "opacity-100 translate-y-0 delay-200" : "md:opacity-0 md:translate-y-4 md:pointer-events-none"
 }`}
                >
                  {counts[d.id] && <p className="text-sm ">{counts[d.id]}</p>}
                  <h3 className="mt-2 text-[clamp(2.25rem,4.2vw,4rem)] leading-none tracking-[-0.015em] whitespace-nowrap">{t.nav[d.id]}</h3>
                  <p className="mt-3 max-w-[40ch]">{t.navGrid.items[d.id]}</p>
                  <div className="mt-6">
                    <Peek id={d.id} c={c} t={t} pick={pick} />
                  </div>
                  <span className="mt-7 inline-flex items-center gap-3 text-sm">
                    <span className={`h-px transition-[width] duration-700 ${EASE} ${isOpen ? "w-12" : "w-6"}`} />
                    {enter}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Railed>
  );
}

function Recent({ c, pick }) {
  const recent = [...projects].sort((a, b) => b.year - a.year).slice(0, 4);
  return (
    <Railed rail="bg-burgundy" className="bg-burgundy ">
      <div className={`${PAD} py-24 md:py-32`}>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12 md:mb-16">
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.015em]">{c.home2.recentTitle}</h2>
          <div className="flex gap-6 ">
            <Link href="/residential" className="underline underline-offset-[6px] ">{c.home2.allResidential}</Link>
            <Link href="/hospitality" className="underline underline-offset-[6px] ">{c.home2.allHospitality}</Link>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-14 md:gap-y-20">
          {recent.map((p, i) => (
            <Link key={p.slug} href={`/${p.category}/${p.slug}`} className={`group block ${i % 2 === 1 ? "md:mt-24" : ""}`}>
              <div className="relative aspect-3/2 overflow-hidden bg-navy">
                <Image src={p.cover} alt={pick(p.title)} fill sizes="(min-width: 768px) 40vw, 90vw" className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.04]`} />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-6">
                <h3 className="text-2xl md:text-3xl">{pick(p.title)}</h3>
                <p className="shrink-0 text-sm ">
                  {pick(p.location)}, <span className="tabular-nums">{p.year}</span>
                </p>
              </div>
              <p className="mt-2 max-w-[48ch]">{pick(p.summary)}</p>
            </Link>
          ))}
        </div>
      </div>
    </Railed>
  );
}

function FromGallery({ c, pick }) {
  return (
    <Railed rail="bg-navy" className=" text-navy">
      <div className={`${PAD} pt-20 md:pt-28 pb-5 flex items-end justify-between gap-6 border-b border-navy`}>
        <h2 className="text-3xl md:text-4xl">{c.home2.galleryTitle}</h2>
        <Link href="/gallery" className="underline underline-offset-[6px] decoration-navy/40 hover:decoration-navy">{c.home2.galleryLink}</Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((p) => (
          <Link key={p.slug} href={`/gallery/${p.slug}`} className="group relative block aspect-square overflow-hidden border-e border-b border-navy/10 last:border-e-0">
            <Image src={p.images[0]} alt={pick(p.name)} fill sizes="(min-width: 1024px) 20vw, 40vw" className={`object-contain p-[16%] transition-transform duration-1000 ${EASE} group-hover:scale-[1.05]`} />
            <h3 className="absolute bottom-4 start-4 end-4 text-sm uppercase">{pick(p.name)}</h3>
          </Link>
        ))}
      </div>
    </Railed>
  );
}

function Footer({ c, t }) {
  const [x, y, w, h] = LATIN_VIEWBOX.split(" ").map(Number);
  return (
    <Railed as="footer" id="contact" className="bg-navy ">
      <div className={`${PAD} pt-24 md:pt-32 pb-6 min-h-screen flex flex-col`}>
        <p className=" text-lg">{c.home2.talkLead}</p>
        <a href={`mailto:${t.contact.emailAddress}`} className="mt-3 self-start text-[clamp(2.25rem,6.5vw,6rem)] leading-none tracking-[-0.02em] hover:text-beige transition-colors">
          {c.footer.talk}
        </a>
        <p className="mt-4 ">{t.contact.emailAddress}</p>
        <div className="flex-1 min-h-24" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b ">
          <p>© 2026 {c.footer.rights}</p>
          <p>{c.footer.cities}</p>
        </div>
        <svg viewBox={LATIN_VIEWBOX} role="img" aria-label="AJID" className="mt-4 block w-full h-auto">
          <defs>
            <clipPath id="v13-mark">
              <LatinMarkPaths />
            </clipPath>
          </defs>
          <image href="/images/hero/eladio-hero-bg.webp" x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath="url(#v13-mark)" />
        </svg>
      </div>
    </Railed>
  );
}

export default function V13Home() {
  const { c, pick, lang } = useCopy();
  const { t } = useLanguage();
  return (
    <div className="bg-navy ">
      <V13Nav active="home" />
      <main>
        <Hero />
        <Strips c={c} t={t} lang={lang} pick={pick} />
        <Statement c={c} />
        <Recent c={c} pick={pick} />
        <FromGallery c={c} pick={pick} />
      </main>
      <Footer c={c} t={t} />
    </div>
  );
}
