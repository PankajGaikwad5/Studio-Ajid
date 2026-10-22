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
import { projects, projectsIn } from "@/data/projects";
import { products } from "@/data/products";
import V2Nav from "./V2Nav";

// Alternative home: same hero, everything after it rebuilt on the hero's own
// colours (ink ground, paper cream, one burgundy band)
const PAD = "px-5 md:px-8 lg:px-12";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Thin rule with a centre tick and diamond, closing a section (from the reference)
function EndMark({ tone = "bg-paper" }) {
  return (
    <div className="relative" aria-hidden="true">
      <div data-rule className={`h-px ${tone} opacity-70 origin-center`} />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center">
        <span className={`w-px h-7 ${tone} opacity-70`} />
        <span className={`-mt-[5px] w-2.5 h-2.5 rotate-45 ${tone}`} />
      </div>
    </div>
  );
}

function Statement({ c }) {
  return (
    <section className={`bg-paper text-ink ${PAD} py-24 md:py-36`}>
      <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-end">
        <p className="md:col-span-8 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.04] tracking-[-0.015em] max-w-[20ch]">
          {c.home2.statement}
        </p>
        <p className="md:col-span-4 text-lg leading-relaxed text-ink/75 max-w-[38ch]">{c.home2.body}</p>
      </div>
    </section>
  );
}

// Three ways into the work: tall equal photos, caption in the lower corner
function Ways({ c, t }) {
  const sectionRef = useRef(null);
  const ways = [
    { href: "/residential", label: t.nav.residential, image: projectsIn("residential")[0].cover, count: c.projectsCount(projectsIn("residential").length) },
    { href: "/hospitality", label: t.nav.hospitality, image: projectsIn("hospitality")[1].cover, count: c.projectsCount(projectsIn("hospitality").length) },
    { href: "/gallery", label: t.nav.gallery, image: "/images/hero/eladio-hero-bg.webp", count: c.pieces(products.length) },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true } })
        .fromTo(
          "[data-way]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut", stagger: 0.12 }
        )
        .from("[data-rule]", { scaleX: 0, duration: 1.1, ease: "power3.inOut" }, "-=0.6");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`bg-ink text-paper ${PAD} pt-20 md:pt-28 pb-16`}>
      <h2 className="text-3xl md:text-4xl mb-10 md:mb-12">{c.home2.waysTitle}</h2>
      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {ways.map((w) => (
          <Link key={w.href} href={w.href} className="group block">
            <div data-way className="relative h-[62vh] md:h-[78vh] overflow-hidden bg-walnut">
              <Image
                src={w.image}
                alt=""
                fill
                sizes="(min-width: 768px) 32vw, 90vw"
                className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.04]`}
              />
              <span className="absolute bottom-4 end-4 text-sm text-paper/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                {w.count}
              </span>
            </div>
            <p className={`mt-4 text-2xl transition-transform duration-500 ${EASE} group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5`}>
              {w.label}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-14">
        <EndMark />
      </div>
    </section>
  );
}

// Two from each category, landscape, on the burgundy band
function Recent({ c, pick }) {
  const recent = [...projects].sort((a, b) => b.year - a.year).slice(0, 4);
  return (
    <section className={`bg-burgundy text-paper ${PAD} py-24 md:py-32`}>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-12 md:mb-16">
        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.015em]">{c.home2.recentTitle}</h2>
        <div className="flex gap-6 text-paper/80">
          <Link href="/residential" className="underline underline-offset-[6px] decoration-paper/40 hover:decoration-paper">
            {c.home2.allResidential}
          </Link>
          <Link href="/hospitality" className="underline underline-offset-[6px] decoration-paper/40 hover:decoration-paper">
            {c.home2.allHospitality}
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-14 md:gap-y-20">
        {recent.map((p, i) => (
          <Link key={p.slug} href={`/${p.category}/${p.slug}`} className={`group block ${i % 2 === 1 ? "md:mt-24" : ""}`}>
            <div className="relative aspect-3/2 overflow-hidden bg-ink">
              <Image
                src={p.cover}
                alt={pick(p.title)}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.04]`}
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-6">
              <h3 className="text-2xl md:text-3xl">{pick(p.title)}</h3>
              <p className="shrink-0 text-sm text-paper/65">
                {pick(p.location)}, <span className="tabular-nums">{p.year}</span>
              </p>
            </div>
            <p className="mt-2 text-paper/70 max-w-[48ch]">{pick(p.summary)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Four cut-out pieces on paper tiles, edge to edge
function FromGallery({ c, pick }) {
  const pieces = products.slice(0, 4);
  return (
    <section className="bg-paper text-ink">
      <div className={`${PAD} pt-20 md:pt-28 pb-5 flex items-end justify-between gap-6 border-b border-ink`}>
        <h2 className="text-3xl md:text-4xl">{c.home2.galleryTitle}</h2>
        <Link href="/gallery" className="text-base underline underline-offset-[6px] decoration-ink/40 hover:decoration-ink">
          {c.home2.galleryLink}
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {pieces.map((p) => (
          <Link
            key={p.slug}
            href={`/gallery/${p.slug}`}
            className="group relative block aspect-square overflow-hidden border-e border-b border-ink/10 last:border-e-0"
          >
            <Image
              src={p.images[0]}
              alt={pick(p.name)}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className={`object-contain p-[16%] transition-transform duration-1000 ${EASE} group-hover:scale-[1.05]`}
            />
            <h3 className="absolute bottom-4 start-4 end-4 text-sm uppercase">{pick(p.name)}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Footer({ c, t }) {
  const [x, y, w, h] = LATIN_VIEWBOX.split(" ").map(Number);
  return (
    <footer id="contact" className="bg-ink text-paper min-h-screen flex flex-col pb-6">
      <div className={`${PAD} pt-24 md:pt-32`}>
        <p className="text-paper/70 text-lg">{c.home2.talkLead}</p>
        <a
          href={`mailto:${t.contact.emailAddress}`}
          className="mt-3 inline-block text-[clamp(2.25rem,6.5vw,6rem)] leading-[1] tracking-[-0.02em] hover:text-beige transition-colors"
        >
          {c.footer.talk}
        </a>
        <p className="mt-4 text-paper/70">{t.contact.emailAddress}</p>
      </div>

      <div className="flex-1 min-h-24" />

      <div className={PAD}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-paper/80">
          <p>© 2026 {c.footer.rights}</p>
          <p>{c.footer.cities}</p>
        </div>
        <svg viewBox={LATIN_VIEWBOX} role="img" aria-label="AJID" className="mt-4 block w-full h-auto">
          <defs>
            <clipPath id="v2-footer-mark">
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
            clipPath="url(#v2-footer-mark)"
          />
        </svg>
      </div>
    </footer>
  );
}

export default function V2Home() {
  const { c, pick } = useCopy();
  const { t } = useLanguage();

  return (
    <div className="bg-ink text-paper">
      <V2Nav active="home" />
      <main>
        <Hero />
        <Statement c={c} />
        <Ways c={c} t={t} />
        <Recent c={c} pick={pick} />
        <FromGallery c={c} pick={pick} />
      </main>
      <Footer c={c} t={t} />
    </div>
  );
}
