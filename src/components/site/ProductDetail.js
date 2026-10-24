"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, Share, X } from "lucide-react";
import PageShell from "./PageShell";
import EnquiryForm from "./EnquiryForm";
import Reveal from "./Reveal";
import { useCopy } from "./useCopy";
import { findProduct } from "@/data/products";
import { PATTERN_BAND } from "@/components/v15/layout";

// Experimental: the brand pattern behind the foot of the making film, and
// along the bottom of the enquiry panel. Set either to false to undo.
const STORY_PATTERN = true;
const ENQUIRY_PATTERN = true;

// Product page: breadcrumb, two views side by side with arrows, a title bar
// with save/share/close, then the dimensions beside a short description and a
// few details. The studio's own objects go on to the story behind the piece
// and a film of its making. On wider screens the page clears the menu column.
const WORDS = {
  en: { story: "The story behind", making: "In the making", save: "Save", saved: "Saved", share: "Share", copied: "Link copied", close: "Back to gallery", prev: "Previous view", next: "Next view", down: "Details", enquireLabel: "Enquiries", interested: "Interested in this piece?" },
  ar: { story: "القصة وراء القطعة", making: "مراحل الصنع", save: "حفظ", saved: "محفوظ", share: "مشاركة", copied: "نُسخ الرابط", close: "العودة إلى المعرض", prev: "العرض السابق", next: "العرض التالي", down: "التفاصيل", enquireLabel: "الاستفسارات", interested: "مهتم بهذه القطعة؟" },
};

function Breadcrumb({ c, pick, product }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <Link href={`/${product.collection}`} className="hover:underline underline-offset-4">{c[product.collection].title}</Link>
      <span className="mx-1.5">&gt;</span>
      <span>{pick(product.name)}</span>
    </nav>
  );
}

export default function ProductDetail({ slug }) {
  const { c, pick, lang, isRTL } = useCopy();
  const w = WORDS[lang];
  const product = findProduct(slug);
  // Cut-outs first, then the original photograph showing the piece in a room
  const views = [
    ...product.images,
    ...(product.source?.[0] ? [`https://images.unsplash.com/${product.source[0]}?auto=format&fit=crop&q=80&w=2000`] : []),
  ];
  const [start, setStart] = useState(0);
  const [visible, setVisible] = useState(2);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const detailsRef = useRef(null);
  const [enquiring, setEnquiring] = useState(false);

  // Two views at a time on wider screens, one on phones
  useEffect(() => {
    const mq = matchMedia("(min-width: 768px)");
    const update = () => setVisible(mq.matches ? 2 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const last = Math.max(0, views.length - visible);
  const at = Math.min(start, last);
  const atEnd = at >= last;

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: pick(product.name), url });
      else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // Sharing was cancelled; nothing to do
    }
  };

  return (
    <PageShell active={product.collection}>
      <div dir="ltr" className="flex">
        {/* Room for the docked menu column (phones have none) */}
        <div aria-hidden="true" className="shrink-0 max-md:hidden md:w-56 lg:w-66" />

        <div dir={isRTL ? "rtl" : "ltr"} className="flex-1 min-w-0">
          <div className="px-5 md:px-5 pt-4 pb-3">
            <Breadcrumb c={c} pick={pick} product={product} />
          </div>

          {/* Views */}
          {/* Carousel: slides sideways one view at a time. At the last view the
              forward arrow turns to point down and takes you to the details. */}
          <div className="relative overflow-hidden h-[70vh] md:h-[calc(100vh-7.5rem)] min-h-105">
            <div
              className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{ transform: `translateX(${(isRTL ? 1 : -1) * at * (100 / visible)}%)` }}
            >
              {views.map((src, i) => (
                <div
                  key={src}
                  aria-hidden={i < at || i >= at + visible || undefined}
                  className="relative shrink-0 w-full md:w-1/2 h-full border-e border-navy/10"
                >
                  <Image
                    src={src}
                    alt={i === 0 ? pick(product.name) : ""}
                    fill
                    preload={i < 2}
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className={src.startsWith("/") ? "object-contain p-[12%]" : "object-cover"}
                  />
                </div>
              ))}
            </div>

            {/* Back: only once you have moved on from the first view */}
            <button
              type="button"
              onClick={() => setStart(Math.max(0, at - 1))}
              aria-label={w.prev}
              tabIndex={at > 0 ? 0 : -1}
              className={`absolute top-1/2 -translate-y-1/2 inset-s-3 md:inset-s-5 p-2 cursor-pointer transition-opacity duration-500 hover:opacity-60 ${
                at > 0 ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <ArrowLeft className={`w-12 h-12 ${isRTL ? "rotate-180" : ""}`} strokeWidth={0.75} />
            </button>

            {/* Forward, turning downward at the end */}
            <button
              type="button"
              onClick={() => (atEnd ? detailsRef.current?.scrollIntoView({ behavior: "smooth" }) : setStart(at + 1))}
              aria-label={atEnd ? w.down : w.next}
              className="absolute top-1/2 -translate-y-1/2 inset-e-3 md:inset-e-5 p-2 cursor-pointer hover:opacity-60"
            >
              <ArrowRight
                className={`w-12 h-12 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  atEnd ? (isRTL ? "-rotate-90 -scale-x-100" : "rotate-90") : isRTL ? "-scale-x-100" : ""
                }`}
                strokeWidth={0.75}
              />
            </button>
          </div>

          {/* Title bar */}
          <div ref={detailsRef} className="scroll-mt-4 flex items-center justify-between gap-6 px-5 py-3 border-b border-navy/15">
            <h1 className="text-lg md:text-2xl uppercase leading-tight">{pick(product.name)}</h1>
            <div className="flex items-center gap-5 md:gap-7 shrink-0">
              <span className="hidden sm:inline text-lg md:text-xl">{pick(product.edition)}</span>
              <button
                type="button"
                onClick={() => setSaved((s) => !s)}
                aria-pressed={saved}
                aria-label={saved ? w.saved : w.save}
                className="cursor-pointer hover:opacity-60"
              >
                <Heart className="w-6 h-6" strokeWidth={1.25} fill={saved ? "currentColor" : "none"} />
              </button>
              <button type="button" onClick={share} aria-label={w.share} className="relative cursor-pointer hover:opacity-60">
                <Share className="w-6 h-6" strokeWidth={1.25} />
                {shared && (
                  <span role="status" className="absolute top-full mt-2 end-0 whitespace-nowrap text-xs bg-beige text-navy border border-navy/15 px-2 py-1">
                    {w.copied}
                  </span>
                )}
              </button>
              <Link href={`/${product.collection}`} aria-label={product.collection === "gallery" ? w.close : c.objects.title} className="hover:opacity-60">
                <X className="w-6 h-6" strokeWidth={1.25} />
              </Link>
            </div>
          </div>

          {/* The description with a quiet way to enquire, beside a few ruled
              details. No type, no finishes. */}
          <Reveal className="grid md:grid-cols-12 gap-10 md:gap-8 px-5 pt-10 md:pt-14 pb-16 md:pb-24">
            <div className="md:col-span-6">
              <p className="text-lg md:text-xl leading-relaxed max-w-[40ch]">{pick(product.description)}</p>
              <p className="mt-8 text-sm">
                {w.interested}{" "}
                <button type="button" onClick={() => setEnquiring(true)} className="underline underline-offset-4 decoration-navy/40 hover:decoration-navy transition-colors duration-300 cursor-pointer">
                  {c.buy.button}
                </button>
              </p>
            </div>
            <dl className="md:col-span-5 md:col-start-8 self-start border-t border-navy/15 text-sm">
              {[
                [c.facts.dimensions, product.dimensions],
                [c.facts.material, pick(product.material)],
                [c.facts.edition, pick(product.edition)],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 py-3 border-b border-navy/15">
                  <dt>{label}</dt>
                  <dd className="tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* The studio's own pieces: the story behind it, then its making */}
          {product.story && <Story product={product} w={w} pick={pick} />}

          {/* Breadcrumb band */}
          <div className="border-t border-navy/15 px-5 md:px-5 py-5">
            <Breadcrumb c={c} pick={pick} product={product} />
          </div>
        </div>
      </div>

      {enquiring && <BuyPanel product={product} onClose={() => setEnquiring(false)} />}
    </PageShell>
  );
}

// The story behind one of the studio's pieces, set as a spread: the story on
// one side, left-aligned and sitting at the foot of a tall making film on the
// other. Phones read the story first, then the film. The film is muted and
// loops (a still frame instead for anyone who prefers reduced motion).
function Story({ product, w, pick }) {
  const videoRef = useRef(null);
  const { video, poster } = product.making ?? {};

  // Play only while on screen
  useEffect(() => {
    const el = videoRef.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-t border-navy/15 grid md:grid-cols-12 gap-12 md:gap-8 px-5 py-16 md:py-24 md:items-end">
      <Reveal className="md:col-span-5">
        <p className="flex items-center gap-3 text-sm">
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {w.story}
        </p>
        <h2 className="mt-4 text-2xl md:text-[1.75rem] leading-tight">{pick(product.name)}</h2>
        <div className="mt-6 md:mt-8 max-w-[44ch] space-y-4 text-base leading-relaxed">
          {pick(product.story).map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </Reveal>
      {video && (
        <Reveal as="figure" delay={150} className={`md:col-span-6 md:col-start-7 relative isolate ${STORY_PATTERN ? "pb-10 md:pb-14" : ""}`}>
          {/* A band of the pattern runs out to the page edge behind the foot of
              the film, which overlaps it */}
          {STORY_PATTERN && <div aria-hidden="true" className={`absolute -z-10 bottom-0 -inset-x-5 md:inset-x-auto md:-start-[18%] md:-end-5 h-[34%] ${PATTERN_BAND}`} />}
          <div className="relative aspect-4/5 overflow-hidden bg-navy">
            <video
              ref={videoRef}
              src={video}
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-3 text-sm">{w.making}</figcaption>
        </Reveal>
      )}
    </section>
  );
}

// Buy or enquire: a full-screen beige panel with the piece beside the enquiry
// form, which works like the contact page (Send offers WhatsApp or email) and
// writes the piece and its link into the message
function BuyPanel({ product, onClose }) {
  const { c, pick, isRTL } = useCopy();
  const closeRef = useRef(null);
  const b = c.buy;

  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="buy-title"
      dir={isRTL ? "rtl" : "ltr"}
      className="fixed inset-0 z-70 bg-beige text-navy overflow-y-auto overscroll-contain soft-in"
      data-lenis-prevent
    >
      <div className="flex justify-end px-5 md:px-10 lg:px-12 pt-5 md:pt-8">
        <button ref={closeRef} type="button" onClick={onClose} className="inline-flex items-center gap-2 text-sm cursor-pointer underline-offset-4 decoration-1 hover:underline">
          <X className="w-4 h-4" strokeWidth={1.5} />
          {b.close}
        </button>
      </div>

      <div className="px-5 sm:px-8 md:px-10 lg:px-12 pt-8 md:pt-12 pb-20 grid md:grid-cols-12 gap-12 md:gap-6">
        {/* The piece */}
        <div className="md:col-span-4">
          <div className="relative aspect-square border border-navy/10">
            <Image src={product.images[0]} alt={pick(product.name)} fill sizes="(min-width: 768px) 30vw, 90vw" className="object-contain p-[12%]" />
          </div>
          <p className="mt-4 text-sm uppercase tracking-[0.04em]">{pick(product.name)}</p>
          <p className="mt-1 text-sm">{pick(product.material)}</p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <h2 id="buy-title" className="pb-6 mb-10 border-b border-navy/15 text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em]">
            {b.title}
          </h2>
          <EnquiryForm
            lead={b.lead}
            subject={b.subject}
            choice={{ label: b.intentLabel, options: b.intents }}
            context={[`${b.piece}: ${pick(product.name)}`, typeof window === "undefined" ? "" : window.location.href]}
            messageRequired={false}
            idPrefix="buy"
          />
        </div>
      </div>
      {ENQUIRY_PATTERN && <div aria-hidden="true" className={`h-24 md:h-36 ${PATTERN_BAND}`} />}
    </div>
  );
}
