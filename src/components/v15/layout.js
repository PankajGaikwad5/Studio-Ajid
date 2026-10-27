// Layout constants shared by v15's home page, footer and inner pages
export const PAD = "px-6 md:px-10 lg:px-14";

// The left rail sits under the docked menu; phones have no column menu, so
// the content takes the full width there
export const RAIL = "bg-beige max-md:hidden";

// One hairline above every section after the strips, so the beige runs on
export const SECTION = `${PAD} border-t border-navy/15`;

// Inner pages: clears the docked menu column from md up (the rail is w-56 at
// md and w-66 at lg); phones use the full width
export const PAGE_GUTTER = "px-5 sm:px-8 md:pl-64 lg:pl-76 md:pr-10 lg:pr-12";

// Brand pattern no. 9, tiled across and down. The file is drawn in the page beige,
// so it is a mask filled with the faintest navy, a soft shadow of the ground.
export const PATTERN_FILL = "absolute inset-0 -z-10 pointer-events-none bg-navy/[0.07] [mask-image:url(/patterns/9-band.png)] [mask-repeat:repeat] [mask-position:left_top] [mask-size:auto_6rem] md:[mask-size:auto_9rem]";

// The same pattern run once across as a band, for single quiet moments
export const PATTERN_BAND = "bg-navy/[0.07] [mask-image:url(/patterns/9-band.png)] [mask-repeat:repeat-x] [mask-position:left_bottom] [mask-size:auto_100%]";

// Type scale taken from hermes.com, as the client asked. Their editorial feel
// comes from wide steps between sizes: headlines 30px, statements 19px, and
// everything else small (12-13px), with labels in spaced capitals.
export const TYPE = {
  display: "text-[1.625rem] md:text-[1.875rem] leading-[1.2]",
  statement: "text-[17px] md:text-[19px] leading-[1.4]",
  body: "text-[13px] leading-[1.45]",
  small: "text-xs leading-[1.5]",
  label: "text-[11px] md:text-xs uppercase tracking-[0.15em]",
};
