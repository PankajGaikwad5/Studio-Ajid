"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import { LatinMarkPaths, ArabicMarkPaths, LATIN_VIEWBOX, ARABIC_VIEWBOX } from "@/components/marks";
import { useCopy } from "@/components/site/useCopy";
import { useLanguage } from "@/context/LanguageContext";
import { projects } from "@/data/projects";
import { products } from "@/data/products";

// "The drawing set": after the hero the site reads like architectural
// drawings on grid paper. The index is a courtyard-house plan whose rooms are
// the links, projects are drawing sheets, and the gallery is a furniture schedule.
const PAD = "px-5 md:px-8 lg:px-12";
const LINE = "#140d0a";
const RED = "#461b1b";
const GRID = {
  backgroundImage:
    "linear-gradient(rgba(116,135,150,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(116,135,150,0.16) 1px, transparent 1px)",
  backgroundSize: "24px 24px",
};

// Drawing vocabulary not covered by the shared copy
const WORDS = {
  en: { key: "Key", plan: "Ground floor plan", court: "Courtyard", ref: "Ref", item: "Item", scale: "Scale", sheet: "Sheet", date: "Date", rev: "Revision", drawn: "Drawn by", north: "N" },
  ar: { key: "المفتاح", plan: "مخطط الطابق الأرضي", court: "الفناء", ref: "الرمز", item: "القطعة", scale: "المقياس", sheet: "اللوحة", date: "التاريخ", rev: "المراجعة", drawn: "رسم", north: "ش" },
};

// Rooms of the plan (viewBox 1200 × 720); each one opens a part of the site
const ROOMS = [
  { id: "about", href: "/#about", code: "R-01", x: 40, y: 40, w: 390, h: 340, image: "/images/dieste-1.jpg" },
  { id: "residential", href: "/residential", code: "R-02", x: 430, y: 40, w: 730, h: 190, image: projects[0].cover },
  { id: "hospitality", href: "/hospitality", code: "R-03", x: 770, y: 230, w: 390, h: 450, image: projects[5].cover },
  { id: "gallery", href: "/gallery", code: "R-04", x: 430, y: 490, w: 340, h: 190, image: "/images/hero/eladio-hero-bg.webp" },
  { id: "contact", href: "#contact", code: "R-05", x: 40, y: 380, w: 390, h: 300, image: "/images/dieste-vault.jpg" },
];

function Legend({ t, w }) {
  return (
    <nav className="fixed top-4 end-4 md:top-6 md:end-6 z-50 bg-paper text-ink border border-ink text-sm w-44">
      <p className="px-3 py-1.5 border-b border-ink">{w.key}</p>
      <ul className="px-3 py-2 space-y-1">
        {[
          ["/v5", t.nav.home, null],
          ...ROOMS.map((r) => [r.href, t.nav[r.id], r.code]),
        ].map(([href, label, code]) => (
          <li key={href}>
            <Link href={href} className="flex justify-between gap-3 hover:text-burgundy">
              <span>{label}</span>
              <span className="tabular-nums text-ink/50">{code}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Plan({ t, w }) {
  const router = useRouter();
  return (
    <section className={`${PAD} py-24 md:py-32`} style={GRID}>
      <div className="flex items-end justify-between gap-6 mb-8">
        <h2 className="text-3xl md:text-5xl">{w.plan}</h2>
        <div className="flex items-end gap-6 text-sm">
          {/* Scale bar */}
          <div aria-hidden="true">
            <div className="flex">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`w-8 h-2 border border-ink ${i % 2 ? "bg-paper" : "bg-ink"}`} />
              ))}
            </div>
            <div className="mt-1 flex justify-between tabular-nums text-xs">
              <span>0</span>
              <span>10 m</span>
            </div>
          </div>
          {/* North arrow */}
          <svg viewBox="0 0 24 36" className="w-5 h-8" aria-hidden="true">
            <path d="M12 0 L22 30 L12 24 L2 30 Z" fill={LINE} />
            <text x="12" y="36" textAnchor="middle" fontSize="8" fill={LINE}>{w.north}</text>
          </svg>
        </div>
      </div>

      <svg viewBox="0 0 1200 720" className="block w-full h-auto" role="group" aria-label={w.plan}>
        <defs>
          {ROOMS.map((r) => (
            <pattern key={r.id} id={`room-${r.id}`} patternUnits="userSpaceOnUse" x={r.x} y={r.y} width={r.w} height={r.h}>
              <image href={r.image} width={r.w} height={r.h} preserveAspectRatio="xMidYMid slice" />
            </pattern>
          ))}
        </defs>

        {/* Courtyard: dashed opening, trees and a water channel */}
        <rect x="430" y="230" width="340" height="260" fill="none" stroke={LINE} strokeWidth="1.5" strokeDasharray="8 6" />
        <line x1="600" y1="250" x2="600" y2="470" stroke={RED} strokeWidth="2" />
        {[[500, 300], [700, 300], [500, 420], [700, 420]].map(([cx, cy]) => (
          <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="22" fill="none" stroke={LINE} strokeWidth="1.2" />
        ))}
        <text x="600" y="365" textAnchor="middle" fontSize="18" fill={LINE} opacity="0.6">{w.court}</text>

        {/* Rooms */}
        {ROOMS.map((r) => (
          <a
            key={r.id}
            href={r.href}
            onClick={(e) => {
              e.preventDefault();
              router.push(r.href);
            }}
            className="group cursor-pointer focus:outline-none"
          >
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="transparent" />
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill={`url(#room-${r.id})`}
              className="opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100"
            />
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke={LINE} strokeWidth="6" />
            <g className="transition-[fill] duration-500 fill-ink group-hover:fill-paper group-focus:fill-paper">
              <text x={r.x + r.w / 2} y={r.y + r.h / 2} textAnchor="middle" fontSize="30">
                {t.nav[r.id]}
              </text>
              <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 30} textAnchor="middle" fontSize="15" opacity="0.7">
                {r.code}
              </text>
            </g>
          </a>
        ))}

        {/* Outer wall, drawn heavier than the partitions */}
        <rect x="40" y="40" width="1120" height="640" fill="none" stroke={LINE} strokeWidth="16" />
        {/* Entrance gap and door swing on the south wall */}
        <rect x="150" y="672" width="90" height="16" fill="#ede3d6" />
        <path d="M150 680 A90 90 0 0 1 240 590" fill="none" stroke={RED} strokeWidth="1.5" />
        <line x1="240" y1="680" x2="240" y2="590" stroke={RED} strokeWidth="1.5" />
      </svg>
    </section>
  );
}

// Projects as drawing sheets with title blocks
function Sheets({ c, pick, w }) {
  return (
    <section className={`${PAD} pb-24 md:pb-32`} style={GRID}>
      <h2 className="text-3xl md:text-5xl mb-10">{c.home2.recentTitle}</h2>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {projects.slice(0, 4).map((p, i) => (
          <Link key={p.slug} href={`/${p.category}/${p.slug}`} className="group block border border-ink bg-paper">
            <div className="p-3">
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={p.cover}
                  alt={pick(p.title)}
                  fill
                  sizes="(min-width: 768px) 45vw, 90vw"
                  className="object-cover grayscale-[35%] transition-[filter,transform] duration-1000 group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
              </div>
            </div>
            <dl className="grid grid-cols-[auto_1fr_auto_auto] border-t border-ink text-sm">
              <div className="px-3 py-2 border-e border-ink">
                <dt className="text-[11px] text-ink/55">{w.sheet}</dt>
                <dd className="tabular-nums">A-{101 + i}</dd>
              </div>
              <div className="px-3 py-2 border-e border-ink min-w-0">
                <dt className="text-[11px] text-ink/55">{pick(p.location)}</dt>
                <dd className="text-lg leading-tight truncate group-hover:text-burgundy">{pick(p.title)}</dd>
              </div>
              <div className="px-3 py-2 border-e border-ink">
                <dt className="text-[11px] text-ink/55">{w.scale}</dt>
                <dd className="tabular-nums">1:200</dd>
              </div>
              <div className="px-3 py-2">
                <dt className="text-[11px] text-ink/55">{c.facts.year}</dt>
                <dd className="tabular-nums">{p.year}</dd>
              </div>
            </dl>
          </Link>
        ))}
      </div>
    </section>
  );
}

// The gallery as a furniture schedule
function Schedule({ c, pick, w }) {
  return (
    <section className={`${PAD} pb-24 md:pb-32`} style={GRID}>
      <div className="flex items-end justify-between gap-6 mb-8">
        <h2 className="text-3xl md:text-5xl">{c.home2.galleryTitle}</h2>
        <Link href="/gallery" className="underline underline-offset-[6px] decoration-ink/40 hover:decoration-ink">
          {c.home2.galleryLink}
        </Link>
      </div>
      <div className="overflow-x-auto border border-ink bg-paper">
        <table className="w-full min-w-[640px] text-start text-sm md:text-base">
          <thead>
            <tr className="border-b border-ink text-ink/60 text-xs md:text-sm">
              {[w.ref, "", w.item, c.facts.material, c.facts.dimensions].map((h, i) => (
                <th key={i} scope="col" className="px-4 py-2 font-normal text-start">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.slug} className="group border-b border-ink/20 last:border-b-0 hover:bg-beige/40">
                <td className="px-4 py-3 tabular-nums text-burgundy">F-{String(i + 1).padStart(2, "0")}</td>
                <td className="px-2 py-2 w-16">
                  <div className="relative w-12 h-12">
                    <Image src={p.images[0]} alt="" fill sizes="48px" className="object-contain" />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/gallery/${p.slug}`} className="hover:text-burgundy after:absolute after:inset-0 relative">
                    {pick(p.name)}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink/75">{pick(p.material)}</td>
                <td className="px-4 py-3 text-ink/75 tabular-nums whitespace-nowrap">{p.dimensions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// Footer as the drawing's title block
function TitleBlock({ c, t, w }) {
  const cell = "px-4 py-3 border-ink";
  return (
    <footer id="contact" className={`${PAD} pb-8`} style={GRID}>
      <div className="border-2 border-ink bg-paper grid md:grid-cols-12">
        <div className={`md:col-span-7 ${cell} border-b md:border-b-0 md:border-e flex flex-col justify-between gap-10 py-6`}>
          <div>
            <p className="text-ink/60">{c.home2.talkLead}</p>
            <a
              href={`mailto:${t.contact.emailAddress}`}
              className="mt-2 inline-block text-[clamp(2.25rem,5.5vw,5rem)] leading-none tracking-[-0.02em] hover:text-burgundy"
            >
              {c.footer.talk}
            </a>
            <p className="mt-3 text-ink/70">{t.contact.emailAddress}</p>
          </div>
          <div className="flex items-end gap-6">
            <svg viewBox={LATIN_VIEWBOX} className="h-10 md:h-14 w-auto fill-ink" aria-label="AJID" role="img">
              <LatinMarkPaths />
            </svg>
            <svg viewBox={ARABIC_VIEWBOX} className="h-10 md:h-14 w-auto fill-ink" aria-label="عجيد" role="img">
              <ArabicMarkPaths />
            </svg>
          </div>
        </div>
        <dl className="md:col-span-5 grid grid-cols-2 text-sm">
          {[
            [w.drawn, "Studio Ajid"],
            [c.facts.location, c.footer.cities],
            [w.sheet, "A-000"],
            [w.scale, "1:1"],
            [w.date, "2026"],
            [w.rev, "C"],
          ].map(([label, value], i) => (
            <div key={label} className={`${cell} border-b ${i % 2 === 0 ? "border-e" : ""} ${i >= 4 ? "border-b-0" : ""}`}>
              <dt className="text-[11px] text-ink/55">{label}</dt>
              <dd className="mt-0.5">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="mt-3 text-sm text-ink/60">© 2026 {c.footer.rights}</p>
    </footer>
  );
}

export default function V5Home() {
  const { c, pick, lang } = useCopy();
  const { t } = useLanguage();
  const w = WORDS[lang];

  return (
    <div className="bg-paper text-ink">
      <Legend t={t} w={w} />
      <Hero />
      <main>
        <Plan t={t} w={w} />
        <Sheets c={c} pick={pick} w={w} />
        <Schedule c={c} pick={pick} w={w} />
      </main>
      <TitleBlock c={c} t={t} w={w} />
    </div>
  );
}
