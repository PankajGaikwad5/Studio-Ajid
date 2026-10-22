"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import { LatinMarkPaths, LATIN_VIEWBOX } from "@/components/marks";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projectsIn } from "@/data/projects";
import { products } from "@/data/products";

// "A day in the courtyard": after the hero the page passes from dawn to night
// as it scrolls. The ground colour and type colour follow the hour, and a
// courtyard arch casts a long shadow that swings across like the sun moving.
const PAD = "ps-5 md:ps-10 lg:ps-14 pe-16 md:pe-24";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Ground and ink for each hour, in scroll order
const HOURS = [
  { bg: "#e9d6c6", fg: "#140d0a" }, // dawn
  { bg: "#f4eee7", fg: "#140d0a" }, // noon
  { bg: "#dcc3a2", fg: "#140d0a" }, // afternoon
  { bg: "#582f0f", fg: "#ede3d6" }, // dusk
  { bg: "#140d0a", fg: "#ede3d6" }, // night
];

function Hour({ time, title, children }) {
  return (
    <section className={`relative ${PAD} py-24 md:py-36`}>
      <div className="flex items-baseline gap-5 mb-10 md:mb-14">
        <span className="text-sm tabular-nums opacity-60">{time}</span>
        <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.015em]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ProjectPair({ list, pick }) {
  return (
    <div className="grid md:grid-cols-12 gap-8 md:gap-6 items-end">
      {list.map((p, i) => (
        <Link
          key={p.slug}
          href={`/${p.category}/${p.slug}`}
          className={`group block ${i === 0 ? "md:col-span-7" : "md:col-span-5 md:mb-24"}`}
        >
          <div className={`relative overflow-hidden ${i === 0 ? "aspect-4/3" : "aspect-3/4"}`}>
            <Image
              src={p.cover}
              alt={pick(p.title)}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.04]`}
            />
          </div>
          <div className="mt-4 flex items-baseline justify-between gap-4">
            <h3 className="text-2xl md:text-3xl">{pick(p.title)}</h3>
            <p className="text-sm opacity-65 shrink-0">
              {pick(p.location)}, {p.year}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// Thin vertical menu on the right edge; difference blending keeps it legible
// over the dark hero and every hour of the page
function SideMenu({ t }) {
  const items = [
    ["/v4", t.nav.home],
    ["/residential", t.nav.residential],
    ["/hospitality", t.nav.hospitality],
    ["/gallery", t.nav.gallery],
    ["#contact", t.nav.contact],
  ];
  return (
    <nav className="fixed top-1/2 -translate-y-1/2 right-3 md:right-6 z-50 mix-blend-difference text-white">
      <ul className="flex flex-col items-center gap-6 [writing-mode:vertical-rl] text-[13px] md:text-sm">
        {items.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="opacity-80 hover:opacity-100 transition-opacity">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function V4Home() {
  const { c, pick } = useCopy();
  const { t } = useLanguage();
  const dayRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const day = dayRef.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // The hours: ground and ink colours step through the day over the page
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: day, start: "top bottom", end: "bottom bottom", scrub: true },
      });
      HOURS.slice(1).forEach((h) => tl.to(day, { "--day-bg": h.bg, "--day-fg": h.fg, duration: 1 }));

      // The sun: the arch's shadow swings from long-left to long-right and
      // fades out at night
      if (!reduced) {
        gsap.fromTo(
          shadowRef.current,
          { skewX: -38, xPercent: -30, opacity: 0.16 },
          {
            skewX: 38,
            xPercent: 30,
            opacity: 0,
            ease: "none",
            scrollTrigger: { trigger: day, start: "top bottom", end: "bottom bottom", scrub: true },
          }
        );
      }
    }, day);
    return () => ctx.revert();
  }, []);

  const [x, y, w, h] = LATIN_VIEWBOX.split(" ").map(Number);

  return (
    <div className="bg-ink">
      <SideMenu t={t} />
      <Hero />

      <div
        ref={dayRef}
        className="relative overflow-x-clip"
        style={{ "--day-bg": HOURS[0].bg, "--day-fg": HOURS[0].fg, backgroundColor: "var(--day-bg)", color: "var(--day-fg)" }}
      >
        {/* The shadow of a courtyard arch, kept to the viewport as the day scrolls */}
        <div className="pointer-events-none sticky top-0 h-screen -mb-[100vh] z-0" aria-hidden="true">
          <div ref={shadowRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[46vw] h-[120vh] origin-bottom">
            <div className="absolute inset-0 rounded-t-full bg-black blur-[2px]" />
          </div>
        </div>

        <div className="relative z-10">
          <Hour time="06:10" title={c.home2.statement}>
            <p className="text-lg leading-relaxed opacity-75 max-w-[52ch]">{c.home2.body}</p>
          </Hour>

          <Hour time="12:00" title={t.nav.residential}>
            <ProjectPair list={projectsIn("residential").slice(0, 2)} pick={pick} />
            <Link href="/residential" className="inline-block mt-10 underline underline-offset-[6px] decoration-current/40">
              {c.home2.allResidential}
            </Link>
          </Hour>

          <Hour time="15:40" title={t.nav.hospitality}>
            <ProjectPair list={projectsIn("hospitality").slice(0, 2)} pick={pick} />
            <Link href="/hospitality" className="inline-block mt-10 underline underline-offset-[6px] decoration-current/40">
              {c.home2.allHospitality}
            </Link>
          </Hour>

          <Hour time="18:25" title={c.home2.galleryTitle}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.slice(0, 4).map((p) => (
                <Link key={p.slug} href={`/gallery/${p.slug}`} className="group block">
                  <div className="relative aspect-square">
                    <Image
                      src={p.images[0]}
                      alt={pick(p.name)}
                      fill
                      sizes="(min-width: 768px) 20vw, 45vw"
                      className={`object-contain transition-transform duration-1000 ${EASE} group-hover:scale-[1.06] drop-shadow-[0_24px_20px_rgba(0,0,0,0.35)]`}
                    />
                  </div>
                  <p className="mt-3">{pick(p.name)}</p>
                </Link>
              ))}
            </div>
          </Hour>

          <footer id="contact" className={`${PAD} pt-24 md:pt-36 pb-6 min-h-screen flex flex-col`}>
            <div className="flex items-baseline gap-5">
              <span className="text-sm tabular-nums opacity-60">21:30</span>
              <p className="text-lg opacity-75">{c.home2.talkLead}</p>
            </div>
            <a
              href={`mailto:${t.contact.emailAddress}`}
              className="mt-4 self-start text-[clamp(2.5rem,7vw,6.5rem)] leading-none tracking-[-0.02em] hover:opacity-70 transition-opacity"
            >
              {c.footer.talk}
            </a>
            <p className="mt-4 opacity-70">{t.contact.emailAddress}</p>
            <div className="flex-1 min-h-24" />
            <div className="flex flex-col sm:flex-row justify-between gap-2 pb-4 border-b border-current/60 text-sm">
              <p>© 2026 {c.footer.rights}</p>
              <p>{c.footer.cities}</p>
            </div>
            <svg viewBox={LATIN_VIEWBOX} role="img" aria-label="AJID" className="mt-4 block w-full h-auto">
              <defs>
                <clipPath id="v4-mark">
                  <LatinMarkPaths />
                </clipPath>
              </defs>
              <image
                href="/images/hero/eladio-hero-bg.webp"
                x={x}
                y={y}
                width={w}
                height={h}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#v4-mark)"
              />
            </svg>
          </footer>
        </div>
      </div>
    </div>
  );
}
