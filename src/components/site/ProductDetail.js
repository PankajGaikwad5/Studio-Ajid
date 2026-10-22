"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, Share, X } from "lucide-react";
import PageShell from "./PageShell";
import EnquiryForm from "./EnquiryForm";
import { useCopy } from "./useCopy";
import { findProduct, FINISHES } from "@/data/products";

// Product page after the reference: breadcrumb, two views side by side with
// arrows, a title bar with save/share/close, then the description beside a
// ruled spec table, and the breadcrumb again at the end. In the home page's
// beige and navy; on wider screens the page clears the docked menu column.
const WORDS = {
  en: { type: "Type", save: "Save", saved: "Saved", share: "Share", copied: "Link copied", close: "Back to gallery", prev: "Previous view", next: "Next view", down: "Details", enquireLabel: "Enquiries" },
  ar: { type: "النوع", save: "حفظ", saved: "محفوظ", share: "مشاركة", copied: "نُسخ الرابط", close: "العودة إلى المعرض", prev: "العرض السابق", next: "العرض التالي", down: "التفاصيل", enquireLabel: "الاستفسارات" },
};

function Breadcrumb({ c, pick, product }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <Link href={`/${product.collection}`} className="hover:underline underline-offset-4">{c[product.collection].title}</Link>
      <span className="mx-1.5">&gt;</span>
      <span>{c.gallery.types[product.type]}</span>
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

  const specs = [
    [w.type, c.gallery.types[product.type]],
    [c.facts.material, pick(product.material)],
    [c.facts.dimensions, product.dimensions],
    [c.facts.edition, pick(product.edition)],
  ];

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
          <div ref={detailsRef} className="scroll-mt-4 flex items-center justify-between gap-6 px-4 md:px-5 py-3 border-b border-navy/15">
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

          {/* Description and specifications */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-8 px-4 md:px-5 pt-10 md:pt-14 pb-16 md:pb-24">
            <div>
              <p className="text-xl md:text-[22px] leading-snug max-w-[44ch]">{pick(product.description)}</p>
              <button type="button" onClick={() => setEnquiring(true)} className="group mt-10 inline-flex items-center gap-3 text-base cursor-pointer">
                <span className="h-px w-8 bg-current transition-[width] duration-500 group-hover:w-12" />
                {c.buy.button}
              </button>
            </div>
            <dl className="border-t border-navy/15 text-sm self-start">
              {specs.map(([label, value]) => (
                <div key={label} className="grid grid-cols-2 gap-6 py-3 border-b border-navy/15">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-6 py-3 border-b border-navy/15">
                <dt>{c.facts.finish}</dt>
                <dd>
                  <ul className="space-y-1.5">
                    {product.finishes.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full ring-1 ring-navy/25" style={{ backgroundColor: FINISHES[f].hex }} />
                        {pick(FINISHES[f].name)}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div className="grid grid-cols-2 gap-6 py-3 border-b border-navy/15">
                <dt>{w.enquireLabel}</dt>
                <dd>
                  <button type="button" onClick={() => setEnquiring(true)} className="underline underline-offset-4 decoration-navy/40 hover:decoration-navy cursor-pointer">
                    {c.buy.button}
                  </button>
                </dd>
              </div>
            </dl>
          </div>

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
      className="fixed inset-0 z-70 bg-beige text-navy overflow-y-auto overscroll-contain animate-[fadeUp_0.3s_ease-out]"
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
    </div>
  );
}
