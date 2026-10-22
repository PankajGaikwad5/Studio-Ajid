"use client";

import PageShell from "./PageShell";

// Shown for the moment a detail page is loading: the same beige frame with the
// menu and logo already in place, so the page appears into it rather than
// after a blank screen. The spacer keeps the footer below the fold meanwhile.
export default function PageFallback({ active }) {
  return (
    <PageShell active={active}>
      <div className="min-h-screen" />
    </PageShell>
  );
}
