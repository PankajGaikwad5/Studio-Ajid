"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, X, Maximize2 } from "lucide-react";

export default function GallerySection() {
  const { t, isRTL } = useLanguage();
  const [activePhoto, setActivePhoto] = useState(null);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const galleryItems = t.gallery?.items || [];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
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
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-[#08080a] text-[#edece6] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c5a880] mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>{t.gallery?.sectionTag || "04 / SPATIAL GALLERY"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
              {t.gallery?.title || "Material Studies & Form"}
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light mt-2 max-w-xl">
              {t.gallery?.subtitle || "Capturing the tactile dialogue between raw stone, light shafts, and monolithic geometry."}
            </p>
          </div>
        </div>

        {/* Masonry / Dynamic Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => {
            const isTall = item.aspect === "tall";
            const isWide = item.aspect === "wide";

            return (
              <div
                key={index}
                onClick={() => setActivePhoto(item)}
                className={`group relative overflow-hidden rounded-2xl glass-panel border border-white/10 cursor-pointer ${
                  isWide ? "sm:col-span-2 aspect-[16/9]" : isTall ? "aspect-[4/5]" : "aspect-square"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Ambient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />

                {/* Inspect Button */}
                <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-pill flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 className="w-4 h-4 text-[#c5a880]" />
                </div>

                {/* Caption Bar */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880] mb-1">
                    {item.location}
                  </div>
                  <div className="text-sm sm:text-base font-display font-medium text-white">
                    {item.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-20 glass-pill p-2.5 rounded-full text-white/80 hover:text-white hover:border-[#c5a880] transition-colors cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full aspect-[16/10] max-h-[75vh] rounded-2xl overflow-hidden border border-white/15">
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>

            <div className="w-full mt-4 flex items-center justify-between text-xs sm:text-sm text-white/80 px-2">
              <span className="font-display font-medium text-base text-white">{activePhoto.title}</span>
              <span className="font-mono text-[#c5a880] tracking-wider uppercase">{activePhoto.location}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
