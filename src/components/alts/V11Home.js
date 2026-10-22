"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { LatinMarkPaths, LATIN_VIEWBOX } from "@/components/marks";
import { Railed, Opening, Grain, DESTINATIONS } from "./shared";
import { useParallax } from "./useParallax";

// v11, "Nocturne": navy night warmed by burgundy and walnut glows, with grain.
// The links are huge outlined words with photo cards drifting over them; then
// a story section where photos hold still while three projects scroll past.
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const PAD = "px-6 md:px-10 lg:px-14";

// Lamplight on the night: burgundy from the upper right, walnut from below
const GLOW =
  "radial-gradient(110% 70% at 85% 0%, rgba(70,27,27,0.95) 0%, transparent 55%), radial-gradient(80% 60% at 0% 100%, rgba(88,47,15,0.55) 0%, transparent 60%), #061229";

// Where each word sits and where its photo card floats relative to it
const ROWS = [
  { id: "residential", align: "justify-start", card: "end-[6%] -top-[8%] w-[34vw] md:w-[19vw] aspect-[3/4]", speed: 0.6 },
  { id: "hospitality", align: "justify-end", card: "start-[4%] top-[4%] w-[38vw] md:w-[22vw] aspect-[4/3]", speed: -0.4 },
  { id: "about", align: "justify-center", card: "end-[10%] top-[10%] w-[28vw] md:w-[14vw] aspect-[4/5]", speed: 0.9 },
  { id: "gallery", align: "justify-start", card: "end-[22%] -top-[4%] w-[30vw] md:w-[16vw] aspect-square", speed: -0.6 },
  { id: "contact", align: "justify-end", card: "start-[12%] top-[6%] w-[32vw] md:w-[17vw] aspect-[3/4]", speed: 0.5 },
];
const byId = Object.fromEntries(DESTINATIONS.map((d) => [d.id, d]));

function WordIndex({ t }) {
  const ref = useRef(null);
  useParallax(ref);
  return (
    <section ref={ref} className="relative overflow-hidden text-beige" style={{ background: GLOW }}>
      <Grain />
      <Railed>
        <div className={`${PAD} pt-24 md:pt-32 pb-20`}>
          <p className="text-sm text-mist mb-6 md:mb-10">{t.navGrid.title}</p>
          {ROWS.map((r) => {
            const d = byId[r.id];
            return (
              <Link key={r.id} href={d.href} className={`group relative flex ${r.align} py-6 md:py-10 focus-visible:outline-none`}>
                {/* The word: drawn in outline, filled on hover or focus */}
                <span className="relative z-10 block">
                  <span
                    className={`block text-[clamp(3rem,10.5vw,10.5rem)] leading-[0.9] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_#e6cfc6] transition-colors duration-700 ${EASE} group-hover:text-beige group-focus-visible:text-beige`}
                  >
                    {t.nav[r.id]}
                  </span>
                  <span className="mt-3 flex items-center gap-3 text-sm text-mist">
                    <span className={`h-px w-6 bg-mist transition-[width] duration-700 ${EASE} group-hover:w-14`} />
                    {t.navGrid.items[r.id]}
                  </span>
                </span>
                {/* Photo card drifting over the word at its own speed */}
                <span data-speed={r.speed} className={`absolute ${r.card} z-0 md:z-20 pointer-events-none`}>
                  <span
                    className={`relative block w-full h-full overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] opacity-55 md:opacity-80 transition-[opacity,transform] duration-700 ${EASE} group-hover:opacity-100 group-hover:scale-[1.06]`}
                  >
                    <Image src={d.image} alt="" fill sizes="22vw" className="object-cover" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </Railed>
    </section>
  );
}

// Photos hold still on one side while three projects scroll past on the other
function Story({ c, pick }) {
  const chosen = [projects[0], projects[6], projects[3]];
  const [active, setActive] = useState(0);
  const blocks = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.index))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    blocks.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Railed rail="bg-navy" className="bg-beige text-navy">
      <div className="grid md:grid-cols-2">
        <div className="hidden md:block">
          <div className="sticky top-0 h-screen overflow-hidden bg-navy">
            {chosen.map((p, i) => (
              <Image
                key={p.slug}
                src={p.cover}
                alt={pick(p.title)}
                fill
                sizes="45vw"
                className={`object-cover transition-[opacity,transform] duration-[1200ms] ${EASE} ${i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.06]"}`}
              />
            ))}
            <div className="absolute bottom-6 start-6 flex gap-2" aria-hidden="true">
              {chosen.map((p, i) => (
                <span key={p.slug} className={`h-px transition-[width,background-color] duration-700 ${i === active ? "w-12 bg-beige" : "w-6 bg-beige/40"}`} />
              ))}
            </div>
          </div>
        </div>
        <div>
          {chosen.map((p, i) => (
            <article
              key={p.slug}
              ref={(el) => (blocks.current[i] = el)}
              data-index={i}
              className={`${PAD} min-h-[80vh] md:min-h-screen flex flex-col justify-center py-16 border-b border-navy/15 last:border-b-0`}
            >
              <div className="md:hidden relative aspect-[4/3] mb-8 overflow-hidden">
                <Image src={p.cover} alt={pick(p.title)} fill sizes="90vw" className="object-cover" />
              </div>
              <p className="text-sm text-walnut">
                {pick(p.location)}, {p.year}
              </p>
              <h3 className="mt-3 text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-[-0.02em]">{pick(p.title)}</h3>
              <p className="mt-6 text-lg leading-relaxed text-navy/75 max-w-[42ch]">{pick(p.body)[0]}</p>
              <Link
                href={`/${p.category}/${p.slug}`}
                className="mt-8 self-start text-burgundy underline underline-offset-[7px] decoration-burgundy/40 hover:decoration-burgundy"
              >
                {c.viewProject}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Railed>
  );
}

function Footer({ c, t }) {
  const [x, y, w, h] = LATIN_VIEWBOX.split(" ").map(Number);
  return (
    <footer id="contact" className="relative overflow-hidden text-beige" style={{ background: GLOW }}>
      <Grain />
      <Railed as="div">
        <div className={`${PAD} pt-24 md:pt-32 pb-8 min-h-screen flex flex-col`}>
          <p className="text-mist">{c.home2.talkLead}</p>
          <a
            href={`mailto:${t.contact.emailAddress}`}
            className={`mt-3 self-start text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_#e6cfc6] transition-colors duration-700 ${EASE} hover:text-beige`}
          >
            {c.footer.talk}
          </a>
          <p className="mt-4 text-mist">{t.contact.emailAddress}</p>
          <div className="flex-1 min-h-16" />
          <div className="flex flex-col sm:flex-row justify-between gap-2 pb-4 border-b border-beige/40 text-sm text-beige/80">
            <p>© 2026 {c.footer.rights}</p>
            <p>{c.footer.cities}</p>
          </div>
          <svg viewBox={LATIN_VIEWBOX} role="img" aria-label="AJID" className="mt-4 block w-full h-auto">
            <defs>
              <clipPath id="v11-mark">
                <LatinMarkPaths />
              </clipPath>
            </defs>
            <image href="/images/hero/eladio-hero-bg.webp" x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath="url(#v11-mark)" />
          </svg>
        </div>
      </Railed>
    </footer>
  );
}

export default function V11Home() {
  const { c, pick } = useCopy();
  const { t } = useLanguage();
  return (
    <div className="bg-navy">
      <Opening />
      <main>
        <WordIndex t={t} />
        <Story c={c} pick={pick} />
      </main>
      <Footer c={c} t={t} />
    </div>
  );
}
