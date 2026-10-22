"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import { ArabicMarkPaths, ARABIC_VIEWBOX } from "@/components/marks";
import { Railed, Opening, Grain, DESTINATIONS } from "./shared";
import { useParallax } from "./useParallax";

// v12, "Porcelain": stone beige with mist and navy, like blue-and-white
// porcelain in a majlis, burgundy the single accent. The links are an
// editorial collage around a giant outlined word, layered at different depths.
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const PAD = "px-6 md:px-10 lg:px-14";

// Collage placement (desktop): position, size, depth and stacking order
const PIECES = {
  residential: { pos: "md:left-[2%] md:top-[6%] md:w-[34%]", frame: "aspect-[4/5]", speed: 0.5, z: "md:z-20" },
  hospitality: { pos: "md:right-[3%] md:top-[0%] md:w-[30%]", frame: "aspect-[3/4]", speed: -0.3, z: "md:z-10" },
  about: { pos: "md:left-[38%] md:top-[30%] md:w-[22%]", frame: "aspect-square", speed: 1.1, z: "md:z-30" },
  gallery: { pos: "md:left-[10%] md:top-[60%] md:w-[26%]", frame: "aspect-[4/3]", speed: -0.6, z: "md:z-10" },
  contact: { pos: "md:right-[8%] md:top-[56%] md:w-[24%]", frame: "aspect-[4/5]", speed: 0.8, z: "md:z-20" },
};

function Collage({ t }) {
  const ref = useRef(null);
  useParallax(ref);
  return (
    <Railed rail="bg-navy" className="bg-beige text-navy overflow-hidden">
      <div ref={ref} className={`relative ${PAD} pt-20 md:pt-0 pb-20 md:pb-0 md:h-[175vh]`}>
        {/* Giant outlined word behind the collage */}
        <div aria-hidden="true" className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <span
            data-speed="-0.25"
            className="block text-[17vw] leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_#748796] whitespace-nowrap"
          >
            {t.navGrid.title}
          </span>
        </div>
        <h2 className="md:sr-only text-3xl mb-10">{t.navGrid.title}</h2>

        <div className="grid sm:grid-cols-2 gap-10 md:block">
          {DESTINATIONS.map((d) => {
            const p = PIECES[d.id];
            return (
              <Link
                key={d.id}
                href={d.href}
                data-speed={p.speed}
                className={`group block md:absolute ${p.pos} ${p.z} hover:z-40 focus-visible:z-40 focus-visible:outline-none`}
              >
                <div
                  className={`relative ${p.frame} overflow-hidden bg-navy shadow-[0_30px_50px_-25px_rgba(6,18,41,0.55)] transition-transform duration-700 ${EASE} group-hover:-translate-y-2 group-focus-visible:ring-2 group-focus-visible:ring-burgundy`}
                >
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 32vw, 90vw"
                    className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.05]`}
                  />
                </div>
                {/* Caption tag, like a porcelain maker's mark */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="w-2 h-2 rounded-full bg-burgundy translate-y-[-2px]" aria-hidden="true" />
                  <span className="text-xl md:text-2xl leading-none">{t.nav[d.id]}</span>
                </div>
                <p className="mt-1 ps-5 text-sm text-navy/65 max-w-[30ch]">{t.navGrid.items[d.id]}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </Railed>
  );
}

// Product cut-outs floating with soft shadows on a mist band
function Cabinet({ c, pick }) {
  const ref = useRef(null);
  useParallax(ref);
  const pieces = products.slice(0, 6);
  return (
    <Railed rail="bg-navy" className="relative bg-mist text-navy overflow-hidden">
      <Grain opacity={0.05} />
      <div ref={ref} className={`relative ${PAD} py-24 md:py-32`}>
        <div className="flex items-end justify-between gap-6 mb-16">
          <h2 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-none tracking-[-0.015em]">{c.home2.galleryTitle}</h2>
          <Link href="/gallery" className="text-navy underline underline-offset-[7px] decoration-navy/40 hover:decoration-navy">
            {c.home2.galleryLink}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {pieces.map((p, i) => (
            <Link key={p.slug} href={`/gallery/${p.slug}`} data-speed={[0.3, -0.2, 0.5][i % 3]} className="group block">
              <div className="relative aspect-square">
                <div aria-hidden="true" className="absolute bottom-[4%] left-1/2 -translate-x-1/2 w-[60%] h-[8%] rounded-[50%] bg-navy/30 blur-md transition-[width,opacity] duration-700 group-hover:w-[50%] group-hover:opacity-60" />
                <Image
                  src={p.images[0]}
                  alt={pick(p.name)}
                  fill
                  sizes="(min-width: 768px) 26vw, 45vw"
                  className={`object-contain p-[10%] transition-transform duration-1000 ${EASE} group-hover:-translate-y-3`}
                />
              </div>
              <p className="mt-2 text-lg">{pick(p.name)}</p>
              <p className="text-sm text-navy/65">{pick(p.material)}</p>
            </Link>
          ))}
        </div>
      </div>
    </Railed>
  );
}

function Footer({ c, t }) {
  return (
    <Railed as="footer" id="contact" rail="bg-navy" className="bg-navy text-beige">
      <div className={`${PAD} pt-24 md:pt-32 pb-8 min-h-screen flex flex-col`}>
        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <p className="text-mist">{c.home2.talkLead}</p>
            <a href={`mailto:${t.contact.emailAddress}`} className="mt-3 inline-block text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.03em] hover:text-mist transition-colors">
              {c.footer.talk}
            </a>
          </div>
          <div className="md:col-span-5 text-mist space-y-1 md:text-end">
            <p className="text-beige">{t.contact.emailAddress}</p>
            <p>{c.footer.cities}</p>
          </div>
        </div>
        <div className="flex-1 min-h-16" />
        <svg viewBox={ARABIC_VIEWBOX} role="img" aria-label="عجيد" className="block w-full h-auto fill-beige">
          <ArabicMarkPaths />
        </svg>
        <div className="mt-6 pt-4 border-t border-beige/25 flex justify-between gap-4 text-sm text-mist">
          <p>© 2026 {c.footer.rights}</p>
          <span className="w-2 h-2 rounded-full bg-burgundy self-center" aria-hidden="true" />
        </div>
      </div>
    </Railed>
  );
}

export default function V12Home() {
  const { c, pick } = useCopy();
  const { t } = useLanguage();
  return (
    <div className="bg-beige">
      <Opening />
      <main>
        <Collage t={t} />
        <Cabinet c={c} pick={pick} />
      </main>
      <Footer c={c} t={t} />
    </div>
  );
}
