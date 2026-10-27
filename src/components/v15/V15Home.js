"use client";

import { useState, ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { productsIn } from "@/data/products";
import { STUDIO_MAP_URL, PHONE_DISPLAY } from "@/data/studio";
import { AMarkPaths, A_MARK_VIEWBOX } from "@/components/marks";
import { Railed, DESTINATIONS } from "@/components/alts/shared";
import V15Hero from "./V15Hero";
import V15Nav from "./V15Nav";
import V15Footer from "./V15Footer";
import Reveal from "@/components/site/Reveal";
import { PAD, RAIL, SECTION, PATTERN_FILL } from "./layout";

// v15: v13's layout in the two brand colours at their exact shades, stone beige
// grounds and deep navy type (hairlines are the only tints). Residential and
// hospitality are one "Interiors" destination; Objects (the studio's own pieces)
// and the Gallery (a broader selection) are kept apart; The Studio replaces
// recent projects, which already appear elsewhere.
const HOME = "/";

// The Objects and Gallery rows are hidden for now, since the strips already
// lead there and the client wants nothing repeated. Set to true to show them.
const SHOW_PIECES = false;

// The brand pattern tiled behind the whole page below the hero. Sections drop
// their own beige so it runs on without seams. Set to false to undo.
const PAGE_PATTERN = false;
const GROUND = PAGE_PATTERN ? "" : "bg-beige";
const HOME_RAIL = PAGE_PATTERN ? "max-md:hidden" : RAIL;
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

// The strips' preview of what is inside (description, a few projects or
// pieces) and the closed strips' short line. Hidden for the client's softer
// strips; set to true to bring them back.
const STRIP_DETAILS = false;

// The Studio showed two photographs side by side; the client's layout has one
// wide one. Set to true for the pair.
const STUDIO_PAIR = false;

// A short rule, then "A.": the studio's small signature under a title
function Signature({ className = "" }) {
  return (
    <span aria-hidden="true" dir="ltr" className={`flex items-end gap-3 ${className}`}>
      <span className="mb-[0.2em] h-px w-14 md:w-16 bg-current" />
      <svg viewBox={A_MARK_VIEWBOX} className="block h-5 md:h-6 w-auto fill-current">
        <AMarkPaths />
      </svg>
    </span>
  );
}

// The first thing after the hero, per the client: a magazine opening. The
// monogram stands as the first letter of a short paragraph set small and bold,
// beside the larger main introduction. The logo file is beige, so it is used
// as a mask and filled with the exact navy.
function Intro({ c }) {
  return (
    <Railed id="about" rail={HOME_RAIL} className={`${GROUND} text-navy`}>
      <div className={`${PAD} py-16 md:py-24 grid md:grid-cols-12 gap-10 md:gap-6`}>
        <Reveal className="md:col-span-4">
          <div
            aria-hidden="true"
            className="w-10 md:w-12 aspect-[700/645] bg-navy [mask:url(/logos/monogram.png)_center/contain_no-repeat]"
          />
          <p className="mt-2 text-sm md:text-[15px] font-bold leading-normal max-w-[30ch]">
            {c.home2.introLetter && <span className="sr-only">{c.home2.introLetter} </span>}
            {c.home2.introLead}
          </p>
        </Reveal>
        <Reveal as="p" delay={180} className="md:col-span-7 md:col-start-6 text-base md:text-lg leading-normal text-justify max-w-[52ch]">
          {c.home2.intro}
        </Reveal>
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
// is inside. Closed strips keep their title and a short line; phones show every
// strip. The site never says how many projects or pieces there are.
function Strips({ c, t, lang, pick }) {
  const [open, setOpen] = useState(1);
  // The gallery strip describes the broader selection, not the studio's pieces
  const describe = (id) => (id === "gallery" ? t.navGrid.items.collection : t.navGrid.items[id]);
  const enter = { en: "Enter", ar: "ادخل" }[lang];

  return (
    <Railed rail={HOME_RAIL} className={`${GROUND} text-navy`}>
      <div className={`${PAD} pb-24`}>
        <Reveal className="flex flex-col md:flex-row gap-2 md:h-[78vh] md:min-h-[600px]">
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

                {/* Closed: a short line at the top, title running up from the bottom */}
                <span className={`hidden md:block absolute top-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap [writing-mode:vertical-rl] transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                  {describe(d.id)}
                </span>
                <span className={`hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-xl whitespace-nowrap transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                  {t.nav[d.id]}
                </span>

                {/* Open: title, description, a preview of what is inside, and a way in */}
                <div
                  id={`strip-${d.id}`}
                  className={`absolute inset-x-0 bottom-0 p-6 md:p-9 transition-[opacity,transform] duration-700 ${EASE} ${
                    isOpen ? "opacity-100 translate-y-0 delay-200" : "md:opacity-0 md:translate-y-4 md:pointer-events-none"
                  }`}
                >
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
        </Reveal>
      </div>
    </Railed>
  );
}

// A trial of the strips after a reference the user shared, shown under the
// originals: a header row, then numbered tiles. Closed tiles are deep navy with
// the number at the top and the name running up in spaced capitals; the open
// tile shows its photograph edge to edge with two small facts at the top and,
// at the foot, the number and a short rule, the title, its line and the way in. Contact is the accent tile,
// beige with the monogram large and faint. Set SHOW_STRIPS_TRY to false to
// remove it.
const SHOW_STRIPS_TRY = true;

const TRY_WORDS = {
  en: { hover: "Hover to open", visits: "Visits", write: "Write to us", call: "Call or WhatsApp", view: "View" },
  ar: { hover: "مرّر للفتح", visits: "الزيارات", write: "راسلنا", call: "اتصال أو واتساب", view: "اكتشف" },
};

// Two small facts for the top of an open tile, label over value. Only About
// and Contact have them: the collections hold many projects or pieces, so no
// single one speaks for the tile.
function tryFacts(id, c, t, w) {
  if (id === "interiors" || id === "objects" || id === "gallery") return [];
  if (id === "about") return [[c.home2.studioTitle, c.home2.studioPlace], [w.visits, c.home2.studioNote]];
  return [[w.write, t.contact.emailAddress], [w.call, PHONE_DISPLAY]];
}

function StripsTry({ c, t, lang, pick }) {
  const [open, setOpen] = useState(1);
  const w = TRY_WORDS[lang];
  const describe = (id) => (id === "gallery" ? t.navGrid.items.collection : t.navGrid.items[id]);
  const num = (i) => String(i + 1).padStart(2, "0");
  const caps = "uppercase tracking-[0.2em]";

  return (
    <Railed rail={HOME_RAIL} className={`${GROUND} text-navy`}>
      <div className={`${PAD} pb-24`}>
        <Reveal className="flex items-end justify-between gap-6 pb-5">
          <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-none">{c.home2.waysTitle}</h2>
          <p className={`hidden sm:block text-[11px] ${caps}`}>{w.hover}</p>
        </Reveal>
        <Reveal className="flex flex-col md:flex-row gap-1.5 md:h-[68vh] md:min-h-[520px]">
          {STRIPS.map((d, i) => {
            const isOpen = open === i;
            // Contact is the accent tile: beige, navy words, no photograph
            const accent = d.id === "contact";
            const ink = accent ? "text-navy" : "text-beige";
            return (
              <Link
                key={d.id}
                href={d.href}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                aria-describedby={`strip-try-${d.id}`}
                className={`group relative block overflow-hidden rounded-[5px] min-h-[60vh] md:min-h-0 md:h-auto md:basis-0 md:min-w-20 transition-[flex-grow] duration-[900ms] ${EASE} ${
                  isOpen ? "md:grow-[6]" : "md:grow"
                } ${accent ? "bg-navy/8" : "bg-navy"} ${ink} focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy`}
              >
                {accent ? (
                  // The monogram, large and faint, as the tile's mark
                  <div aria-hidden="true" className="absolute top-14 left-1/2 -translate-x-1/2 w-12 md:w-14 aspect-[700/645] bg-navy/20 [mask:url(/logos/monogram.png)_center/contain_no-repeat]" />
                ) : (
                  // The photograph shows once the tile is open (always on phones)
                  <div className={`absolute inset-0 bg-black transition-opacity duration-700 ${EASE} ${isOpen ? "opacity-100" : "md:opacity-0"}`}>
                    <Image
                      src={d.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 50vw, 90vw"
                      className={`object-cover transition-transform duration-[1400ms] ${EASE} ${isOpen ? "scale-100" : "scale-105"}`}
                    />
                    {/* Neutral dark shade, never blue, at the top and foot where the words sit */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/5 to-black/75" />
                  </div>
                )}

                {/* Closed tiles' hairline edge, drawn over the tile so it can fade away on
                    opening; a real border would leave a navy line around the photograph */}
                <span aria-hidden="true" className={`pointer-events-none absolute inset-0 rounded-[5px] border transition-opacity duration-500 ${accent ? "border-navy/15" : "border-beige/10"} ${isOpen ? "opacity-0" : "opacity-100"}`} />

                {/* Closed: the number at the top, the name running up from the bottom */}
                <span className={`hidden md:block absolute top-8 inset-x-0 text-center text-[13px] font-bold tabular-nums tracking-[0.12em] transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                  {num(i)}
                </span>
                <span className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-[11px] whitespace-nowrap ${caps} transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}>
                  {t.nav[d.id]}
                </span>

                {/* Open: two facts at the top; the number and line, title and way in at the foot */}
                <div
                  id={`strip-try-${d.id}`}
                  className={`absolute inset-0 flex flex-col justify-between p-6 md:p-8 transition-[opacity,transform] duration-700 ${EASE} ${
                    isOpen ? "opacity-100 translate-y-0 delay-200" : "md:opacity-0 md:translate-y-3 md:pointer-events-none"
                  }`}
                >
                  <dl className="space-y-4 max-w-[30ch]">
                    {tryFacts(d.id, c, t, w).map(([label, value]) => (
                      <div key={label}>
                        <dt className={`text-[10px] font-medium ${caps}`}>{label}</dt>
                        <dd className="mt-1 text-[15px] font-bold leading-snug">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div>
                    <p className="flex items-center gap-3 text-[11px] font-bold tabular-nums tracking-[0.12em]">
                      {num(i)}
                      <span aria-hidden="true" className="h-px w-8 bg-current" />
                    </p>
                    <h3 className="mt-3 text-[clamp(2rem,3vw,3rem)] leading-none whitespace-nowrap">{t.nav[d.id]}</h3>
                    <p className="mt-3 text-[15px] leading-snug max-w-[36ch]">{describe(d.id)}</p>
                    <span className={`mt-6 inline-flex items-center gap-2 text-[11px] font-bold ${caps}`}>
                      {w.view}
                      <ArrowRight
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className={`w-3.5 h-3.5 rtl:-scale-x-100 transition-transform duration-500 ${EASE} group-hover:translate-x-1 rtl:group-hover:-translate-x-1`}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </Railed>
  );
}

// The client's own photographs of a residence, set as a magazine spread that
// fits one screen: the room runs full height down one side; a lead line and a
// paragraph sit in the opposite top corner; the detail crosses the seam, partly
// over the room, as a picture laid on a page; the signature and a way to the
// interiors close the free corner. Phones stack them, the detail overlapping
// the foot of the room. Set SHOW_RESIDENCE to false to remove it.
const SHOW_RESIDENCE = true;
const RESIDENCE = { room: "/images/client/residence-room.jpg", detail: "/images/client/residence-detail.jpg" };

function Residence({ c }) {
  const photo = `object-cover transition-transform duration-[1600ms] ${EASE} hover:scale-[1.03]`;
  return (
    <Railed rail={HOME_RAIL} className={`${GROUND} text-navy`}>
      <div className={`${SECTION} py-14 md:py-16`}>
        <div className="relative md:h-[80svh] md:min-h-[560px] md:max-h-[900px]">
          {/* The line, large, in the top corner */}
          <Reveal className="md:absolute md:top-0 md:start-0 md:w-[28%]">
            <p className="text-xl md:text-[1.625rem] leading-[1.25]">{c.home2.residenceLead}</p>
            {/* Set as the intro's paragraph */}
            <p className="mt-4 text-[15px] md:text-base leading-[1.4] text-justify">{c.home2.residenceBody}</p>
          </Reveal>

          {/* The room, full height */}
          <Reveal as="figure" delay={120} className="relative mt-10 md:mt-0 aspect-4/5 md:aspect-auto md:absolute md:inset-y-0 md:end-0 md:w-[56%] overflow-hidden">
            <Image src={RESIDENCE.room} alt="" fill sizes="(min-width: 768px) 42vw, 95vw" className={photo} />
          </Reveal>

          {/* The detail, laid across the seam */}
          <Reveal as="figure" delay={320} className="relative z-10 w-1/2 -mt-28 ms-6 md:m-0 aspect-2/3 md:absolute md:bottom-[8%] md:start-[30%] md:w-[21%] overflow-hidden">
            <Image src={RESIDENCE.detail} alt="" fill sizes="(min-width: 768px) 18vw, 50vw" className={photo} />
          </Reveal>

          {/* The free corner: the signature and a way in */}
          <Reveal delay={200} className="mt-10 md:mt-0 md:absolute md:bottom-0 md:start-0 md:w-[26%]">
            <Signature />
            <Link href="/interiors" className="u-line mt-6 inline-block text-sm">{c.allProjects}</Link>
          </Reveal>
        </div>
      </div>
    </Railed>
  );
}

// The studio itself, laid out like a magazine page: a bold title (opening its
// location on Google Maps), the address in small capitals and the signature,
// a wide pause, then one wide photograph
function Studio({ c }) {
  const images = STUDIO_PAIR ? STUDIO_IMAGES : STUDIO_IMAGES.slice(0, 1);
  return (
    <Railed rail={HOME_RAIL} className={`${GROUND} text-navy`}>
      <div className={`${SECTION} py-20 md:py-28`}>
        <Reveal className="mb-12 md:mb-16">
          <a
            href={STUDIO_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-start gap-2 text-[2rem] md:text-[2.5rem] font-bold leading-tight focus-visible:outline-none focus-visible:underline underline-offset-8 decoration-1"
          >
            {c.home2.studioTitle}
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.25}
              className={`mt-[0.15em] w-[0.5em] h-[0.5em] shrink-0 rtl:-scale-x-100 transition-transform duration-500 ${EASE} group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5`}
            />
          </a>
          <p className="mt-2 text-sm md:text-[15px] uppercase tracking-[0.04em] leading-relaxed">
            {c.home2.studioPlace}
            <br />
            {c.home2.studioCity}. {c.home2.studioNote}.
          </p>
          <Signature className="mt-4" />
        </Reveal>
        <div className={`grid gap-3 md:gap-5 ${STUDIO_PAIR ? "grid-cols-2" : ""}`}>
          {images.map((src, i) => (
            <Reveal key={src} as="figure" delay={i * 200}>
              <div className={`relative overflow-hidden ${STUDIO_PAIR ? "aspect-3/2" : "aspect-5/4 md:aspect-16/9"}`}>
                <Image src={src} alt="" fill sizes={STUDIO_PAIR ? "(min-width: 768px) 40vw, 45vw" : "(min-width: 768px) 80vw, 95vw"} className={`object-cover transition-transform duration-[1600ms] ${EASE} hover:scale-[1.03]`} />
              </div>
              {STUDIO_PAIR && i === 0 && <figcaption className="mt-3 text-sm">{c.home2.studioPlace}</figcaption>}
            </Reveal>
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
    <Railed rail={HOME_RAIL} className={`${GROUND} text-navy`}>
      <Reveal className={`${SECTION} pt-20 md:pt-28 pb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3`}>
        <div>
          <h2 className="text-2xl md:text-3xl">{title}</h2>
          <p className="mt-2 text-xs tracking-[0.14em] uppercase">{note}</p>
        </div>
        <Link href={`/${collection}`} className="text-sm underline underline-offset-[6px] decoration-navy/30 hover:decoration-navy transition-colors duration-300">{linkLabel}</Link>
      </Reveal>
      {/* Hairline grid: the gaps show the line colour, so no edge is ever doubled */}
      <Reveal delay={150} className={`grid ${cols === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"} gap-px bg-navy/10 border-y border-navy/10`}>
        {shown.map((p) => (
          <Link key={p.slug} href={`/${collection}/${p.slug}`} className="group relative block aspect-square overflow-hidden bg-beige">
            <Image src={p.images[0]} alt={pick(p.name)} fill sizes={cols === 3 ? "(min-width: 640px) 30vw, 90vw" : "(min-width: 1024px) 20vw, 45vw"} className={`object-contain p-[16%] transition-transform duration-1000 ${EASE} group-hover:scale-[1.05]`} />
            <h3 className="absolute bottom-4 start-4 end-4 text-xs tracking-[0.08em] uppercase">{pick(p.name)}</h3>
          </Link>
        ))}
      </Reveal>
    </Railed>
  );
}

export default function V15Home() {
  const { c, pick, lang } = useCopy();
  const { t } = useLanguage();
  return (
    <div className="relative isolate bg-beige text-navy selection:bg-navy selection:text-beige">
      {PAGE_PATTERN && <div aria-hidden="true" className={PATTERN_FILL} />}
      <V15Nav />
      {/* Page changes crossfade, as on the inner pages; the menu stays put */}
      <ViewTransition enter="page-in" exit="page-out" default="none">
        <div>
          <main>
            <V15Hero homeHref={HOME} />
            <Intro c={c} />
            <Strips c={c} t={t} lang={lang} pick={pick} />
            {SHOW_STRIPS_TRY && <StripsTry c={c} t={t} lang={lang} pick={pick} />}
            {SHOW_RESIDENCE && <Residence c={c} />}
            <Studio c={c} />
            {SHOW_PIECES && (
              <>
                <Pieces collection="objects" title={c.home2.objectsTitle} note={t.navGrid.items.objects} linkLabel={c.home2.objectsLink} cols={3} pick={pick} />
                <Pieces collection="gallery" title={c.gallery.title} note={t.navGrid.items.collection} linkLabel={c.home2.galleryLink} cols={4} pick={pick} />
              </>
            )}
          </main>
          <V15Footer onPattern={PAGE_PATTERN} />
        </div>
      </ViewTransition>
    </div>
  );
}
