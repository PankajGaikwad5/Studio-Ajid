"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { LatinMarkPaths, LATIN_VIEWBOX } from "@/components/marks";
import { Railed, Opening, DESTINATIONS } from "./shared";

// v7, "Oxblood evening": deep oxblood ground, bone type, a soft brass accent.
// The links section is five tall strips; the one you point at opens wide.
const OX = "bg-[#2a1010]";
const OX_DEEP = "bg-[#1d0b0b]";
const BONE = "text-[#efe4d8]";
const BRASS = "text-[#c8a27c]";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const PAD = "pe-5 md:pe-8 lg:pe-12";

function Strips({ t }) {
  const [open, setOpen] = useState(1);
  return (
    <Railed className={`${OX} ${BONE}`}>
      <div className={`${PAD} pt-20 md:pt-28 pb-20`}>
        <div className="flex items-baseline justify-between gap-6 mb-10">
          <h2 className="text-[clamp(2.25rem,4.5vw,4rem)] leading-none tracking-[-0.015em]">{t.navGrid.title}</h2>
          <p className={`text-sm ${BRASS}`}>Studio Ajid</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:h-[78vh]">
          {DESTINATIONS.map((d, i) => {
            const isOpen = open === i;
            return (
              <Link
                key={d.id}
                href={d.href}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                className={`group relative block overflow-hidden h-[38vh] md:h-auto transition-[flex-grow] duration-900 ${EASE} md:min-w-16 ${
                  isOpen ? "md:grow-[5]" : "md:grow"
                } md:basis-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a27c]`}
              >
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 90vw"
                  className={`object-cover transition-[transform,filter] duration-1400 ${EASE} ${isOpen ? "scale-100 brightness-90" : "scale-110 brightness-50 saturate-50"}`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1d0b0b]/85 via-transparent to-transparent" />
                {/* Collapsed: title runs up the strip */}
                <span
                  className={`hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 [writing-mode:vertical-rl] rotate-180 text-lg whitespace-nowrap transition-opacity duration-500 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {t.nav[d.id]}
                </span>
                {/* Open: title and description across the bottom */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 md:p-8 transition-[opacity,transform] duration-700 ${EASE} ${
                    isOpen ? "opacity-100 translate-y-0" : "md:opacity-0 md:translate-y-4"
                  }`}
                >
                  <h3 className="text-3xl md:text-5xl leading-none whitespace-nowrap">{t.nav[d.id]}</h3>
                  <p className="mt-3 text-[#efe4d8]/75 max-w-[36ch]">{t.navGrid.items[d.id]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </Railed>
  );
}

// One project large, its story beside it in bone on oxblood
function Feature({ c, pick }) {
  const p = projects.find((x) => x.slug === "majlis-hotel");
  return (
    <Railed className={`${OX} ${BONE}`}>
      <div className={`${PAD} pb-28 md:pb-36 grid md:grid-cols-12 gap-10 items-end`}>
        <Link href={`/hospitality/${p.slug}`} className="group md:col-span-8 block">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image src={p.cover} alt={pick(p.title)} fill sizes="60vw" className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.03]`} />
          </div>
        </Link>
        <div className="md:col-span-4">
          <p className={`text-sm ${BRASS}`}>
            {pick(p.title)}, {pick(p.location)}
          </p>
          <p className="mt-5 text-[clamp(1.75rem,2.6vw,2.6rem)] leading-[1.1]">{c.home2.statement}</p>
          <Link href="/hospitality" className="inline-block mt-8 underline underline-offset-[6px] decoration-[#c8a27c]/60 hover:decoration-[#c8a27c]">
            {c.home2.allHospitality}
          </Link>
        </div>
      </div>
    </Railed>
  );
}

function Footer({ c, t }) {
  const [x, y, w, h] = LATIN_VIEWBOX.split(" ").map(Number);
  return (
    <Railed as="footer" id="contact" rail={OX_DEEP} className={`${OX_DEEP} ${BONE}`}>
      <div className={`${PAD} pt-24 md:pt-32 pb-8 min-h-screen flex flex-col`}>
        <p className={BRASS}>{c.home2.talkLead}</p>
        <a href={`mailto:${t.contact.emailAddress}`} className="mt-3 self-start text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.02em] hover:text-[#c8a27c] transition-colors">
          {c.footer.talk}
        </a>
        <p className="mt-3 text-[#efe4d8]/65">{t.contact.emailAddress}</p>
        <div className="flex-1 min-h-16" />
        <div className="flex flex-col sm:flex-row justify-between gap-2 pb-4 border-b border-[#efe4d8]/40 text-sm">
          <p>© 2026 {c.footer.rights}</p>
          <p>{c.footer.cities}</p>
        </div>
        <svg viewBox={LATIN_VIEWBOX} role="img" aria-label="AJID" className="mt-4 block w-full h-auto">
          <defs>
            <clipPath id="v7-mark">
              <LatinMarkPaths />
            </clipPath>
          </defs>
          <image href="/images/hero/eladio-hero-bg.webp" x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath="url(#v7-mark)" />
        </svg>
      </div>
    </Railed>
  );
}

export default function V7Home() {
  const { c, pick } = useCopy();
  const { t } = useLanguage();
  return (
    <div className={OX}>
      <Opening />
      <main>
        <Strips t={t} />
        <Feature c={c} pick={pick} />
      </main>
      <Footer c={c} t={t} />
    </div>
  );
}
