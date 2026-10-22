"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

// Items that open their own page rather than scrolling the home page
const ROUTES = { residential: "/residential", hospitality: "/hospitality", gallery: "/gallery" };

export default function Navbar({ onNavigate, activeFilter = "all" }) {
  const { t, toggleLanguage, isRTL } = useLanguage();
  const [currentSection, setCurrentSection] = useState("home");
  const router = useRouter();
  const pathname = usePathname();
  // On a portfolio page the active item comes from the URL, not the scroll
  const pageSection = pathname === "/" ? null : pathname.split("/")[1];
  useEffect(() => {
    if (pageSection) return;

    const handleScroll = () => {
      // Near top of page is always home
      if (window.scrollY < 120) {
        setCurrentSection("home");
        return;
      }

      const sections = [
        { id: "contact", navId: "contact" },
        { id: "disciplines", navId: "about" },
        { id: "gallery", navId: "gallery" },
        { id: "works", navId: activeFilter === "hospitality" ? "hospitality" : "residential" },
        { id: "about", navId: "about" },
        { id: "home", navId: "home" },
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setCurrentSection(sec.navId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeFilter, pageSection]);

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "residential", label: t.nav.residential },
    { id: "hospitality", label: t.nav.hospitality },
    { id: "about", label: t.nav.about },
    { id: "gallery", label: t.nav.gallery },
    { id: "contact", label: t.nav.contact },
  ];

  const handleClick = (id) => {
    if (ROUTES[id]) {
      router.push(ROUTES[id]);
      return;
    }
    // Home-page sections, reached from another page
    if (pageSection) {
      router.push(id === "home" ? "/" : `/#${id}`);
      return;
    }
    setCurrentSection(id);
    if (onNavigate) {
      onNavigate(id);
    } else {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <aside
      className="fixed z-50 top-1/2 -translate-y-1/2 left-5 sm:left-8 md:left-10 lg:left-12 pointer-events-auto select-none transition-all duration-300"
      style={{
        direction: isRTL ? "rtl" : "ltr",
      }}
      aria-label="Studio Navigation"
    >
      <nav className="flex flex-col items-start gap-2.5 sm:gap-3 md:gap-3.5 py-2">
        {navItems.map((item) => {
          const isActive = (pageSection ?? currentSection) === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="group relative flex items-center gap-2.5 text-left cursor-pointer transition-all duration-300"
            >
              {/* Active Indicator Dot */}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#ede3d6] opacity-100 scale-100 shadow-[0_0_8px_rgba(237,227,214,0.9)]"
                    : "bg-[#ede3d6]/40 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
                }`}
              />

              {/* Nav Item Label */}
              <span
                className={`font-sans text-[12px] sm:text-[13px] md:text-[14px] tracking-normal transition-all duration-300 ${
                  isActive
                    ? "text-[#ede3d6] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    : "text-[#ede3d6]/70 group-hover:text-white group-hover:translate-x-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Subtle architectural separator */}
        <div className="w-6 h-px bg-[#ede3d6]/20 my-1" />

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="text-[12px] sm:text-[13px] md:text-[14px] text-[#ede3d6]/70 hover:text-white transition-colors cursor-pointer text-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] font-sans"
          aria-label="Toggle Language"
        >
          {t.hero.langToggle}
        </button>
      </nav>
    </aside>
  );
}
