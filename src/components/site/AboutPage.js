"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageShell, { PAGE_GUTTER } from "./PageShell";
import Reveal from "./Reveal";
import { useCopy } from "./useCopy";
import { useLanguage } from "@/context/LanguageContext";

// The studio in a few calm parts: title and statement, one wide photograph,
// then the practice, what the studio does and its studios, each a labelled row
// between hairlines, ending with a way to get in touch
function Row({ label, children }) {
  return (
    <Reveal as="section" className="grid md:grid-cols-12 gap-6 md:gap-6 py-14 md:py-20 border-t border-navy/15">
      <h2 className="md:col-span-4 text-xs tracking-[0.14em] uppercase">{label}</h2>
      <div className="md:col-span-8">{children}</div>
    </Reveal>
  );
}

export default function AboutPage() {
  const { c } = useCopy();
  const { t } = useLanguage();
  const a = c.about;

  return (
    <PageShell active="about">
      <div className={`${PAGE_GUTTER} pt-12 md:pt-20 pb-24 md:pb-32`}>
        <Reveal className="pb-6 border-b border-navy/15">
          <h1 className="text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em]">{a.title}</h1>
        </Reveal>

        <Reveal as="p" delay={120} className="mt-12 md:mt-16 text-[clamp(1.625rem,2.6vw,2.5rem)] leading-[1.15] tracking-[-0.01em] max-w-[28ch]">
          {c.home2.statement}
        </Reveal>

        <Reveal delay={200} className="relative mt-14 md:mt-20 mb-14 md:mb-20 aspect-4/3 md:aspect-16/9 overflow-hidden">
          <Image src="/images/dieste-1.jpg" alt="" fill sizes="(min-width: 768px) 70vw, 90vw" className="object-cover" />
        </Reveal>

        <Row label={a.practiceLabel}>
          <div className="space-y-5 text-base md:text-lg leading-relaxed max-w-[60ch]">
            {a.practice.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Row>

        <Row label={a.disciplinesLabel}>
          <ul>
            {a.disciplines.map((d, i) => (
              <li key={d.title} className={`grid sm:grid-cols-8 gap-2 sm:gap-6 py-5 ${i ? "border-t border-navy/15" : "pt-0"}`}>
                <h3 className="sm:col-span-3 text-xl md:text-2xl">{d.title}</h3>
                <p className="sm:col-span-5 leading-relaxed">{d.text}</p>
              </li>
            ))}
          </ul>
        </Row>

        <Row label={a.studiosLabel}>
          <ul className="grid sm:grid-cols-3 gap-8">
            {t.contact.studios.map((s) => (
              <li key={s.city}>
                <p className="text-xl md:text-2xl">{s.city}</p>
                <p className="mt-2 text-sm leading-relaxed">{s.address}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs tracking-[0.14em] uppercase">{c.home2.studioNote}</p>
        </Row>

        <Reveal className="pt-14 md:pt-20 border-t border-navy/15">
          <Link href="/contact" className="group inline-flex items-start gap-2.5 text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em]">
            {a.contactLink}
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.25}
              className="mt-[0.12em] w-[0.5em] h-[0.5em] shrink-0 rtl:-scale-x-100 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            />
          </Link>
        </Reveal>
      </div>
    </PageShell>
  );
}
