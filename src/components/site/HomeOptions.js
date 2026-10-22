"use client";

import Image from "next/image";
import Link from "next/link";
import { LegacyPageShell, GUTTER } from "./PageShell";
import { useCopy } from "./useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { LatinMarkPaths, ArabicMarkPaths } from "@/components/marks";

// Temporary comparison page: layouts for the home-page grid and the footer.
// Every option keeps clear of the always-visible navbar via GUTTER.
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const TILES = [
  { id: "about", href: "/#about", image: "/images/dieste-1.jpg" },
  { id: "residential", href: "/residential", image: "/images/dieste-2.jpg" },
  { id: "hospitality", href: "/hospitality", image: "/images/dieste-vault.jpg" },
  { id: "gallery", href: "/gallery", image: "/images/eladio-san-pedro.jpg" },
  { id: "contact", href: "/#contact", image: "/images/hero/eladio-hero-bg.webp" },
];

function Label({ kind, letter, name, note }) {
  return (
    <div className={`${GUTTER} pt-24 pb-10`}>
      <p className="text-sm text-mist">
        {kind} option {letter}
      </p>
      <h2 className="mt-1 text-4xl md:text-5xl">{name}</h2>
      <p className="mt-2 text-beige/70 max-w-[60ch]">{note}</p>
    </div>
  );
}

function Photo({ src, className = "", sizes = "30vw" }) {
  return (
    <div className={`relative overflow-hidden bg-burgundy ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className={`object-cover transition-transform duration-1000 ${EASE} group-hover:scale-105`}
      />
    </div>
  );
}

// ------------------------------------------------------------------ grids

// A: five equal tall photos in one row, label in the lower corner
function GridRow({ t }) {
  return (
    <div className={`${GUTTER} grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4`}>
      {TILES.map((tile) => (
        <Link key={tile.id} href={tile.href} className="group relative block">
          <Photo src={tile.image} className="h-[50vh] md:h-[70vh]" sizes="18vw" />
          <span className="absolute bottom-3 end-3 text-sm [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
            {t.nav[tile.id]}
          </span>
        </Link>
      ))}
    </div>
  );
}

function CaptionCard({ t, tile, frame }) {
  return (
    <Link href={tile.href} className="group block">
      <Photo src={tile.image} className={frame} />
      <h3 className="mt-4 text-2xl">{t.nav[tile.id]}</h3>
      <p className="mt-1 text-sm text-mist">{t.navGrid.items[tile.id]}</p>
    </Link>
  );
}

// B: three portraits above two landscapes, captions underneath
function GridThreeTwo({ t }) {
  const top = TILES.slice(0, 3);
  const bottom = TILES.slice(3);
  return (
    <div className={`${GUTTER} space-y-12`}>
      <div className="grid sm:grid-cols-3 gap-6">
        {top.map((tile) => (
          <CaptionCard key={tile.id} t={t} tile={tile} frame="aspect-[3/4]" />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        {bottom.map((tile) => (
          <CaptionCard key={tile.id} t={t} tile={tile} frame="aspect-[16/10]" />
        ))}
      </div>
    </div>
  );
}

// C: one large feature beside a two-by-two block
function GridFeature({ t }) {
  const [feature, ...rest] = TILES;
  return (
    <div className={`${GUTTER} grid md:grid-cols-2 gap-4 md:h-[80vh]`}>
      <Link href={feature.href} className="group relative block h-[50vh] md:h-full">
        <Photo src={feature.image} className="absolute inset-0" sizes="40vw" />
        <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/55 to-transparent">
          <h3 className="text-3xl md:text-4xl">{t.nav[feature.id]}</h3>
          <p className="mt-1 text-beige/80">{t.navGrid.items[feature.id]}</p>
        </div>
      </Link>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {rest.map((tile) => (
          <Link key={tile.id} href={tile.href} className="group relative block min-h-48">
            <Photo src={tile.image} className="absolute inset-0" sizes="20vw" />
            <span className="absolute bottom-4 start-4 text-lg [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
              {t.nav[tile.id]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// D: two rows of panels; the hovered panel widens within its row
function GridPanels({ t }) {
  const rows = [TILES.slice(0, 3), TILES.slice(3)];
  return (
    <div className={`${GUTTER} flex flex-col gap-2 md:h-[85vh]`}>
      {rows.map((row, r) => (
        <div key={r} className="flex flex-col md:flex-row gap-2 md:flex-1 md:min-h-0">
          {row.map((tile) => (
            <Link
              key={tile.id}
              href={tile.href}
              className={`group relative block h-[40vh] md:h-auto md:flex-1 md:hover:grow-[1.7] transition-[flex-grow] duration-700 ${EASE}`}
            >
              <Photo src={tile.image} className="absolute inset-0" sizes="40vw" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-linear-to-t from-black/55 to-transparent">
                <h3 className="text-3xl">{t.nav[tile.id]}</h3>
                <p className="mt-1 text-sm text-beige/80">{t.navGrid.items[tile.id]}</p>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------- footers

const MARK_W = 715.08;
const MARK_GAP = 60;
const LATIN_H = 135.55;
const ARABIC_H = 128.46;

// Both marks side by side; filled with a photo or with flat beige
function Wordmark({ id, photo }) {
  const width = MARK_W * 2 + MARK_GAP;
  const marks = (
    <>
      <g transform="translate(-182.44 -472.22)">
        <LatinMarkPaths />
      </g>
      <g transform={`translate(${MARK_W + MARK_GAP - 182.44} ${LATIN_H - ARABIC_H - 475.77})`}>
        <ArabicMarkPaths />
      </g>
    </>
  );
  return (
    <svg viewBox={`0 0 ${width} ${LATIN_H}`} role="img" aria-label="AJID عجيد" className="block w-full h-auto">
      {photo ? (
        <>
          <defs>
            <clipPath id={id}>{marks}</clipPath>
          </defs>
          <image
            href="/images/eladio-san-pedro.jpg"
            width={width}
            height={LATIN_H}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${id})`}
          />
        </>
      ) : (
        <g className="fill-beige">{marks}</g>
      )}
    </svg>
  );
}

// A: statement, meta row, rule, photo-filled wordmark (the reference)
function FooterStatement({ c, t }) {
  return (
    <div className={`${GUTTER} pt-10 pb-6`}>
      <p className="text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.08] max-w-[24ch]">{c.footer.statement}</p>
      <div className="mt-28 flex flex-col sm:flex-row justify-between gap-3 pb-4 border-b border-beige/80">
        <p>© 2026 {c.footer.rights}</p>
        <div className="flex gap-8">
          <span>{c.footer.cities}</span>
          <a href={`mailto:${t.contact.emailAddress}`} className="hover:text-mist">{c.footer.talk}</a>
        </div>
      </div>
      <div className="mt-4">
        <Wordmark id="fa" photo />
      </div>
    </div>
  );
}

// B: wordmark first, then link and contact columns, copyright last
function FooterColumns({ c, t }) {
  const links = TILES.map((tile) => [tile.href, t.nav[tile.id]]);
  return (
    <div className={`${GUTTER} pt-12 pb-8`}>
      <Wordmark id="fb" />
      <div className="mt-16 grid sm:grid-cols-3 gap-10">
        <ul className="space-y-2">
          {links.map(([href, label]) => (
            <li key={href}>
              <Link href={href} className="hover:text-mist">{label}</Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <a href={`mailto:${t.contact.emailAddress}`} className="block hover:text-mist">{t.contact.emailAddress}</a>
          <p className="text-beige/70">{c.footer.cities}</p>
        </div>
        <p className="text-beige/70 max-w-[34ch]">{c.footer.statement}</p>
      </div>
      <p className="mt-16 pt-5 border-t border-beige/20 text-sm text-mist">© 2026 {c.footer.rights}</p>
    </div>
  );
}

// C: a large email call to action, quiet details below, small wordmark
function FooterInvite({ c, t }) {
  return (
    <div className={`${GUTTER} pt-16 pb-8`}>
      <p className="text-mist">{c.footer.talk}</p>
      <a
        href={`mailto:${t.contact.emailAddress}`}
        className="mt-3 block text-[clamp(1.75rem,5vw,4.5rem)] leading-tight break-words hover:text-mist transition-colors"
      >
        {t.contact.emailAddress}
      </a>
      <div className="mt-16 grid sm:grid-cols-2 gap-8 pt-6 border-t border-beige/20">
        <p className="text-beige/75 max-w-[40ch]">{c.footer.statement}</p>
        <div className="sm:text-end space-y-1">
          <p>{c.footer.cities}</p>
          <p className="text-sm text-mist">© 2026 {c.footer.rights}</p>
        </div>
      </div>
      <div className="mt-12 w-full max-w-md opacity-90">
        <Wordmark id="fc" />
      </div>
    </div>
  );
}

export default function HomeOptions() {
  const { c } = useCopy();
  const { t } = useLanguage();

  const grids = [
    ["A", "One row of tall photos", "All five links side by side as equal tall photos, label small in the corner.", GridRow],
    ["B", "Three over two", "Three portrait photos, then two landscape ones, with the name and a line of text under each.", GridThreeTwo],
    ["C", "Feature and four", "About as one large photo, the other four in a two-by-two block beside it.", GridFeature],
    ["D", "Expanding panels", "Two rows of panels; the one you point at widens.", GridPanels],
  ];
  const footers = [
    ["A", "Statement and photo wordmark", "Large statement, a details row, a rule, then AJID عجيد cut out of the brick photo.", FooterStatement],
    ["B", "Wordmark and columns", "Solid wordmark first, then links, contact and statement in three columns.", FooterColumns],
    ["C", "Email invitation", "The email address as the main element, details beneath, a small wordmark to close.", FooterInvite],
  ];

  return (
    <LegacyPageShell>
      <div className={`${GUTTER} pt-24`}>
        <h1 className="text-[clamp(3rem,8vw,7rem)] leading-[0.95]">Home options</h1>
        <p className="mt-4 text-lg text-beige/75 max-w-[56ch]">
          Four grid layouts and three footer layouts. Each one leaves room for the navbar. Pick one of each, for example
          grid B and footer A.
        </p>
      </div>
      {grids.map(([letter, name, note, Variant]) => (
        <section key={`g${letter}`} className="pb-24 border-b border-beige/15">
          <Label kind="Grid" letter={letter} name={name} note={note} />
          <Variant t={t} />
        </section>
      ))}
      {footers.map(([letter, name, note, Variant]) => (
        <section key={`f${letter}`} className="border-b border-beige/15">
          <Label kind="Footer" letter={letter} name={name} note={note} />
          <Variant c={c} t={t} />
        </section>
      ))}
    </LegacyPageShell>
  );
}
