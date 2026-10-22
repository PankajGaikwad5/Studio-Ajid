"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import { ArabicMarkPaths, ARABIC_VIEWBOX } from "@/components/marks";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projectsIn } from "@/data/projects";
import { products } from "@/data/products";
import V3Menu from "./V3Menu";

// Alternative home, light direction: limestone paper, ink type, a louvre
// reveal as the one bold moment, arches as the frame, burgundy footer
const PAD = "px-5 md:px-8 lg:px-12";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const SLATS = 9;

function Statement({ c }) {
  return (
    <section className={`bg-paper text-ink ${PAD} py-28 md:py-44 text-center`}>
      <p className="mx-auto text-[clamp(2.25rem,4.8vw,4.5rem)] leading-[1.05] tracking-[-0.015em] max-w-[22ch]">
        {c.home2.statement}
      </p>
      <p className="mx-auto mt-8 text-lg leading-relaxed text-ink/70 max-w-[52ch]">{c.home2.body}</p>
    </section>
  );
}

// Featured project behind vertical slats that open, one after another, as the
// photo scrolls into view, like a screen being drawn back
function Louvre({ pick }) {
  const ref = useRef(null);
  const project = projectsIn("residential")[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(ref.current.querySelectorAll("[data-slat]"), { scaleX: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to("[data-slat]", {
        scaleX: 0,
        ease: "none",
        stagger: 0.06,
        scrollTrigger: { trigger: ref.current, start: "top 75%", end: "center 45%", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className={`bg-paper ${PAD} pb-28 md:pb-40`}>
      <Link ref={ref} href={`/residential/${project.slug}`} className="group relative block h-[85vh] overflow-hidden bg-walnut">
        <Image
          src={project.cover}
          alt={pick(project.title)}
          fill
          sizes="95vw"
          className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.03]`}
        />
        <div aria-hidden="true" className="absolute inset-0 flex">
          {Array.from({ length: SLATS }, (_, i) => (
            <span key={i} data-slat className={`flex-1 bg-paper ${i % 2 ? "origin-right" : "origin-left"}`} />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 bg-linear-to-t from-black/55 to-transparent text-paper">
          <p className="text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95]">{pick(project.title)}</p>
          <p className="mt-2 text-paper/80">
            {pick(project.location)}, {project.year}
          </p>
        </div>
      </Link>
    </section>
  );
}

// Three ways into the work, each in an arch
function Ways({ c, t }) {
  const ways = [
    { href: "/residential", label: t.nav.residential, image: projectsIn("residential")[1].cover, meta: c.projectsCount(projectsIn("residential").length) },
    { href: "/hospitality", label: t.nav.hospitality, image: projectsIn("hospitality")[0].cover, meta: c.projectsCount(projectsIn("hospitality").length) },
    { href: "/gallery", label: t.nav.gallery, image: "/images/hero/eladio-hero-bg.webp", meta: c.pieces(products.length) },
  ];
  return (
    <section className={`bg-paper text-ink ${PAD} pb-28 md:pb-40`}>
      <h2 className="text-center text-3xl md:text-4xl mb-12 md:mb-16">{c.home2.waysTitle}</h2>
      <div className="grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
        {ways.map((w, i) => (
          <Link key={w.href} href={w.href} className={`group block text-center ${i === 1 ? "md:mt-20" : ""}`}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-walnut">
              <Image
                src={w.image}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 90vw"
                className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.05]`}
              />
            </div>
            <p className="mt-5 text-2xl md:text-3xl">{w.label}</p>
            <p className="mt-1 text-sm text-walnut">{w.meta}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Sideways strip of cut-out pieces; scrolls natively, snaps to each piece
function Pieces({ c, pick }) {
  return (
    <section className="bg-[#e4d8c9] text-ink py-20 md:py-28">
      <div className={`${PAD} flex items-end justify-between gap-6 mb-10`}>
        <h2 className="text-3xl md:text-4xl">{c.home2.galleryTitle}</h2>
        <Link href="/gallery" className="underline underline-offset-[6px] decoration-ink/40 hover:decoration-ink">
          {c.home2.galleryLink}
        </Link>
      </div>
      <div className={`${PAD} flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin]`}>
        {products.map((p) => (
          <Link key={p.slug} href={`/gallery/${p.slug}`} className="group shrink-0 snap-start w-[70vw] sm:w-[40vw] lg:w-[24vw]">
            <div className="relative aspect-[4/5] bg-paper overflow-hidden">
              <Image
                src={p.images[0]}
                alt={pick(p.name)}
                fill
                sizes="(min-width: 1024px) 24vw, 70vw"
                className={`object-contain p-[14%] transition-transform duration-1000 ${EASE} group-hover:scale-[1.05]`}
              />
            </div>
            <p className="mt-3 text-lg">{pick(p.name)}</p>
            <p className="text-sm text-walnut">{pick(p.material)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Footer({ c, t }) {
  const [x, y, w, h] = ARABIC_VIEWBOX.split(" ").map(Number);
  return (
    <footer id="contact" className="bg-burgundy text-paper min-h-screen flex flex-col pb-6">
      <div className={`${PAD} pt-24 md:pt-32 text-center`}>
        <p className="text-paper/70 text-lg">{c.home2.talkLead}</p>
        <a
          href={`mailto:${t.contact.emailAddress}`}
          className="mt-4 inline-block text-[clamp(2.5rem,7vw,6.5rem)] leading-none tracking-[-0.02em] hover:text-beige transition-colors"
        >
          {c.footer.talk}
        </a>
        <p className="mt-4 text-paper/70">{t.contact.emailAddress}</p>
      </div>

      <div className="flex-1 min-h-24" />

      <div className={PAD}>
        <svg viewBox={ARABIC_VIEWBOX} role="img" aria-label="عجيد" className="block w-full h-auto">
          <defs>
            <clipPath id="v3-footer-mark">
              <ArabicMarkPaths />
            </clipPath>
          </defs>
          <image
            href="/images/hero/eladio-hero-bg.webp"
            x={x}
            y={y}
            width={w}
            height={h}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#v3-footer-mark)"
          />
        </svg>
        <div className="mt-5 pt-4 border-t border-paper/40 flex flex-col sm:flex-row justify-between gap-2 text-sm text-paper/80">
          <p>© 2026 {c.footer.rights}</p>
          <p>{c.footer.cities}</p>
        </div>
      </div>
    </footer>
  );
}

export default function V3Home() {
  const { c, pick } = useCopy();
  const { t } = useLanguage();

  return (
    <div className="bg-paper text-ink">
      <V3Menu />
      <main>
        <Hero />
        <Statement c={c} />
        <Louvre pick={pick} />
        <Ways c={c} t={t} />
        <Pieces c={c} pick={pick} />
      </main>
      <Footer c={c} t={t} />
    </div>
  );
}
