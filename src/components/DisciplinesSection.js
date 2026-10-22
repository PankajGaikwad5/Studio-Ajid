"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, Compass } from "lucide-react";

export default function DisciplinesSection() {
  const { t, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const listRef = useRef(null);

  const items = t.disciplines.items;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0, x: isRTL ? 40 : -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isRTL]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="disciplines"
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-[#09090b] text-[#edece6] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.disciplines.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
            {t.disciplines.title}
          </h2>
          <p className="text-sm md:text-base text-white/60 font-light mt-3">
            {t.disciplines.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div ref={listRef} className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.number}
                className="group py-8 md:py-12 transition-colors duration-300 hover:bg-white/[0.015]"
              >
                {/* Header row */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between text-left cursor-pointer"
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <div className="flex items-baseline gap-6 md:gap-12">
                    <span className="text-sm md:text-base font-mono text-[#c5a880] font-semibold">
                      {item.number}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-white group-hover:text-[#c5a880] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-white/70 group-hover:text-white group-hover:border-[#c5a880]/50 transition-all">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Collapsible Details */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
                  }`}
                  style={{ direction: isRTL ? "rtl" : "ltr" }}
                >
                  <div className="md:ps-20 max-w-3xl">
                    <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="glass-pill px-3 py-1 rounded-full text-xs text-white/80 font-mono tracking-wider"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
