"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { productsIn } from "@/data/products";
import { STUDIO_MAP_URL } from "@/data/studio";
import { Railed, DESTINATIONS } from "@/components/alts/shared";
import V15Hero from "./V15Hero";
import V15Nav from "./V15Nav";
import V15Footer from "./V15Footer";
import { PAD, RAIL, SECTION } from "./layout";

// v15: v13's layout in the two brand colours at their exact shades, stone beige
// grounds and deep navy type (hairlines are the only tints). Residential and
// hospitality are one "Interiors" destination; Objects (the studio's own pieces)
// and the Gallery (a broader selection) are kept apart; The Studio replaces
// recent projects, which already appear elsewhere.
const HOME = "/";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Placeholders until the studio's own photographs arrive
const STUDIO_IMAGES = ["/images/dieste-2.jpg", "/images/dieste-vault.jpg"];

const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=2000`;
const STRIPS = DESTINATIONS.filter((d) => d.id !== "hospitality").flatMap((d) => {
  if (d.id === "residential") return [{ ...d, id: "interiors", href: "/interiors" }];
  if (d.id === "about") return [{ ...d, href: "/about" }];
  if (d.id === "contact") return [{ ...d, href: "/contact" }];
  // Objects sit just before the gallery
  if (d.id === "gallery") return [{ id: "objects", href: "/objects", image: unsplash("photo-1565193566173-7a0ee3dbe261") }, d];
  return [d];
});


function Statement({ c }) {
  return (
    <Railed id="about" rail={RAIL} className="bg-beige text-navy">
      <div className={`${SECTION} py-24 md:py-32 grid md:grid-cols-12 gap-10 md:gap-6 items-end`}>
        <p className="md:col-span-8 text-[clamp(1.625rem,2.6vw,2.5rem)] leading-[1.15] tracking-[-0.01em] max-w-[28ch]">
          {c.home2.statement}
        </p>
        <p className="md:col-span-4 text-base leading-relaxed max-w-[38ch]">{c.home2.body}</p>
      </div>
    </Railed>
  );
}

// What each open strip previews: a few projects, pieces, or the studio's details
function Peek({ id, c, t, pick }) {
  if (id === "interiors") {
    return (
      <div className="flex gap-3">
        {projects.slice(0, 3).map((p) => (
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
  if (id === "objects" || id === "gallery") {
    return (
      <div className="flex gap-3">
        {productsIn(id).slice(0, 3).map((p) => (
          <figure key={p.slug} className="w-20 md:w-24">
            <div className="relative aspect-square">
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
      <ul className="flex gap-6">
        {c.footer.cities.split(/,\s*|،\s*/).map((city) => (
          <li key={city} className="border-t border-beige/40 pt-2 min-w-20">{city}</li>
        ))}
      </ul>
    );
  }
  return <p className="border-t border-beige/40 pt-2 inline-block">{t.contact.emailAddress}</p>;
}

// Five tall strips; the one pointed at or focused opens wide and previews what
// is inside. Closed strips keep their title and count; phones show every strip.
function Strips({ c, t, lang, pick }) {
  const [open, setOpen] = useState(1);
  const counts = {
    interiors: c.projectsCount(projects.length),
    objects: c.pieces(productsIn("objects").length),
    gallery: c.pieces(productsIn("gallery").length),
  };
  // The gallery strip describes the broader selection, not the studio's pieces
  const describe = (id) => (id === "gallery" ? t.navGrid.items.collection : t.navGrid.items[id]);
  const enter = { en: "Enter", ar: "ادخل" }[lang];
  const totals = [c.projectsCount(projects.length), counts.objects, c.footer.cities];

  return (
    <Railed rail={RAIL} className="bg-beige text-navy">
      <div className={`${PAD} pt-20 md:pt-28 pb-24`}>
        {/* Header: title, a line about the studio, and what there is to see */}
        <div className="grid md:grid-cols-12 gap-6 items-end pb-8 mb-8 md:mb-10 border-b border-navy/15">
          <h2 className="md:col-span-5 text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.01em]">{c.home2.waysTitle}</h2>
          <p className="md:col-span-4 leading-relaxed max-w-[40ch]">{c.home2.body}</p>
          <ul className="md:col-span-3 text-sm space-y-1 md:text-end">
            {totals.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:h-[78vh] md:min-h-[600px]">
          {STRIPS.map((d, i) => {
            const isOpen = open === i;
            return (
              <Link
                key={d.id}
                href={d.href}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                aria-describedby={`strip-${d.id}`}
                className={`group relative block overflow-hidden min-h-[60vh] md:min-h-0 md:h-auto md:basis-0 md:min-w-24 bg-black text-beige transition-[flex-grow] duration-[900ms] ${EASE} ${
                  isOpen ? "md:grow-[5]" : "md:grow"
                } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-beige`}
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
                {/* Neutral dark overlay, never blue, so the beige type reads on any photo */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/15" />

                {/* Closed: count at the top, title running up from the bottom */}
                <span className={`hidden md:block absolute top-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap [writing-mode:vertical-rl] transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                  {counts[d.id] ?? describe(d.id)}
                </span>
                <span className={`hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-xl whitespace-nowrap transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                  {t.nav[d.id]}
                </span>

                {/* Open: count, title, description, a preview of what is inside, and a way in */}
                <div
                  id={`strip-${d.id}`}
                  className={`absolute inset-x-0 bottom-0 p-6 md:p-9 transition-[opacity,transform] duration-700 ${EASE} ${
                    isOpen ? "opacity-100 translate-y-0 delay-200" : "md:opacity-0 md:translate-y-4 md:pointer-events-none"
                  }`}
                >
                  {counts[d.id] && <p className="text-sm">{counts[d.id]}</p>}
                  <h3 className="mt-2 text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.05] tracking-[-0.01em] whitespace-nowrap">{t.nav[d.id]}</h3>
                  <p className="mt-3 max-w-[40ch]">{describe(d.id)}</p>
                  <div className="mt-6">
                    <Peek id={d.id} c={c} t={t} pick={pick} />
                  </div>
                  <span className="mt-7 inline-flex items-center gap-3 text-sm">
                    <span className={`h-px bg-current transition-[width] duration-700 ${EASE} ${isOpen ? "w-12" : "w-6"}`} />
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

// The studio itself: the title opens its location on Google Maps, a quiet line
// beneath it, and two photographs of equal size. Nothing else.
function Studio({ c }) {
  return (
    <Railed rail={RAIL} className="bg-beige text-navy">
      <div className={`${SECTION} py-28 md:py-40`}>
        <div className="mb-14 md:mb-20">
          <a
            href={STUDIO_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-start gap-2.5 text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em] focus-visible:outline-none focus-visible:underline underline-offset-8 decoration-1"
          >
            {c.home2.studioTitle}
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.25}
              className={`mt-[0.12em] w-[0.5em] h-[0.5em] shrink-0 rtl:-scale-x-100 transition-transform duration-500 ${EASE} group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5`}
            />
          </a>
          <p className="mt-4 text-xs tracking-[0.14em] uppercase">{c.home2.studioNote}</p>
        </div>
        {/* Landscape, so the pair fills the width without towering */}
        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {STUDIO_IMAGES.map((src) => (
            <div key={src} className="relative aspect-3/2 overflow-hidden">
              <Image src={src} alt="" fill sizes="(min-width: 768px) 42vw, 45vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </Railed>
  );
}

// A row of pieces from one collection, under its own title, descriptor and link.
// Objects get three larger tiles (one per row on phones) and the gallery four
// smaller ones, so the two read as different things.
function Pieces({ collection, title, note, linkLabel, cols, pick }) {
  const shown = productsIn(collection).slice(0, cols);
  return (
    <Railed rail={RAIL} className="bg-beige text-navy">
      <div className={`${SECTION} pt-20 md:pt-28 pb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3`}>
        <div>
          <h2 className="text-2xl md:text-3xl">{title}</h2>
          <p className="mt-2 text-xs tracking-[0.14em] uppercase">{note}</p>
        </div>
        <Link href={`/${collection}`} className="text-sm underline underline-offset-[6px] decoration-navy/30 hover:decoration-navy">{linkLabel}</Link>
      </div>
      {/* Hairline grid: the gaps show the line colour, so no edge is ever doubled */}
      <div className={`grid ${cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"} gap-px bg-navy/10 border-y border-navy/10`}>
        {shown.map((p) => (
          <Link key={p.slug} href={`/${collection}/${p.slug}`} className="group relative block aspect-square overflow-hidden bg-beige">
            <Image src={p.images[0]} alt={pick(p.name)} fill sizes={cols === 3 ? "(min-width: 640px) 30vw, 90vw" : "(min-width: 1024px) 20vw, 45vw"} className={`object-contain p-[16%] transition-transform duration-1000 ${EASE} group-hover:scale-[1.05]`} />
            <h3 className="absolute bottom-4 start-4 end-4 text-xs tracking-[0.08em] uppercase">{pick(p.name)}</h3>
          </Link>
        ))}
      </div>
    </Railed>
  );
}

export default function V15Home() {
  const { c, pick, lang } = useCopy();
  const { t } = useLanguage();
  return (
    <div className="bg-beige text-navy">
      <V15Nav />
      <main>
        <V15Hero homeHref={HOME} />
        <Strips c={c} t={t} lang={lang} pick={pick} />
        <Statement c={c} />
        <Studio c={c} />
        <Pieces collection="objects" title={c.home2.objectsTitle} note={t.navGrid.items.objects} linkLabel={c.home2.objectsLink} cols={3} pick={pick} />
        <Pieces collection="gallery" title={c.gallery.title} note={t.navGrid.items.collection} linkLabel={c.home2.galleryLink} cols={4} pick={pick} />
      </main>
      <V15Footer />
    </div>
  );
}
