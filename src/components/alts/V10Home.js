"use client";

import Image from "next/image";
import Link from "next/link";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { Railed, Opening, Mark, DESTINATIONS } from "./shared";

// v10, "Duotone": every photograph is printed in two palette colours, a
// different pair per subject, and returns to full colour when pointed at.
// It ties any photo to the brand and makes the site read as one edition.
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// Shadow and highlight colour for each duotone (all from the brand palette)
const PAIRS = {
  navy: ["#061229", "#e6cfc6"],
  burgundy: ["#461b1b", "#e6cfc6"],
  walnut: ["#582f0f", "#e6cfc6"],
  mist: ["#061229", "#748796"],
  stone: ["#461b1b", "#828282"],
};

// Grayscale photo with the dark colour lightening the shadows and the light
// colour darkening the highlights; both lift away on hover
export function Duotone({ src, alt = "", pair = "navy", sizes, className = "" }) {
  const [dark, light] = PAIRS[pair];
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover grayscale contrast-[1.15] transition-[filter,transform] duration-1000 ${EASE} group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-[1.03]`}
      />
      <div aria-hidden="true" className="absolute inset-0 mix-blend-lighten transition-opacity duration-700 group-hover:opacity-0" style={{ backgroundColor: dark }} />
      <div aria-hidden="true" className="absolute inset-0 mix-blend-darken transition-opacity duration-700 group-hover:opacity-0" style={{ backgroundColor: light }} />
    </div>
  );
}

const TONES = { about: "walnut", residential: "navy", hospitality: "burgundy", gallery: "stone", contact: "mist" };

// Five tall duotone prints in a row on beige
function Prints({ t }) {
  return (
    <Railed rail="bg-navy" className="bg-beige text-navy">
      <div className="px-6 md:px-10 lg:px-12 pt-16 md:pt-20 pb-20">
        <div className="flex items-baseline justify-between gap-6 pb-5 mb-8 border-b border-navy/25">
          <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] leading-none tracking-[-0.01em]">{t.navGrid.title}</h2>
          <p className="text-sm text-walnut">Studio Ajid</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-5">
          {DESTINATIONS.map((d, i) => (
            <Link key={d.id} href={d.href} className={`group block ${i === DESTINATIONS.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
              <Duotone src={d.image} pair={TONES[d.id]} sizes="(min-width: 768px) 18vw, 45vw" className="h-[46vh] md:h-[64vh]" />
              <h3 className="mt-4 text-xl lg:text-2xl leading-tight">{t.nav[d.id]}</h3>
              <p className="mt-1 text-sm text-navy/65">{t.navGrid.items[d.id]}</p>
            </Link>
          ))}
        </div>
      </div>
    </Railed>
  );
}

// Burgundy band with two duotone projects and the statement
function Edition({ c, pick }) {
  const pair = [projects[1], projects[6]];
  return (
    <Railed rail="bg-navy" className="bg-burgundy text-beige">
      <div className="px-6 md:px-10 lg:px-12 py-24 md:py-32">
        <p className="text-[clamp(2rem,3.8vw,3.75rem)] leading-[1.05] tracking-[-0.015em] max-w-[22ch]">{c.home2.statement}</p>
        <div className="mt-16 grid md:grid-cols-2 gap-8 lg:gap-12">
          {pair.map((p, i) => (
            <Link key={p.slug} href={`/${p.category}/${p.slug}`} className={`group block ${i === 1 ? "md:mt-24" : ""}`}>
              <Duotone src={p.cover} alt={pick(p.title)} pair={i === 0 ? "walnut" : "stone"} sizes="(min-width: 768px) 42vw, 90vw" className="aspect-[4/3]" />
              <div className="mt-4 flex items-baseline justify-between gap-6">
                <h3 className="text-2xl md:text-3xl">{pick(p.title)}</h3>
                <p className="text-sm text-beige/65 shrink-0">
                  {pick(p.location)}, {p.year}
                </p>
              </div>
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
      <div className="px-6 md:px-10 lg:px-12 pt-24 md:pt-32 pb-8 min-h-screen flex flex-col">
        <p className="text-mist">{c.home2.talkLead}</p>
        <a href={`mailto:${t.contact.emailAddress}`} className="mt-3 self-start text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.02em] hover:text-mist transition-colors">
          {c.footer.talk}
        </a>
        <p className="mt-3 text-mist">{t.contact.emailAddress}</p>
        <div className="flex-1 min-h-16" />
        <div className="flex flex-col sm:flex-row justify-between gap-2 pb-4 mb-4 border-b border-beige/40 text-sm text-beige/80">
          <p>© 2026 {c.footer.rights}</p>
          <p>{c.footer.cities}</p>
        </div>
        <Mark className="w-full h-auto text-beige" />
      </div>
    </Railed>
  );
}

export default function V10Home() {
  const { c, pick } = useCopy();
  const { t } = useLanguage();
  return (
    <div className="bg-beige">
      <Opening />
      <main>
        <Prints t={t} />
        <Edition c={c} pick={pick} />
      </main>
      <Footer c={c} t={t} />
    </div>
  );
}
