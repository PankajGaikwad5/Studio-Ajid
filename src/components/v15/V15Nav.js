"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useLanguage } from "@/context/LanguageContext";
import { INSTAGRAM_URL } from "@/data/studio";
import { PATTERN_BAND } from "./layout";

const SOFT = "ease-[cubic-bezier(0.22,1,0.36,1)]";
// Experimental: a band of the brand pattern rises in along the foot of the
// phone menu, after the links. Set to false to undo.
const MENU_PATTERN = false;

// v13's menu in v15's two colours: stone beige on a line over the hero, folding
// into a navy column on the left once the hero leaves. Per the client there is
// no "Home" (the logo links home), Residential and Hospitality are combined
// under Interiors, Objects (the studio's pieces) is listed apart from the
// Gallery, and Instagram is listed. Links are solid, in the exact brand shades,
// and underline on hover. Below md the column has no room, so phones get the
// same middle line holding "Menu" over the hero; as the hero leaves it retracts
// to the right and three lines draw in at the top right, which open a
// full-screen menu.
// `alwaysDocked` is for inner pages, which have no hero: the menu starts in its
// column (three lines on phones) and stays there.
export default function V15Nav({ active, alwaysDocked = false }) {
  const { t, toggleLanguage, isRTL } = useLanguage();
  const [docked, setDocked] = useState(alwaysDocked);
  const [menuOpen, setMenuOpen] = useState(false);
  const dockedRef = useRef(false);
  const navRef = useRef(null);
  const pending = useRef(null);

  useEffect(() => {
    if (alwaysDocked) return;
    gsap.registerPlugin(Flip);
    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.98;
      if (next === dockedRef.current) return;
      // Record where each link is before the layout changes. The menu can be
      // detached while a hidden page is kept around, so only animate when it's there.
      const nav = navRef.current;
      pending.current = nav ? Flip.getState(nav.querySelectorAll("[data-flip]")) : null;
      dockedRef.current = next;
      setDocked(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [alwaysDocked]);

  // After the new layout renders, glide each link from its old place
  useLayoutEffect(() => {
    const state = pending.current;
    pending.current = null;
    if (!state || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    Flip.from(state, { duration: 0.85, ease: "power3.inOut", stagger: 0.03 });
  }, [docked]);

  // Escape closes the phone menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const items = [
    ["interiors", "/interiors", t.nav.interiors],
    ["objects", "/objects", t.nav.objects],
    ["gallery", "/gallery", t.nav.gallery],
    ["about", "/about", t.nav.about],
    ["contact", "/contact", t.nav.contact],
  ];
  const link = "group pointer-events-auto flex items-center gap-2 whitespace-nowrap";
  // The label's underline draws in when its link is pointed at or focused
  const label = "u-line group-hover:[background-size:100%_1px] group-focus-visible:[background-size:100%_1px]";

  const menuWord = { en: "Menu", ar: "القائمة" }[isRTL ? "ar" : "en"];
  // Phone menu entrance: each part rises in a little after the one above it
  const rise = `transition-[opacity,transform] duration-700 ${SOFT} ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`;
  const reveal = (i) => ({ transitionDelay: menuOpen ? `${180 + i * 60}ms` : "0ms" });
  const closeWord = { en: "Close", ar: "إغلاق" }[isRTL ? "ar" : "en"];

  return (
    <>
      <header
        dir="ltr"
        // --peek-lift is set by the footer's logo window: as it is uncovered the
        // menu rises with the page instead of staying over the logo
        style={{ transform: "translateY(calc(-1 * var(--peek-lift, 0px)))" }}
        className={`max-md:hidden fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 px-5 sm:px-8 md:px-10 lg:px-12 pointer-events-none transition-colors duration-500 ${
          docked ? "text-navy" : "text-beige"
        }`}
      >
        <div className="relative pt-3">
          {/* Line across the screen over the hero; retracts toward the left when docking */}
          <span
            aria-hidden="true"
            className={`absolute top-0 inset-x-0 h-px bg-current origin-left transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              docked ? "scale-x-0" : "scale-x-100 delay-200"
            }`}
          />
          {/* Upright line beside the column; draws down once the links arrive */}
          <span
            aria-hidden="true"
            className={`absolute left-0 top-3 bottom-0 w-px bg-current opacity-30 origin-top transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              docked ? "scale-y-100 delay-500" : "scale-y-0"
            }`}
          />

          <nav
            ref={navRef}
            aria-label="Studio navigation"
            // The docked column is set a little smaller and tighter than the line
            // over the hero, per the client; the size eases between the two
            className={`transition-[font-size] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              docked ? "text-xs md:text-[13px] flex flex-col items-start gap-1.5 ps-5" : "text-[13px] md:text-[15px] flex items-center justify-between gap-5"
            }`}
          >
            {items.map(([id, href, text]) => (
              <Link
                key={id}
                data-flip
                href={href}
                aria-current={active === id ? "page" : undefined}
                className={link}
              >
                <span
                  aria-hidden="true"
                  className={`w-1.5 h-1.5 rounded-full bg-current transition-transform duration-500 ${SOFT} ${active === id ? "scale-100" : "scale-0"}`}
                />
                <span className={label}>{text}</span>
              </Link>
            ))}
            <a data-flip href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={link}>
              {/* Keeps it in line with the links above, which reserve room for the dot */}
              <span aria-hidden="true" className="w-1.5 h-1.5" />
              <span className={label}>{t.nav.instagram}</span>
            </a>
            <button
              data-flip
              type="button"
              onClick={toggleLanguage}
              className={`u-line pointer-events-auto whitespace-nowrap cursor-pointer ${docked ? "mt-2" : ""}`}
            >
              {t.nav.langToggle}
            </button>
          </nav>
        </div>
      </header>

      {/* Phones: over the hero, the menu line with "Menu" and the language. As the
          hero leaves, the line retracts toward the right while the words glide
          after it; the three-line button then draws in at the top right. */}
      <div
        dir="ltr"
        className={`md:hidden fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 px-5 sm:px-8 pointer-events-none transition-opacity duration-300 ${
          menuOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="relative pt-3 text-[15px] text-beige">
          <span
            aria-hidden="true"
            className={`absolute top-0 inset-x-0 h-px bg-current origin-right transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              docked ? "scale-x-0" : "scale-x-100 delay-200"
            }`}
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="v15-menu"
              tabIndex={docked ? -1 : 0}
              className={`cursor-pointer transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                docked ? "opacity-0 translate-x-[40vw]" : "pointer-events-auto opacity-100 translate-x-0 delay-200"
              }`}
            >
              {menuWord}
            </button>
            <button
              type="button"
              onClick={toggleLanguage}
              tabIndex={docked ? -1 : 0}
              className={`cursor-pointer transition-[opacity,transform] duration-500 ${
                docked ? "opacity-0 translate-x-6" : "pointer-events-auto opacity-100 translate-x-0 delay-200"
              }`}
            >
              {t.nav.langToggle}
            </button>
          </div>
        </div>
      </div>

      {/* Phones, after the hero: three lines in the top right open the menu. Drawn
          white with a difference blend, they invert whatever is behind them:
          near white over dark sections and photos, near black over light ones */}
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label={menuWord}
        aria-expanded={menuOpen}
        aria-controls="v15-menu"
        tabIndex={docked ? 0 : -1}
        className={`md:hidden fixed top-3 right-3 z-50 w-11 h-11 flex flex-col items-end justify-center gap-[6px] pr-2.5 text-white mix-blend-difference cursor-pointer ${
          docked && !menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {[300, 400, 500].map((delay) => (
          <span
            key={delay}
            aria-hidden="true"
            style={{ transitionDelay: docked ? `${delay}ms` : "0ms" }}
            className={`block w-6 h-px bg-current origin-right transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              docked && !menuOpen ? "scale-x-100" : "scale-x-0"
            }`}
          />
        ))}
      </button>

      {/* Phones: the full-screen menu. The beige unveils from the top, then the
          links rise in one after another; closing folds it back up at once. */}
      <div
        id="v15-menu"
        role="dialog"
        aria-modal="true"
        aria-label={menuWord}
        dir={isRTL ? "rtl" : "ltr"}
        className={`md:hidden fixed inset-0 z-60 bg-beige text-navy flex flex-col px-6 pt-5 pb-8 transition-[clip-path,visibility] duration-700 ${SOFT} ${
          menuOpen ? "[clip-path:inset(0_0_0_0)] visible" : "[clip-path:inset(0_0_100%_0)] invisible pointer-events-none"
        }`}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            style={reveal(0)}
            className={`text-sm py-2 cursor-pointer ${rise}`}
          >
            {closeWord}
          </button>
        </div>
        <nav aria-label="Studio navigation" className="flex-1 flex flex-col justify-center gap-5 text-[clamp(1.75rem,8vw,2.5rem)] leading-none">
          {items.map(([id, href, label], i) => (
            <Link
              key={id}
              href={href}
              onClick={() => setMenuOpen(false)}
              aria-current={active === id ? "page" : undefined}
              style={reveal(i + 1)}
              className={`self-start ${rise}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div style={reveal(items.length + 1)} className={`flex items-center justify-between pt-5 border-t border-navy/15 text-[15px] ${rise}`}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{t.nav.instagram}</a>
          <button type="button" onClick={toggleLanguage} className="cursor-pointer">{t.nav.langToggle}</button>
        </div>
        {MENU_PATTERN && <div aria-hidden="true" style={reveal(items.length + 2)} className={`-mx-6 -mb-8 mt-8 h-24 ${PATTERN_BAND} ${rise}`} />}
      </div>
    </>
  );
}
