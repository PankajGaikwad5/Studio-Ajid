"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "@/components/SmoothScroll";
import { LatinMarkPaths, ArabicMarkPaths, LATIN_VIEWBOX, ARABIC_VIEWBOX } from "@/components/marks";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { INSTAGRAM_URL, STUDIO_MAP_URL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL } from "@/data/studio";
import { Railed } from "@/components/alts/shared";
import { PAD, RAIL, SECTION, PATTERN_FILL, TYPE } from "./layout";
import Reveal from "@/components/site/Reveal";

// v15's footer, shared by the home page and the inner pages. Per the client it
// is quiet and exclusive: no sales lines, only the essential contact details
// set small in four columns, a band of the brand pattern (no. 9) and the
// rights. Scrolling on past them uncovers the full logo beneath (the English
// and Arabic marks, stacked); when the scrolling stops, the page springs back
// up over it.
// The pattern file is drawn in the page's own beige, so it is used as a mask
// and filled with the faintest navy, a soft shadow of the ground.
// PATTERN picks how it is used: "fill" tiles it over the whole footer as a
// background, "band" runs it once above the rights.
// "none" (the user, 2026-10-28) leaves the footer without it.
const PATTERN = "none";
// Per the client, the footer sits on a slightly darker ground: the beige with a
// touch of the navy mixed in
const FOOTER_GROUND = "bg-[color-mix(in_srgb,var(--color-beige),var(--color-navy)_8%)]";
const PATTERN_MASK = "bg-navy/[0.07] [mask-image:url(/patterns/9-band.png)]";

const WORDS = {
  en: { studio: "The Studio", call: "Call or WhatsApp", write: "Write to us", follow: "Follow" },
  ar: { studio: "الاستوديو", call: "اتصال أو واتساب", write: "راسلنا", follow: "تابعنا" },
};

// Per the client the logo under the footer is the brand's beige on the Deep
// Navy ground (the guidelines' logo for navy). Set to false to fill it with
// the hero photograph on beige again.
const MARK_NAVY = true;

// One of the two marks, filled with the brand beige (or the hero photograph)
function Mark({ id, viewBox, Paths }) {
  const [x, y, w, h] = viewBox.split(" ").map(Number);
  return (
    <svg viewBox={viewBox} aria-hidden="true" className="block w-full h-auto">
      <defs>
        <clipPath id={id}>
          <Paths />
        </clipPath>
      </defs>
      {MARK_NAVY ? (
        <rect x={x} y={y} width={w} height={h} className="fill-beige" clipPath={`url(#${id})`} />
      ) : (
        <image href="/images/hero/eladio-hero-bg.webp" x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id})`} />
      )}
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
    <Railed as="footer" id="contact" rail={onPattern ? "max-md:hidden" : `${FOOTER_GROUND} max-md:hidden`} className={`${onPattern ? "" : FOOTER_GROUND} text-navy`}>
      {/* Tall enough that, at the end of the page, the docked menu (centred on
          the screen) sits wholly inside the footer */}
      <div className={`${SECTION} relative isolate pt-20 md:pt-28 pb-6 flex flex-col md:min-h-[calc(50svh+10rem)]`}>
        {/* Fill: the pattern repeats across and down behind everything */}
        {PATTERN === "fill" && !onPattern && <div aria-hidden="true" className={PATTERN_FILL} />}

        <Reveal as="dl" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt className={TYPE.label}>{label}</dt>
              <dd className={`mt-3 ${TYPE.body}`}>{value}</dd>
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
        {/* Without the pattern its place is kept as open space, so the footer
            keeps its height; it grows on tall screens to hold the menu */}
        {PATTERN !== "band" && <div aria-hidden="true" className="grow mt-20 md:mt-28 mb-6 min-h-24 md:min-h-36" />}
        {/* Runs the full width of the page, under the menu column too, so it lines
            up with the logo below (the column is always on the left) */}
        <div className="flex items-end justify-between gap-6 pb-4 text-xs border-b border-navy/20 md:-ml-56 lg:-ml-66">
          <p>© 2026 {c.footer.rights}</p>
          <Link href="/contact" className={link}>{t.nav.contact}</Link>
        </div>
      </div>
    </Railed>
    <LogoPeek />
    </>
  );
}

// The logo under the footer. It is real scroll space, so scrolling stays
// native and smooth: the footer slides up off the logo, which waits beneath,
// held in place (a fixed layer kept to this window by the clip-path) and rising
// a little as it is uncovered. A moment after the scrolling stops inside it,
// Lenis carries the page back up to the end of the footer with a small
// overshoot, so the footer springs back over the logo. Scrolling up from the
// logo eases to a stop at the footer's end: the first scroll only covers the
// logo, and the page moves on with the next. The window sits in the
// page, under the fixed menu, so the menu stays in front.
// Per the client only the English mark is shown; set to true to stack the
// Arabic one beneath it again
const SHOW_ARABIC_MARK = false;
// The window's height follows the width, so the logo can run the full width
// on every screen (the English mark stands 0.19 of its width tall, both marks
// together about 0.37)
const PEEK_H = SHOW_ARABIC_MARK ? "h-[calc(37vw+4rem)]" : "h-[calc(19vw+4rem)]";
const SETTLE_AFTER = 180;
// Ease out with a slight overshoot past the footer's end, then back
const springBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);

function LogoPeek() {
  const areaRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const area = areaRef.current;
    if (!area || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    // The logo rises the last stretch as it is uncovered
    const rise = gsap.fromTo(
      logoRef.current,
      { yPercent: 20 },
      { yPercent: 0, ease: "none", scrollTrigger: { trigger: area, start: "top bottom", end: "bottom bottom", scrub: true, invalidateOnRefresh: true } }
    );

    // Two behaviours, both eased through Lenis so nothing jumps:
    // - heading up out of the logo, the scroll is redirected to ease to a stop
    //   at the footer's end, so a fresh scroll is needed to move on;
    // - once the scrolling has fully come to rest inside the logo's window, the
    //   page springs back up to the footer's end.
    let timer;
    let release;
    let busy = false;
    const footerEnd = () => area.getBoundingClientRect().top + window.scrollY - window.innerHeight;
    const done = () => {
      busy = false;
      clearTimeout(release);
      // Check again in case the glide was cut short and the page still rests in the logo
      settle();
    };
    const glide = (target, options) => {
      const lenis = getLenis();
      if (!lenis) return;
      busy = true;
      // A glide that is interrupted never calls onComplete, which once left the
      // page stuck over the logo; this frees it whatever happens
      clearTimeout(release);
      release = setTimeout(done, options.duration * 1000 + 300);
      lenis.scrollTo(target, { ...options, lock: true, force: true, onComplete: done });
    };

    // Waits for the scrolling to come fully to rest inside the logo, then
    // springs back. Lenis eases out its last sub-pixel movement without firing
    // native scroll events, so while it is still moving this tries again rather
    // than giving up (which once left the logo half uncovered).
    const settle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const lenis = getLenis();
        if (!lenis || busy || lenis.animatedScroll <= footerEnd() + 1) return;
        if (lenis.isScrolling) return settle();
        glide(footerEnd(), { duration: 0.9, easing: springBack });
      }, SETTLE_AFTER);
    };

    // Lifts the fixed menu by however much of the logo window is showing, so
    // the menu goes up with the page rather than staying over the logo
    const root = document.documentElement;
    const lift = () => {
      const shown = Math.max(0, window.innerHeight - area.getBoundingClientRect().top);
      root.style.setProperty("--peek-lift", `${shown}px`);
    };
    lift();

    const onScroll = () => {
      lift();
      const lenis = getLenis();
      if (!lenis || busy) return;
      clearTimeout(timer);
      const end = footerEnd();
      if (lenis.animatedScroll <= end + 1) return;
      if (lenis.targetScroll < end - 1) {
        glide(end, { duration: 0.6, easing: (t) => 1 - Math.pow(1 - t, 3) });
        return;
      }
      settle();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      clearTimeout(release);
      window.removeEventListener("scroll", onScroll);
      root.style.removeProperty("--peek-lift");
      rise.scrollTrigger?.kill();
      rise.kill();
    };
  }, []);

  return (
    <div ref={areaRef} aria-hidden="true" className={`relative ${PEEK_H} [clip-path:inset(0)]`}>
      <div dir="ltr" className={`fixed inset-x-0 bottom-0 ${PEEK_H} flex ${MARK_NAVY ? "bg-navy" : "bg-beige"}`}>
        {/* The full width of the page within the side padding, on every screen */}
        <div className={`flex-1 min-w-0 ${PAD} flex items-center justify-center`}>
          <div ref={logoRef} className="w-full flex flex-col gap-4 md:gap-6 will-change-transform">
            <Mark id="v15-mark" viewBox={LATIN_VIEWBOX} Paths={LatinMarkPaths} />
            {SHOW_ARABIC_MARK && <Mark id="v15-mark-ar" viewBox={ARABIC_VIEWBOX} Paths={ArabicMarkPaths} />}
          </div>
        </div>
      </div>
      {/* The shade cast by the footer's edge as it lifts away; neutral, never blue */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-linear-to-b from-black/12 to-transparent" />
    </div>
  );
}
