"use client";

import { useEffect, useRef } from "react";

// One observer for the whole page: each element is shown once, the first time
// it comes into view, then left alone
let observer;
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
  }
  return observer;
}

// Rises and fades in as it enters the view (styles in globals.css, which also
// turn it off for reduced motion). `delay` staggers neighbours, in ms.
export default function Reveal({ as: Tag = "div", delay = 0, style, children, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = getObserver();
    o.observe(el);
    return () => o.unobserve(el);
  }, []);

  return (
    <Tag ref={ref} data-reveal="" style={delay ? { ...style, "--reveal-delay": `${delay}ms` } : style} {...rest}>
      {children}
    </Tag>
  );
}
