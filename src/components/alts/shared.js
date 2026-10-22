"use client";

import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { LatinMarkPaths, LATIN_VIEWBOX } from "@/components/marks";
import { useLanguage } from "@/context/LanguageContext";

// Shared pieces for the alternative home pages. The client's fixed left navbar
// stays exactly as it is; every section leaves this rail clear for it.
export const RAIL_W = "w-40 sm:w-46 md:w-56 lg:w-66";

const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=2000`;

// The five places the second section always links to
export const DESTINATIONS = [
  { id: "about", href: "/#about", image: "/images/dieste-1.jpg" },
  { id: "residential", href: "/residential", image: unsplash("photo-1613490493576-7fde63acd811") },
  { id: "hospitality", href: "/hospitality", image: unsplash("photo-1520250497591-112f2f40a3f4") },
  { id: "gallery", href: "/gallery", image: "/images/hero/eladio-hero-bg.webp" },
  { id: "contact", href: "#contact", image: "/images/dieste-vault.jpg" },
];

// A full-width band whose left rail sits under the navbar. `rail` colours the
// rail (dark behind the navbar's light labels); content fills the rest.
export function Railed({ rail = "", className = "", children, id, as: Tag = "section" }) {
  const { isRTL } = useLanguage();
  return (
    <Tag id={id} dir="ltr" className={`relative flex ${className}`}>
      <div aria-hidden="true" className={`shrink-0 ${RAIL_W} ${rail}`} />
      <div className="flex-1 min-w-0" dir={isRTL ? "rtl" : "ltr"}>
        {children}
      </div>
    </Tag>
  );
}

// Hero with the client's navbar, as on the live home page
export function Opening() {
  const router = useRouter();
  const onNavigate = (id) => {
    const route = { residential: "/residential", hospitality: "/hospitality", gallery: "/gallery" }[id];
    if (route) return router.push(route);
    if (id === "home") return window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <Hero />
    </>
  );
}

// Solid AJID mark in the current text colour
export function Mark({ className = "" }) {
  return (
    <svg viewBox={LATIN_VIEWBOX} role="img" aria-label="AJID" className={`block fill-current ${className}`}>
      <LatinMarkPaths />
    </svg>
  );
}

// Fine film grain over a section, as an inline SVG noise texture
const NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>\")";

export function Grain({ opacity = 0.07 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 mix-blend-overlay"
      style={{ backgroundImage: NOISE, opacity }}
    />
  );
}
