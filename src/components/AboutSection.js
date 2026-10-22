"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Quote } from "lucide-react";

export default function AboutSection() {
  const { t, isRTL } = useLanguage();
  const sectionRef = useRef(null);
  const textBlockRef = useRef(null);
  const statsRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in headline
      gsap.fromTo(
        textBlockRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textBlockRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stagger stats
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Quote reveal
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-[#09090b] text-[#edece6] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle radial glow in background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#c5a880]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Section Tag */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.manifesto.sectionTag}</span>
        </div>

        {/* Large Editorial Headline */}
        <div ref={textBlockRef} className="max-w-4xl mb-16 md:mb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light text-white leading-[1.18] tracking-tight">
            {t.manifesto.headlineLead}{" "}
            <span className="italic font-normal text-[#c5a880]">
              {t.manifesto.headlineHighlight}
            </span>{" "}
            {t.manifesto.headlineTrail}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            <p>{t.manifesto.bodyParagraph1}</p>
            <p>{t.manifesto.bodyParagraph2}</p>
          </div>
        </div>

        {/* Studio Statistics */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-12 border-t border-white/[0.08]"
        >
          {t.manifesto.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-8 rounded-2xl hover:border-[#c5a880]/40 transition-all duration-300 group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white group-hover:text-[#c5a880] transition-colors mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-white/90 uppercase tracking-wider mb-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-white/40 font-light">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Quote & Featured Architectural Detail */}
        <div
          ref={quoteRef}
          className="mt-20 md:mt-28 glass-panel rounded-3xl p-8 md:p-14 relative overflow-hidden border border-white/[0.08]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <Quote className="w-8 h-8 text-[#c5a880]/40 mb-6" />
              <blockquote className="text-xl sm:text-2xl md:text-3xl font-display text-white font-light italic leading-relaxed mb-6">
                “{t.manifesto.quote}”
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#18181b] border border-white/20 flex items-center justify-center font-display font-bold text-[#c5a880] text-sm">
                  AJ
                </div>
                <div>
                  <div className="font-semibold text-sm text-white uppercase tracking-wider">
                    {t.manifesto.quoteAuthor}
                  </div>
                  <div className="text-xs text-white/50 tracking-wider">
                    {t.manifesto.quoteRole}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 relative h-64 md:h-72 rounded-2xl overflow-hidden border border-white/10 group">
              <Image
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
                alt="Studio Ajid Material Study"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-[10px] uppercase tracking-widest text-white/80">
                  Materiality Study No. 04 — Desert Travertine & Shadow
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
