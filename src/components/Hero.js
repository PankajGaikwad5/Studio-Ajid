"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LatinMarkPaths, ArabicMarkPaths, LATIN_VIEWBOX, ARABIC_VIEWBOX } from "./marks";

export default function Hero() {
  const { t, isRTL } = useLanguage();
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // As in the reference video: the hero stays pinned at full height while
      // each word, as a whole, rises and slides toward its own side out of frame
      // and the image moves slightly; once the words are gone the pin releases
      const dir = isRTL ? -1 : 1;
      const exitDistance = () => window.innerWidth * 0.6;
      const riseDistance = () => -window.innerHeight * 0.6;

      const scrollTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          // Lenis smooths the scroll, so map progress directly
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Background: slight upward drift and zoom while pinned
      scrollTl.to(bgImageRef.current, { yPercent: -4, scale: 1.06 }, 0);

      // Copyright year fades out early
      scrollTl.to(yearRef.current, { opacity: 0, duration: 0.3 }, 0);

      // Top word rises and slides toward its own edge
      scrollTl.to(
        line1Ref.current,
        { x: () => -exitDistance() * dir, y: riseDistance },
        0
      );

      // Bottom word rises and slides toward the opposite edge
      scrollTl.to(
        line2Ref.current,
        { x: () => exitDistance() * dir, y: riseDistance },
        0
      );
    }, heroRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [isRTL]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-screen min-h-[640px] overflow-hidden select-none bg-[#09090b]"
    >
      <div className="relative w-full h-full flex flex-col justify-between">
      {/* Background Architectural Image: Authentic Folded Brick Vault Geometry */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <div
          ref={bgImageRef}
          className="relative w-full h-full will-change-transform pointer-events-none"
        >
          <Image
            src="/images/eladio-san-pedro.jpg"
            alt="Studio Ajid Brick Vault Architecture"
            fill
            preload
            quality={90}
            className="object-cover object-center select-none"
            sizes="100vw"
          />
          {/* Warm dark overlay: dims the bricks and deepens the edges so the type reads clearly */}
          <div className="absolute inset-0 bg-[#1a0d06]/45 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_55%,transparent_30%,rgba(10,4,2,0.55)_100%)] pointer-events-none" />
        </div>
      </div>

      {/* TOP-LEFT WORDMARK: Latin "AJID" logo
          Width fills half the screen (88% on phones); the vh cap keeps it
          under ~27% of the height so it never reaches the navbar */}
      <div
        className="relative z-10 pt-5 sm:pt-8 md:pt-10 px-5 sm:px-8 md:px-10 lg:px-12 pointer-events-none"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <svg
          ref={line1Ref}
          viewBox={LATIN_VIEWBOX}
          role="img"
          aria-label={t.hero.topWord}
          className="block w-[min(88vw,142vh)] md:w-[min(50vw,142vh)] h-auto fill-[#ede3d6] will-change-transform"
        >
          <LatinMarkPaths />
        </svg>
      </div>

      {/* Spacious middle clearing: allows the fixed middle-left column navbar to stand out */}
      <div className="flex-1 pointer-events-none" />

      {/* BOTTOM ROW: Year on Left, "Ajid" on Right */}
      <div
        className="relative z-10 pb-5 sm:pb-8 md:pb-10 px-5 sm:px-8 md:px-10 lg:px-12 flex items-end justify-between gap-6 pointer-events-none"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        {/* Bottom Left: Copyright Year (e.g. "© 2026") */}
        <div
          ref={yearRef}
          className="text-xs sm:text-[13px] font-normal text-[#ede3d6] pointer-events-auto"
        >
          {t.hero.copyright}
        </div>

        {/* Bottom Right: Arabic "عجيد" logo, same width rule as the Latin mark */}
        <svg
          ref={line2Ref}
          viewBox={ARABIC_VIEWBOX}
          role="img"
          aria-label={t.hero.bottomWord}
          className="block shrink-0 w-[min(88vw,134vh)] md:w-[min(50vw,134vh)] h-auto fill-[#ede3d6] will-change-transform"
        >
          <ArabicMarkPaths />
        </svg>
      </div>
      </div>
    </section>
  );
}
