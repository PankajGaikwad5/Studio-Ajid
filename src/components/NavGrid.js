"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Two rows of full-bleed photo panels; the navy gaps between them read as
// mortar joints. Hovering a panel widens it within its row.
const ROWS = [
  [
    { id: "about", image: "/images/dieste-1.jpg" },
    { id: "residential", image: "/images/dieste-2.jpg" },
    { id: "hospitality", image: "/images/dieste-vault.jpg" },
  ],
  [
    { id: "gallery", image: "/images/eladio-san-pedro.jpg" },
    { id: "contact", image: "/images/hero/eladio-hero-bg.webp" },
  ],
];

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function NavGrid({ onNavigate }) {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // The section's one entrance: panels open up from the bottom in turn
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%", once: true },
      });

      tl.fromTo(
        "[data-panel]",
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut", stagger: 0.09 }
      )
        .from("[data-panel-image]", { scale: 1.2, duration: 1.8, ease: "power3.out", stagger: 0.09 }, "<")
        .from("[data-panel-label]", { yPercent: 110, duration: 1, ease: "power3.out", stagger: 0.09 }, "-=1.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const go = (id) => {
    if (onNavigate) return onNavigate(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="index"
      ref={sectionRef}
      aria-label={t.navGrid.title}
      dir="ltr"
      className="relative w-full flex bg-navy text-beige"
    >
      {/* Gutter under the fixed navbar (physical left in both languages) so no
          panel sits beneath its labels */}
      <div aria-hidden="true" className="shrink-0 w-40 sm:w-46 md:w-56 lg:w-66" />

      <div
        dir={isRTL ? "rtl" : "ltr"}
        className="flex-1 min-w-0 flex flex-col gap-1.5 py-1.5 pe-1.5 md:h-screen md:min-h-160"
      >
        {ROWS.map((row, r) => (
          <div key={r} className="flex flex-col md:flex-row gap-1.5 md:flex-1 md:min-h-0">
            {row.map((panel) => (
              <button
                key={panel.id}
                data-panel
                type="button"
                onClick={() => go(panel.id)}
                className={`group relative h-[42vh] min-h-64 md:h-auto md:flex-1 md:hover:grow-[1.7] md:focus-visible:grow-[1.7] transition-[flex-grow] duration-700 ${EASE} overflow-hidden bg-navy text-start cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-beige`}
              >
                <div data-panel-image className="absolute inset-0">
                  <Image
                    src={panel.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 45vw, 80vw"
                    className={`object-cover transition-transform duration-1400 ${EASE} group-hover:scale-105 group-focus-visible:scale-105`}
                  />
                </div>

                {/* Photos stay in natural colour; a neutral fade in the lower half
                    only keeps the label legible */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-black/65 via-black/25 to-transparent" />

                <div className="relative h-full flex flex-col justify-end p-5 sm:p-6 lg:p-8">
                  <div className="overflow-hidden">
                    <h3
                      data-panel-label
                      className="text-3xl sm:text-4xl lg:text-5xl leading-[1.05] max-w-[14ch]"
                    >
                      {t.nav[panel.id]}
                    </h3>
                  </div>
                  {/* Mist rule grows under the label on hover */}
                  <span className={`block mt-3 h-px w-8 bg-mist transition-[width] duration-700 ${EASE} group-hover:w-24 group-focus-visible:w-24`} />
                  {/* Description: always shown on touch/phones, slides in on hover */}
                  <p
                    className={`mt-3 max-w-[32ch] text-sm md:text-base text-mist transition-[opacity,transform] duration-500 ${EASE} md:pointer-fine:opacity-0 md:pointer-fine:translate-y-2 md:pointer-fine:group-hover:opacity-100 md:pointer-fine:group-hover:translate-y-0 md:pointer-fine:group-focus-visible:opacity-100 md:pointer-fine:group-focus-visible:translate-y-0`}
                  >
                    {t.navGrid.items[panel.id]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
