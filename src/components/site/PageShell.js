"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import { LatinMarkPaths, LATIN_VIEWBOX } from "@/components/marks";
import V15Nav from "@/components/v15/V15Nav";
import V15Footer from "@/components/v15/V15Footer";
import { useCopy } from "./useCopy";

export { PAGE_GUTTER } from "@/components/v15/layout";

// Clears the old fixed navbar, which sits on the physical left in both languages
// (right edge ≈150px on phones, ≈210px on desktop). Used by the legacy shell
// and the old site footer.
export const GUTTER = "pl-44 sm:pl-52 md:pl-64 lg:pl-76 pr-5 sm:pr-8 md:pr-10 lg:pr-12";

// The inner pages in the home page's (v15) design: stone beige and deep navy,
// v15's menu docked in its column from the start (three lines on phones), the
// AJID mark top left linking home, and v15's footer. `active` marks the menu
// item for the page.
export default function PageShell({ children, active }) {
  const { isRTL } = useCopy();

  return (
    <div className="min-h-screen bg-beige text-navy">
      <V15Nav alwaysDocked active={active} />
      <header dir="ltr" className="px-5 sm:px-8 md:px-10 lg:px-12 pt-5 md:pt-8">
        <Link href="/" aria-label="AJID" className="inline-block">
          <svg viewBox={LATIN_VIEWBOX} aria-hidden="true" className="block h-6 md:h-8 w-auto fill-navy">
            <LatinMarkPaths />
          </svg>
        </Link>
      </header>
      <main dir={isRTL ? "rtl" : "ltr"}>{children}</main>
      <V15Footer />
    </div>
  );
}

// The previous navy shell with the old navbar and footer, kept for pages that
// still use the old design
export function LegacyPageShell({ children }) {
  const { isRTL } = useCopy();

  return (
    <div className="min-h-screen bg-navy text-beige">
      <Navbar />
      <main dir={isRTL ? "rtl" : "ltr"}>{children}</main>
      <SiteFooter />
    </div>
  );
}

// Arch-topped frame, the recurring motif across the portfolio pages
export function Arch({ className = "", children }) {
  return (
    <div className={`relative overflow-hidden rounded-t-full ${className}`}>{children}</div>
  );
}
