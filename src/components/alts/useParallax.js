"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Moves every [data-speed] element inside `ref` at its own rate while the
// section scrolls past: positive speeds drift up faster, negative lag behind
export function useParallax(ref) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset.speed) || 0;
        gsap.fromTo(
          el,
          { yPercent: speed * 30 },
          {
            yPercent: speed * -30,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}
