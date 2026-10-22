"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// A single "Menu" button in the hero's empty top-right corner; it opens a
// full-screen menu, so nothing competes with the hero lettering
export default function V3Menu() {
  const { t, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.98);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape and lock the page behind the open menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const items = [
    ["/v3", t.nav.home],
    ["/residential", t.nav.residential],
    ["/hospitality", t.nav.hospitality],
    ["/gallery", t.nav.gallery],
    ["#contact", t.nav.contact],
  ];

  return (
    <>
      <div className="fixed top-5 end-5 md:top-7 md:end-8 z-50 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleLanguage}
          className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-colors ${
            pastHero ? "bg-ink/85 text-paper" : "bg-paper/15 text-paper backdrop-blur-sm"
          }`}
        >
          {t.nav.langToggle}
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="v3-menu"
          className={`px-5 py-2 rounded-full text-sm cursor-pointer transition-colors ${
            pastHero ? "bg-ink text-paper" : "bg-paper text-ink"
          }`}
        >
          Menu
        </button>
      </div>

      <div
        id="v3-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open || undefined}
        className={`fixed inset-0 z-[60] bg-ink text-paper transition-[clip-path] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="h-full flex flex-col px-5 md:px-8 lg:px-12 py-6 md:py-8">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-paper text-ink text-sm cursor-pointer"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
              Close
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-1 md:gap-2">
            {items.map(([href, label], i) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
                className={`self-start text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.02] tracking-[-0.02em] transition-[opacity,transform,color] duration-700 hover:text-beige ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <p className="text-paper/60 text-sm">{t.contact.emailAddress}</p>
        </div>
      </div>
    </>
  );
}
