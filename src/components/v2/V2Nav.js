"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LatinMarkPaths, LATIN_VIEWBOX } from "@/components/marks";

// Over the hero the menu is a fine line across the middle of the screen, as on
// the reference; once the hero has gone it docks into a slim bar at the top
export default function V2Nav({ active = "home" }) {
  const { t, toggleLanguage } = useLanguage();
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    // Dock as soon as the pinned hero starts to scroll away
    const onScroll = () => setDocked(window.scrollY > window.innerHeight * 0.98);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    ["home", "/v2", t.nav.home],
    ["residential", "/residential", t.nav.residential],
    ["hospitality", "/hospitality", t.nav.hospitality],
    ["gallery", "/gallery", t.nav.gallery],
    ["contact", "#contact", t.nav.contact],
  ];

  return (
    <header
      className={`fixed inset-x-0 z-50 text-paper transition-[top,transform,background-color] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
        docked ? "top-0 translate-y-0 bg-ink/92 backdrop-blur-sm" : "top-1/2 -translate-y-1/2 bg-transparent"
      }`}
    >
      <div className="px-5 md:px-8 lg:px-12">
        <div
          className={`flex items-center gap-6 md:gap-10 transition-[padding,border-color] duration-700 ${
            docked ? "py-3 border-b border-paper/15" : "pt-3 border-t border-paper/70"
          }`}
        >
          {/* Small mark appears only in the docked bar */}
          <Link
            href="/v2"
            aria-label="AJID"
            className={`shrink-0 transition-[opacity,width] duration-500 overflow-hidden ${docked ? "opacity-100 w-16" : "opacity-0 w-0"}`}
          >
            <svg viewBox={LATIN_VIEWBOX} className="h-3 w-auto fill-paper" aria-hidden="true">
              <LatinMarkPaths />
            </svg>
          </Link>

          <nav className="flex-1 flex items-center justify-between gap-5 overflow-x-auto text-[13px] md:text-[15px] [scrollbar-width:none]">
            {items.map(([id, href, label]) => (
              <Link
                key={id}
                href={href}
                className={`flex items-center gap-2 whitespace-nowrap transition-opacity hover:opacity-100 ${
                  active === id ? "opacity-100" : "opacity-75"
                }`}
              >
                {active === id && <span className="w-1.5 h-1.5 rounded-full bg-paper" aria-hidden="true" />}
                {label}
              </Link>
            ))}
            <button type="button" onClick={toggleLanguage} className="whitespace-nowrap opacity-75 hover:opacity-100 cursor-pointer">
              {t.nav.langToggle}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
