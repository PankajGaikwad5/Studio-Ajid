"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LatinMarkPaths, ArabicMarkPaths, LATIN_VIEWBOX, ARABIC_VIEWBOX } from "@/components/marks";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { INSTAGRAM_URL, STUDIO_MAP_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from "@/data/studio";
import { Railed } from "@/components/alts/shared";
import { PAD, RAIL, SECTION, PATTERN_FILL } from "./layout";
import Reveal from "@/components/site/Reveal";

// v15's footer, shared by the home page and the inner pages. Per the client it
// is quiet and exclusive: no sales lines, only the essential contact details
// set small in four columns, a band of the brand pattern (no. 9) and the
// rights. Then, as in the client's reference, the page lifts away to uncover
// the full logo across the screen: the English and Arabic marks, stacked and
// linking home, held in place beneath and rising gently as they come into view.
// The pattern file is drawn in the page's own beige, so it is used as a mask
// and filled with the faintest navy, a soft shadow of the ground.
// PATTERN picks how it is used: "fill" tiles it over the whole footer as a
// background, "band" runs it once above the rights.
const PATTERN = "band";
const PATTERN_MASK = "bg-navy/[0.07] [mask-image:url(/patterns/9-band.png)]";

const WORDS = {
  en: { studio: "The Studio", call: "Call or WhatsApp", write: "Write to us", follow: "Follow" },
  ar: { studio: "الاستوديو", call: "اتصال أو واتساب", write: "راسلنا", follow: "تابعنا" },
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
    [
      w.call,
      <span key="call">
        <a href={PHONE_HREF} dir="ltr" className={link}>{PHONE_DISPLAY}</a>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${link} block w-fit`}>WhatsApp</a>
      </span>,
    ],
    [w.write, <a key="write" href={`mailto:${email}`} className={link}>{email}</a>],
    [w.follow, <a key="follow" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={link}>{t.nav.instagram}</a>],
  ];

  return (
    <>
    <Railed as="footer" id="contact" rail={onPattern ? "max-md:hidden" : RAIL} className={`${onPattern ? "" : "bg-beige"} text-navy`}>
      <div className={`${SECTION} relative isolate pt-20 md:pt-28 pb-6 flex flex-col`}>
        {/* Fill: the pattern repeats across and down behind everything */}
        {PATTERN === "fill" && !onPattern && <div aria-hidden="true" className={PATTERN_FILL} />}

        <Reveal as="dl" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 text-sm leading-[1.8]">
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
      </div>
    </Railed>
    <LogoReveal />
    </>
  );
}

// The last screen: a window the footer slides up from, with the logo fixed
// beneath it (the clip-path keeps the fixed layer to this window). The marks
// keep the rail clear on wider screens, so the docked menu never sits on them.
const REVEAL_H = "h-[70svh] md:h-svh";

function LogoReveal() {
  const areaRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      logoRef.current,
      { yPercent: 35 },
      {
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: areaRef.current, start: "top bottom", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={areaRef} className={`relative ${REVEAL_H} [clip-path:inset(0)]`}>
      <div dir="ltr" className={`fixed inset-x-0 bottom-0 ${REVEAL_H} flex bg-beige`}>
        <div aria-hidden="true" className="shrink-0 max-md:hidden md:w-56 lg:w-66" />
        <div className={`flex-1 min-w-0 ${PAD} flex items-center`}>
          <div ref={logoRef} className="w-full will-change-transform">
            {/* The two marks stacked, English above Arabic; together they link home */}
            <Link href="/" aria-label="AJID — عجيد" className="flex flex-col gap-4 md:gap-6">
              <Mark id="v15-mark" viewBox={LATIN_VIEWBOX} Paths={LatinMarkPaths} />
              <Mark id="v15-mark-ar" viewBox={ARABIC_VIEWBOX} Paths={ArabicMarkPaths} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
