"use client";

import Image from "next/image";
import Link from "next/link";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projectsIn } from "@/data/projects";
import { Railed, Opening, Mark, DESTINATIONS } from "./shared";

// v6, "The monograph": bone paper, espresso type, burgundy accents, and an
// espresso spine down the left under the navbar. The links section is a
// double-page spread.
const BONE = "bg-[#f1e9df]";
const SPINE = "bg-[#2a1a12]";
const INK = "text-[#2a1a12]";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const PAD = "px-6 md:px-12 lg:px-16";

const byId = Object.fromEntries(DESTINATIONS.map((d) => [d.id, d]));

// Running head along the top of a page, as in a printed book
function RunningHead({ left, right }) {
  return (
    <div className={`${PAD} pt-6 pb-3 flex justify-between text-sm text-[#2a1a12]/60 border-b border-[#2a1a12]/20`}>
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function Spread({ t }) {
  const pages = [byId.residential, byId.hospitality];
  const rest = [byId.about, byId.gallery, byId.contact];
  return (
    <Railed rail={SPINE} className={`${BONE} ${INK}`}>
      <RunningHead left="Studio Ajid" right="2026" />
      <div className={`${PAD} pt-12 md:pt-16 pb-20 md:pb-28`}>
        {/* Two facing pages with a fold between them */}
        <div className="relative grid md:grid-cols-2 gap-10 md:gap-0">
          <div aria-hidden="true" className="hidden md:block absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-linear-to-r from-transparent via-[#2a1a12]/12 to-transparent pointer-events-none z-10" />
          {pages.map((d, i) => (
            <Link key={d.id} href={d.href} className={`group block ${i === 0 ? "md:pe-8" : "md:ps-8"}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-[#2a1a12]">
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 38vw, 90vw"
                  className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.035]`}
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-6">
                <h2 className="text-[clamp(2.25rem,4vw,3.75rem)] leading-[1] tracking-[-0.015em] group-hover:text-burgundy transition-colors">
                  {t.nav[d.id]}
                </h2>
                <span className="text-sm text-[#2a1a12]/60 shrink-0">
                  {projectsIn(d.id).length}
                </span>
              </div>
              <p className="mt-2 text-[#2a1a12]/70 max-w-[40ch]">{t.navGrid.items[d.id]}</p>
            </Link>
          ))}
        </div>

        {/* The remaining chapters, smaller, under a rule */}
        <div className="mt-20 md:mt-24 pt-8 border-t border-[#2a1a12]/25 grid sm:grid-cols-3 gap-10">
          {rest.map((d) => (
            <Link key={d.id} href={d.href} className="group flex gap-5 items-start">
              <div className="relative w-20 h-24 shrink-0 overflow-hidden bg-[#2a1a12]">
                <Image src={d.image} alt="" fill sizes="80px" className={`object-cover transition-transform duration-1000 ${EASE} group-hover:scale-110`} />
              </div>
              <div>
                <h3 className="text-2xl leading-tight group-hover:text-burgundy transition-colors">{t.nav[d.id]}</h3>
                <p className="mt-1 text-sm text-[#2a1a12]/65">{t.navGrid.items[d.id]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Railed>
  );
}

// Full-bleed plate with a facing column of text, like a chapter opener
function Chapter({ c, pick }) {
  const p = projectsIn("residential")[1];
  return (
    <Railed rail={SPINE} className={`${BONE} ${INK}`}>
      <div className="grid md:grid-cols-12 min-h-screen">
        <Link href={`/residential/${p.slug}`} className="group relative md:col-span-7 min-h-[60vh] overflow-hidden">
          <Image src={p.cover} alt={pick(p.title)} fill sizes="55vw" className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.03]`} />
        </Link>
        <div className={`md:col-span-5 ${PAD} py-16 flex flex-col justify-between gap-12`}>
          <p className="text-sm text-[#2a1a12]/60">
            {pick(p.title)}, {pick(p.location)}
          </p>
          <div>
            <p className="text-[clamp(1.9rem,3.2vw,3rem)] leading-[1.08] tracking-[-0.01em]">{c.home2.statement}</p>
            <p className="mt-6 leading-relaxed text-[#2a1a12]/70 max-w-[42ch]">{c.home2.body}</p>
          </div>
        </div>
      </div>
    </Railed>
  );
}

// Colophon-style footer
function Colophon({ c, t }) {
  return (
    <Railed as="footer" id="contact" rail={SPINE} className={`${SPINE} text-[#f1e9df]`}>
      <div className={`${PAD} pt-24 md:pt-32 pb-8 min-h-screen flex flex-col`}>
        <p className="text-[#f1e9df]/60">{c.home2.talkLead}</p>
        <a href={`mailto:${t.contact.emailAddress}`} className="mt-3 self-start text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.02em] hover:text-beige transition-colors">
          {c.footer.talk}
        </a>
        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-sm text-[#f1e9df]/75 border-t border-[#f1e9df]/20 pt-6">
          <p>{t.contact.emailAddress}</p>
          <p>{c.footer.cities}</p>
          <p className="sm:text-end">© 2026 {c.footer.rights}</p>
        </div>
        <div className="flex-1 min-h-16" />
        <Mark className="w-full h-auto" />
      </div>
    </Railed>
  );
}

export default function V6Home() {
  const { c, pick } = useCopy();
  const { t } = useLanguage();
  return (
    <div className={BONE}>
      <Opening />
      <main>
        <Spread t={t} />
        <Chapter c={c} pick={pick} />
      </main>
      <Colophon c={c} t={t} />
    </div>
  );
}
