"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useLanguage } from "@/context/LanguageContext";

// Over the hero the menu sits on a fine line across the middle of the screen.
// When the hero leaves, the links glide into a column on the left: the line
// retracts toward the left as they fold, then an upright line draws down
// beside the column. Links stay in layout throughout, so nothing snaps.
// `color` sets the menu colour; any colour other than the default cream is
// used solid, with no faded links or lines
export default function V13Nav({ active = "home", homeHref = "/v13", color = "#ede3d6" }) {
  const solid = color !== "#ede3d6";
  const { t, toggleLanguage } = useLanguage();
  const [docked, setDocked] = useState(false);
  const dockedRef = useRef(false);
  const navRef = useRef(null);
  const pending = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(Flip);
    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.98;
      if (next === dockedRef.current) return;
      // Record where each link is before the layout changes
      pending.current = Flip.getState(navRef.current.querySelectorAll("[data-flip]"));
      dockedRef.current = next;
      setDocked(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // After the new layout renders, glide each link from its old place
  useLayoutEffect(() => {
    const state = pending.current;
    pending.current = null;
    if (!state || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    Flip.from(state, { duration: 0.85, ease: "power3.inOut", stagger: 0.03 });
  }, [docked]);

  const items = [
    ["home", homeHref, t.nav.home],
    ["residential", "/residential", t.nav.residential],
    ["hospitality", "/hospitality", t.nav.hospitality],
    ["about", "#about", t.nav.about],
    ["gallery", "/gallery", t.nav.gallery],
    ["contact", "#contact", t.nav.contact],
  ];

  return (
    // Always full width, so its own size never changes; only the links move.
    // It ignores the pointer except on the links themselves.
    <header
      dir="ltr"
      className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 px-5 sm:px-8 md:px-10 lg:px-12 text-paper pointer-events-none"
      style={solid ? { color } : undefined}
    >
      <div className="relative pt-3">
        {/* Solid line across the screen just above the links over the hero (as on v2);
            retracts toward the left when docking */}
        <span
          aria-hidden="true"
          style={{ backgroundColor: color }}
          className={`absolute top-0 inset-x-0 h-px origin-left transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            docked ? "scale-x-0" : "scale-x-100 delay-200"
          }`}
        />
        {/* Upright line beside the column; draws down once the links arrive */}
        <span
          aria-hidden="true"
          style={{ backgroundColor: solid ? color : "rgba(237,227,214,0.7)" }}
          className={`absolute left-0 top-3 bottom-0 w-px origin-top transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            docked ? "scale-y-100 delay-500" : "scale-y-0"
          }`}
        />

        <nav
          ref={navRef}
          aria-label="Studio navigation"
          className={`text-[13px] md:text-[15px] ${
            docked ? "flex flex-col items-start gap-3 ps-5" : "flex items-center justify-between gap-5"
          }`}
        >
          {items.map(([id, href, label]) => (
            <Link
              key={id}
              data-flip
              href={href}
              aria-current={active === id ? "page" : undefined}
              className={`pointer-events-auto flex items-center gap-2 whitespace-nowrap transition-opacity hover:opacity-100 ${
                active === id || solid ? "opacity-100" : "opacity-70"
              }`}
            >
              <span
                aria-hidden="true"
                style={{ backgroundColor: color }}
                className={`w-1.5 h-1.5 rounded-full transition-transform duration-300 ${active === id ? "scale-100" : "scale-0"}`}
              />
              {label}
            </Link>
          ))}
          <button
            data-flip
            type="button"
            onClick={toggleLanguage}
            className={`pointer-events-auto whitespace-nowrap ${solid ? "" : "opacity-70 hover:opacity-100"} cursor-pointer ${docked ? "mt-2" : ""}`}
          >
            {t.nav.langToggle}
          </button>
        </nav>
      </div>
    </header>
  );
}
