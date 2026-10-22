"use client";

import { useCopy } from "@/components/site/useCopy";
import { GUTTER } from "@/components/site/PageShell";
import { useLanguage } from "@/context/LanguageContext";
import { LatinMarkPaths, LATIN_VIEWBOX } from "./marks";

// One screen tall: statement at the top, details row and rule near the
// bottom, then the AJID mark cut out of a brick photograph. Everything sits in
// one column to the right of the fixed navbar.
export default function SiteFooter() {
  const { c } = useCopy();
  const { t } = useLanguage();
  const [x, y, w, h] = LATIN_VIEWBOX.split(" ").map(Number);

  return (
    <footer id="contact" className="relative min-h-screen flex flex-col bg-navy text-beige pb-6 md:pb-7">
      {/* Studio statement; also where the navbar's About link lands */}
      <div className={`${GUTTER} pt-10 md:pt-11`}>
        <p
          id="about"
          className="scroll-mt-10 text-[clamp(2rem,3.65vw,3.25rem)] leading-[1.04] tracking-[-0.01em] max-w-[24ch]"
        >
          {c.footer.statement}
        </p>
      </div>

      <div className="flex-1 min-h-24" />

      <div className={GUTTER}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-beige/90 text-base md:text-[17px]">
          <p>© 2026 {c.footer.rights}</p>
          <div className="flex gap-x-12">
            <span>{c.footer.cities}</span>
            <a href={`mailto:${t.contact.emailAddress}`} className="hover:text-mist transition-colors">
              {c.footer.talk}
            </a>
          </div>
        </div>
      </div>

      {/* Same column as the statement and rule, so it lines up with both ends of
          the rule and stays clear of the navbar */}
      <div className={`${GUTTER} mt-4`}>
        <svg viewBox={LATIN_VIEWBOX} role="img" aria-label="AJID" className="block w-full h-auto">
          <defs>
            <clipPath id="footer-mark">
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
            clipPath="url(#footer-mark)"
          />
        </svg>
      </div>
    </footer>
  );
}
