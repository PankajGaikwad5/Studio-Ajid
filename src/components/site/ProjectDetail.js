"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import PageShell, { PAGE_GUTTER } from "./PageShell";
import { useCopy } from "./useCopy";
import { findProject } from "@/data/projects";

// Photos stacked down the left, each nearly a screen tall; the text column on
// the right stays in view. Clicking a photo opens a full-screen viewer.
export default function ProjectDetail({ category, slug }) {
  const { c, pick, isRTL } = useCopy();
  const project = findProject(category, slug);
  const photos = [project.cover, ...project.images];
  const [viewing, setViewing] = useState(null);

  return (
    <PageShell active="interiors">
      <div className={`${PAGE_GUTTER} pt-12 md:pt-20 pb-24 md:pb-32 grid md:grid-cols-12 gap-10 md:gap-6`}>
        {/* Photos */}
        <div className="order-2 md:order-1 md:col-span-6 lg:col-span-5 space-y-6 md:space-y-20">
          {photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setViewing(i)}
              aria-label={`${pick(project.title)}, ${i + 1} / ${photos.length}`}
              className="group relative block w-full h-[70vh] md:h-[calc(100vh-5rem)] overflow-hidden cursor-zoom-in focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy"
            >
              <Image
                src={src}
                alt={i === 0 ? pick(project.title) : ""}
                fill
                preload={i === 0}
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 48vw, 90vw"
                className="object-cover transition-opacity duration-500 group-hover:opacity-90"
              />
            </button>
          ))}
        </div>

        {/* Text, held in view while the photos scroll */}
        <div className="order-1 md:order-2 md:col-span-6 lg:col-span-4 lg:col-start-9">
          <div className="md:sticky md:top-10">
            <h1 className="pb-5 border-b border-navy/15 text-xl md:text-2xl leading-tight">
              {pick(project.title)}, {pick(project.location)}
            </h1>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed">
              <p>{pick(project.summary)}</p>
              {[...pick(project.body), ...c.detailFiller].map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {viewing !== null && (
        <Viewer
          photos={photos}
          start={viewing}
          title={pick(project.title)}
          isRTL={isRTL}
          onClose={() => setViewing(null)}
        />
      )}
    </PageShell>
  );
}

// Full-screen carousel on the beige: arrows, keyboard (← → Esc), swipe, and a counter
function Viewer({ photos, start, title, isRTL, onClose }) {
  const [index, setIndex] = useState(start);
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const count = photos.length;

  const go = useCallback((step) => setIndex((i) => (i + step + count) % count), [count]);

  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(isRTL ? -1 : 1);
      if (e.key === "ArrowLeft") go(isRTL ? 1 : -1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      opener?.focus?.();
    };
  }, [go, isRTL, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-70 bg-beige text-navy flex flex-col animate-[fadeUp_0.3s_ease-out]"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 !== isRTL ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-5 md:px-8 py-4 text-sm">
        <p>
          {title} <span className="tabular-nums ms-3">{index + 1} / {count}</span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 px-3 py-1.5 cursor-pointer underline-offset-4 decoration-1 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
          Close
        </button>
      </div>

      <div className="relative flex-1 min-h-0 mx-5 md:mx-20 mb-6">
        {photos.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === index ? `${title}, ${i + 1} / ${count}` : ""}
            fill
            sizes="90vw"
            className={`object-contain transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* Previous and next, at the screen edges */}
      {[
        [-1, "Previous", ChevronLeft, "start-2 md:start-5"],
        [1, "Next", ChevronRight, "end-2 md:end-5"],
      ].map(([step, label, Icon, pos]) => (
        <button
          key={label}
          type="button"
          onClick={() => go(step)}
          aria-label={label}
          className={`absolute top-1/2 -translate-y-1/2 ${pos} p-3 cursor-pointer hover:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-navy`}
        >
          <Icon className={`w-7 h-7 ${isRTL ? "rotate-180" : ""}`} strokeWidth={1} />
        </button>
      ))}
    </div>
  );
}
