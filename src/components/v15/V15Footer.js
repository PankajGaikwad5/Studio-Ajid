"use client";

import Link from "next/link";
import { LatinMarkPaths, LATIN_VIEWBOX } from "@/components/marks";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { Railed } from "@/components/alts/shared";
import { RAIL, SECTION } from "./layout";
import Reveal from "@/components/site/Reveal";

// v15's footer, shared by the home page and the inner pages: a lead line, the
// email, the rights and cities, and the AJID mark linking home
export default function V15Footer() {
  const { c } = useCopy();
  const { t } = useLanguage();
  const [x, y, w, h] = LATIN_VIEWBOX.split(" ").map(Number);
  return (
    <Railed as="footer" id="contact" rail={RAIL} className="bg-beige text-navy">
      <div className={`${SECTION} pt-24 md:pt-32 pb-6 min-h-screen flex flex-col`}>
        <Reveal className="flex flex-col items-start">
          <p>{c.home2.talkLead}</p>
          <Link href="/contact" className="u-line mt-3 text-[clamp(2rem,4.4vw,4rem)] leading-none tracking-[-0.015em] pb-2">
            {c.footer.talk}
          </Link>
          <p className="mt-4">{t.contact.emailAddress}</p>
        </Reveal>
        <div className="flex-1 min-h-24" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 text-sm border-b border-navy/20">
          <p>© 2026 {c.footer.rights}</p>
          <p>{c.footer.cities}</p>
        </div>
        {/* The logo links back to the home page */}
        <Reveal className="mt-4">
          <Link href="/" aria-label="AJID" className="block">
            <svg viewBox={LATIN_VIEWBOX} aria-hidden="true" className="block w-full h-auto">
              <defs>
                <clipPath id="v15-mark">
                  <LatinMarkPaths />
                </clipPath>
              </defs>
              <image href="/images/hero/eladio-hero-bg.webp" x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath="url(#v15-mark)" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </Railed>
  );
}
