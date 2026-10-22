"use client";

import Image from "next/image";
import Link from "next/link";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { Railed, Opening, Mark, DESTINATIONS } from "./shared";

// v9, "Colour blocks": the brand palette used as solid editorial blocks. Each
// link owns one palette colour; navy is the structure (rail, statement band).
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const byId = Object.fromEntries(DESTINATIONS.map((d) => [d.id, d]));

// Block colour, type colour and size for each destination
const BLOCKS = [
  { id: "residential", span: "md:col-span-7", tone: "bg-mist text-navy", meta: "text-navy/70", frame: "aspect-[16/10]" },
  { id: "hospitality", span: "md:col-span-5", tone: "bg-burgundy text-beige", meta: "text-beige/70", frame: "aspect-[4/5]" },
  { id: "about", span: "md:col-span-4", tone: "bg-beige text-navy", meta: "text-navy/65", frame: "aspect-[4/3]" },
  { id: "gallery", span: "md:col-span-4", tone: "bg-stone text-beige", meta: "text-beige/75", frame: "aspect-[4/3]" },
  { id: "contact", span: "md:col-span-4", tone: "bg-walnut text-beige", meta: "text-beige/70", frame: "aspect-[4/3]" },
];

function Blocks({ t }) {
  return (
    <Railed rail="bg-navy" className="bg-navy">
      <div className="grid md:grid-cols-12">
        {BLOCKS.map((b) => {
          const d = byId[b.id];
          return (
            <Link
              key={b.id}
              href={d.href}
              className={`group ${b.span} ${b.tone} flex flex-col justify-between gap-8 p-6 md:p-8 lg:p-10 min-h-[48vh] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-beige`}
            >
              <div className={`relative ${b.frame} overflow-hidden`}>
                <Image
                  src={d.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-[1.04]`}
                />
              </div>
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-[clamp(2rem,3.6vw,3.5rem)] leading-[1] tracking-[-0.015em]">{t.nav[b.id]}</h2>
                  <p className={`mt-2 ${b.meta} max-w-[34ch]`}>{t.navGrid.items[b.id]}</p>
                </div>
                <span
                  aria-hidden="true"
                  className={`shrink-0 h-px w-10 bg-current transition-[width] duration-700 ${EASE} group-hover:w-20`}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </Railed>
  );
}

// Navy band: the statement in beige with a mist line of detail
function Statement({ c }) {
  return (
    <Railed rail="bg-navy" className="bg-navy text-beige">
      <div className="px-6 md:px-10 lg:px-14 py-28 md:py-40 grid md:grid-cols-12 gap-10 items-end">
        <p className="md:col-span-8 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04] tracking-[-0.015em] max-w-[20ch]">
          {c.home2.statement}
        </p>
        <p className="md:col-span-4 text-mist leading-relaxed max-w-[40ch]">{c.home2.body}</p>
      </div>
    </Railed>
  );
}

// Beige footer, navy type, burgundy accent rule
function Footer({ c, t }) {
  return (
    <Railed as="footer" id="contact" rail="bg-navy" className="bg-beige text-navy">
      <div className="px-6 md:px-10 lg:px-14 pt-24 md:pt-32 pb-8 min-h-screen flex flex-col">
        <p className="text-navy/65">{c.home2.talkLead}</p>
        <a href={`mailto:${t.contact.emailAddress}`} className="mt-3 self-start text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.02em] hover:text-burgundy transition-colors">
          {c.footer.talk}
        </a>
        <span aria-hidden="true" className="mt-8 block h-[3px] w-24 bg-burgundy" />
        <div className="mt-8 grid sm:grid-cols-3 gap-6 text-sm text-navy/75">
          <p>{t.contact.emailAddress}</p>
          <p>{c.footer.cities}</p>
          <p className="sm:text-end">© 2026 {c.footer.rights}</p>
        </div>
        <div className="flex-1 min-h-16" />
        <Mark className="w-full h-auto text-navy" />
      </div>
    </Railed>
  );
}

export default function V9Home() {
  const { c } = useCopy();
  const { t } = useLanguage();
  return (
    <div className="bg-navy">
      <Opening />
      <main>
        <Blocks t={t} />
        <Statement c={c} />
      </main>
      <Footer c={c} t={t} />
    </div>
  );
}
