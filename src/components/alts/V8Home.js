"use client";

import Image from "next/image";
import Link from "next/link";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { products } from "@/data/products";
import { ArabicMarkPaths, ARABIC_VIEWBOX } from "@/components/marks";
import { Railed, Opening, DESTINATIONS } from "./shared";

// v8, "The salon wall": a warm sand wall where the links hang as framed works
// along one centre line, each lit from above with a museum label beneath.
// A walnut rail sits under the navbar.
const SAND = "bg-[#d8c4ab]";
const WALNUT = "bg-[#3a2416]";
const INK = "text-[#2b1a10]";
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const PAD = "px-6 md:px-10 lg:px-14";

// Frame size and mount for each work, so the hang is varied but balanced
const HANG = {
  about: "w-[62%] sm:w-52 lg:w-60 aspect-[3/4]",
  residential: "w-[86%] sm:w-80 lg:w-[26rem] aspect-[4/5]",
  hospitality: "w-[86%] sm:w-72 lg:w-96 aspect-[4/3]",
  gallery: "w-[62%] sm:w-48 lg:w-56 aspect-square",
  contact: "w-[70%] sm:w-56 lg:w-64 aspect-[3/4]",
};

function Wall({ t }) {
  return (
    <Railed rail={WALNUT} className={`${SAND} ${INK}`}>
      <div className={`${PAD} pt-20 md:pt-28 pb-24 md:pb-32`}>
        <h2 className="text-center text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-[-0.01em] mb-16 md:mb-24">
          {t.navGrid.title}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-10 lg:gap-x-14 gap-y-16">
          {DESTINATIONS.map((d) => (
            <Link key={d.id} href={d.href} className="group relative flex flex-col items-center">
              {/* Picture light pooling on the wall above the frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[140%] h-56 bg-[radial-gradient(ellipse_at_top,rgba(255,244,228,0.55),transparent_65%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100"
              />
              {/* Frame: thin walnut moulding, bone mount, photograph */}
              <div
                className={`relative ${HANG[d.id]} border-[3px] border-[#2b1a10] bg-[#f3ece3] p-[7%] shadow-[0_18px_30px_-12px_rgba(43,26,16,0.45)] transition-[transform,box-shadow] duration-700 ${EASE} group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_40px_-14px_rgba(43,26,16,0.55)]`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={d.image} alt="" fill sizes="(min-width: 1024px) 26rem, 80vw" className="object-cover" />
                </div>
              </div>
              {/* Museum label */}
              <div className="mt-5 w-48 text-center">
                <p className="text-lg leading-tight">{t.nav[d.id]}</p>
                <p className="mt-1 text-xs text-[#2b1a10]/65 leading-snug">{t.navGrid.items[d.id]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Railed>
  );
}

// Pieces standing on plinths, lit the same way
function Plinths({ c, pick }) {
  return (
    <Railed rail={WALNUT} className={`bg-[#cdb79c] ${INK}`}>
      <div className={`${PAD} pt-20 md:pt-28 pb-24`}>
        <div className="flex items-end justify-between gap-6 mb-14">
          <h2 className="text-3xl md:text-4xl">{c.home2.galleryTitle}</h2>
          <Link href="/gallery" className="underline underline-offset-[6px] decoration-[#2b1a10]/40 hover:decoration-[#2b1a10]">
            {c.home2.galleryLink}
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14 items-end">
          {products.slice(0, 4).map((p) => (
            <Link key={p.slug} href={`/gallery/${p.slug}`} className="group block">
              <div className="relative aspect-square">
                <Image
                  src={p.images[0]}
                  alt={pick(p.name)}
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className={`object-contain object-bottom transition-transform duration-1000 ${EASE} group-hover:-translate-y-1.5`}
                />
              </div>
              {/* Plinth */}
              <div className="h-16 bg-[#efe6da] shadow-[0_14px_24px_-14px_rgba(43,26,16,0.5)]" />
              <p className="mt-4 text-lg">{pick(p.name)}</p>
              <p className="text-sm text-[#2b1a10]/65">{pick(p.material)}</p>
            </Link>
          ))}
        </div>
      </div>
    </Railed>
  );
}

function Footer({ c, t }) {
  return (
    <Railed as="footer" id="contact" rail={WALNUT} className={`${WALNUT} text-[#ead9c4]`}>
      <div className={`${PAD} pt-24 md:pt-32 pb-8 min-h-screen flex flex-col text-center items-center`}>
        <p className="text-[#ead9c4]/65">{c.home2.talkLead}</p>
        <a href={`mailto:${t.contact.emailAddress}`} className="mt-3 text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.02em] hover:text-[#f3ece3] transition-colors">
          {c.footer.talk}
        </a>
        <p className="mt-3 text-[#ead9c4]/65">{t.contact.emailAddress}</p>
        <div className="flex-1 min-h-16" />
        <svg viewBox={ARABIC_VIEWBOX} role="img" aria-label="عجيد" className="block w-full max-w-4xl h-auto fill-[#ead9c4]">
          <ArabicMarkPaths />
        </svg>
        <div className="mt-8 w-full pt-4 border-t border-[#ead9c4]/30 flex flex-col sm:flex-row justify-between gap-2 text-sm text-[#ead9c4]/75">
          <p>© 2026 {c.footer.rights}</p>
          <p>{c.footer.cities}</p>
        </div>
      </div>
    </Railed>
  );
}

export default function V8Home() {
  const { c, pick } = useCopy();
  const { t } = useLanguage();
  return (
    <div className={SAND}>
      <Opening />
      <main>
        <Wall t={t} />
        <Plinths c={c} pick={pick} />
      </main>
      <Footer c={c} t={t} />
    </div>
  );
}
