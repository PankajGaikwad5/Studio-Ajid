"use client";

import Link from "next/link";
import { LatinMarkPaths, ArabicMarkPaths, LATIN_VIEWBOX, ARABIC_VIEWBOX } from "@/components/marks";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { INSTAGRAM_URL, STUDIO_MAP_URL } from "@/data/studio";
import { Railed } from "@/components/alts/shared";
import { RAIL, SECTION, PATTERN_FILL } from "./layout";
import Reveal from "@/components/site/Reveal";

// v15's footer, shared by the home page and the inner pages. Per the client it
// is quiet and exclusive: no sales lines, only the essential contact details
// set small in three columns, a band of the brand pattern (no. 9), the rights,
// and the English and Arabic marks stacked one above the other, linking home.
// The pattern file is drawn in the page's own beige, so it is used as a mask
// and filled with the faintest navy, a soft shadow of the ground.
// PATTERN picks how it is used: "fill" tiles it over the whole footer as a
// background, "band" runs it once above the rights.
const PATTERN = "band";
const PATTERN_MASK = "bg-navy/[0.07] [mask-image:url(/patterns/9-band.png)]";

const WORDS = {
  en: { studio: "The Studio", write: "Write to us", follow: "Follow" },
  ar: { studio: "الاستوديو", write: "راسلنا", follow: "تابعنا" },
};

// One of the two marks, filled with the hero photograph
function Mark({ id, viewBox, Paths }) {
  const [x, y, w, h] = viewBox.split(" ").map(Number);
  return (
    <svg viewBox={viewBox} aria-hidden="true" className="block w-full h-auto">
      <defs>
        <clipPath id={id}>
          <Paths />
        </clipPath>
      </defs>
      <image href="/images/hero/eladio-hero-bg.webp" x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id})`} />
    </svg>
  );
}

// `onPattern`: the page behind already carries the pattern (the home page), so
// the footer drops its own beige and fill and lets it show through
export default function V15Footer({ onPattern = false }) {
  const { c, lang } = useCopy();
  const { t } = useLanguage();
  const w = WORDS[lang];
  const email = t.contact.emailAddress;
  const link = "u-line";

  const details = [
    [
      w.studio,
      <span key="studio">
        <a href={STUDIO_MAP_URL} target="_blank" rel="noopener noreferrer" className={link}>{c.home2.studioPlace}</a>
        <span className="block">{c.home2.studioNote}</span>
      </span>,
    ],
    [w.write, <a key="write" href={`mailto:${email}`} className={link}>{email}</a>],
    [w.follow, <a key="follow" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={link}>{t.nav.instagram}</a>],
  ];

  return (
    <Railed as="footer" id="contact" rail={onPattern ? "max-md:hidden" : RAIL} className={`${onPattern ? "" : "bg-beige"} text-navy`}>
      <div className={`${SECTION} relative isolate pt-20 md:pt-28 pb-6 flex flex-col`}>
        {/* Fill: the pattern repeats across and down behind everything */}
        {PATTERN === "fill" && !onPattern && <div aria-hidden="true" className={PATTERN_FILL} />}

        <Reveal as="dl" className="grid sm:grid-cols-3 gap-8 sm:gap-6 text-sm leading-[1.8]">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs">{label}</dt>
              <dd className="mt-2">{value}</dd>
            </div>
          ))}
        </Reveal>

        {/* Band: the pattern fills the pause above the rights, edge to edge */}
        {PATTERN === "band" && (
          <Reveal
            aria-hidden="true"
            delay={200}
            className={`-mx-6 md:-mx-10 lg:-mx-14 mt-20 md:mt-28 mb-6 h-24 md:h-36 ${PATTERN_MASK} [mask-repeat:repeat-x] [mask-position:left_bottom] [mask-size:auto_100%]`}
          />
        )}
        <div className={`flex items-end justify-between gap-6 pb-4 text-xs border-b border-navy/20 ${PATTERN === "band" ? "" : "mt-20 md:mt-28"}`}>
          <p>© 2026 {c.footer.rights}</p>
          <Link href="/contact" className={link}>{t.nav.contact}</Link>
        </div>

        {/* The two marks stacked, English above Arabic; together they link home */}
        <Reveal className="mt-6 md:mt-8">
          <Link href="/" aria-label="AJID — عجيد" className="flex flex-col gap-4 md:gap-6">
            <Mark id="v15-mark" viewBox={LATIN_VIEWBOX} Paths={LatinMarkPaths} />
            <Mark id="v15-mark-ar" viewBox={ARABIC_VIEWBOX} Paths={ArabicMarkPaths} />
          </Link>
        </Reveal>
      </div>
    </Railed>
  );
}
