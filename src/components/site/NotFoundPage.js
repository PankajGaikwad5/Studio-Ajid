"use client";

import Link from "next/link";
import PageShell, { PAGE_GUTTER } from "./PageShell";
import { useCopy } from "./useCopy";

// The 404 page in the site's beige and navy, with the menu and footer
export default function NotFoundPage() {
  const { c } = useCopy();
  return (
    <PageShell>
      <div className={`${PAGE_GUTTER} pt-12 md:pt-20 pb-32 md:pb-48`}>
        <h1 className="pb-6 border-b border-navy/15 text-[clamp(1.875rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.01em]">{c.notFound.title}</h1>
        <Link href="/" className="mt-10 inline-block underline underline-offset-[6px] decoration-navy/30 hover:decoration-navy">
          {c.notFound.link}
        </Link>
      </div>
    </PageShell>
  );
}
