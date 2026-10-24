// Placeholder pieces: names and copy are illustrative. Images are transparent
// PNG cut-outs made from Unsplash stock photos (ids kept in `source`) until the
// studio's own product shots are available.
const cutout = (name) => `/images/products/${name}.png`;

// Finishes are named after the brand palette (see globals.css tokens)
export const FINISHES = {
  navy: { hex: "#061229", name: { en: "Deep navy", ar: "كحلي داكن" } },
  mist: { hex: "#748796", name: { en: "Mist blue", ar: "أزرق ضبابي" } },
  beige: { hex: "#d5cfc6", name: { en: "Stone beige", ar: "بيج حجري" } },
  walnut: { hex: "#582f0f", name: { en: "Walnut", ar: "بني جوزي" } },
  stone: { hex: "#828282", name: { en: "Stone gray", ar: "رمادي حجري" } },
  burgundy: { hex: "#461b1b", name: { en: "Deep burgundy", ar: "عنابي داكن" } },
};

export const PRODUCT_TYPES = ["seating", "tables", "lighting", "objects"];

// Objects are the studio's own pieces (vessels, bowls and other objects); the
// gallery is the furniture and lighting. Placeholder until the studio's own
// catalogue exists.
export const COLLECTIONS = ["objects", "gallery"];

export const products = [
  {
    slug: "majlis-lounge-chair",
    type: "seating",
    collection: "gallery",
    name: { en: "Majlis lounge chair", ar: "كرسي المجلس" },
    material: { en: "Solid walnut, wool bouclé", ar: "خشب جوز صلب، صوف بوكليه" },
    dimensions: "W 78 × D 84 × H 72 cm",
    edition: { en: "Made to order", ar: "يُصنع حسب الطلب" },
    finishes: ["walnut", "beige", "burgundy"],
    description: {
      en: "A low, deep chair for long conversations, sized to the proportions of floor seating in a traditional majlis.",
      ar: "كرسي منخفض وعميق للأحاديث الطويلة، بمقاسات مستوحاة من الجلسات الأرضية في المجلس التقليدي.",
    },
    images: [cutout("majlis-lounge-chair-1"), cutout("majlis-lounge-chair-2")],
    // Cut out from Unsplash photos
    source: ["photo-1567538096630-e0c55bd6374c", "photo-1503602642458-232111445657"],
  },
  {
    slug: "diwan-sofa",
    type: "seating",
    collection: "gallery",
    name: { en: "Diwan sofa", ar: "كنبة الديوان" },
    material: { en: "Oak frame, linen upholstery", ar: "هيكل بلوط، تنجيد كتان" },
    dimensions: "W 240 × D 95 × H 70 cm",
    edition: { en: "Made to order", ar: "يُصنع حسب الطلب" },
    finishes: ["beige", "mist", "navy"],
    description: {
      en: "A long, low sofa with a single seat cushion, designed to line the wall of a reception room.",
      ar: "كنبة طويلة ومنخفضة بوسادة جلوس واحدة، صُممت لتمتد على جدار غرفة الاستقبال.",
    },
    images: [cutout("diwan-sofa-1"), cutout("diwan-sofa-2")],
    // Cut out from Unsplash photos
    source: ["photo-1555041469-a586c61ea9bc", "photo-1586023492125-27b2c045efd7"],
  },
  {
    slug: "sadu-side-chair",
    type: "seating",
    collection: "gallery",
    name: { en: "Sadu side chair", ar: "كرسي السدو" },
    material: { en: "Ash, hand-woven Sadu seat", ar: "خشب الدردار، مقعد سدو منسوج يدويًا" },
    dimensions: "W 48 × D 52 × H 80 cm",
    edition: { en: "Edition of 24", ar: "إصدار من ٢٤ قطعة" },
    finishes: ["burgundy", "beige", "walnut"],
    description: {
      en: "A dining chair whose seat is woven by Bedouin artisans in the traditional Sadu pattern.",
      ar: "كرسي طعام يُنسج مقعده على يد حرفيات بدويات بنقشة السدو التقليدية.",
    },
    images: [cutout("sadu-side-chair-1"), cutout("sadu-side-chair-2")],
    // Cut out from Unsplash photos
    source: ["photo-1592078615290-033ee584e267", "photo-1538688525198-9b88f6f53126"],
  },
  {
    slug: "wadi-side-table",
    type: "tables",
    collection: "gallery",
    name: { en: "Wadi side table", ar: "طاولة الوادي الجانبية" },
    material: { en: "Honed sandstone", ar: "حجر رملي مصقول" },
    dimensions: "Ø 45 × H 50 cm",
    edition: { en: "Edition of 12", ar: "إصدار من ١٢ قطعة" },
    finishes: ["beige", "stone"],
    description: {
      en: "Carved from a single block of AlUla sandstone, each table keeps the natural banding of the rock.",
      ar: "تُنحت من كتلة واحدة من حجر العُلا الرملي، وتحتفظ كل طاولة بالطبقات الطبيعية للصخر.",
    },
    images: [cutout("wadi-side-table-1"), cutout("wadi-side-table-2")],
    // Cut out from Unsplash photos
    source: ["photo-1499933374294-4584851497cc", "photo-1533090161767-e6ffed986c88"],
  },
  {
    slug: "nakheel-dining-table",
    type: "tables",
    collection: "gallery",
    name: { en: "Nakheel dining table", ar: "طاولة طعام النخيل" },
    material: { en: "Solid walnut, brass inlay", ar: "خشب جوز صلب، تطعيم نحاسي" },
    dimensions: "W 280 × D 110 × H 74 cm",
    edition: { en: "Made to order", ar: "يُصنع حسب الطلب" },
    finishes: ["walnut", "navy"],
    description: {
      en: "A long table on two tapered legs that recall palm trunks, with a fine brass line set into the top.",
      ar: "طاولة طويلة على ساقين مستدقتين تستحضران جذوع النخيل، مع خط نحاسي رفيع في سطحها.",
    },
    images: [cutout("nakheel-dining-table-1"), cutout("nakheel-dining-table-2")],
    // Cut out from Unsplash photos
    source: ["photo-1533090161767-e6ffed986c88", "photo-1600607687939-ce8a6c25118c"],
  },
  {
    slug: "fanous-pendant",
    type: "lighting",
    collection: "gallery",
    name: { en: "Fanous pendant", ar: "فانوس معلّق" },
    material: { en: "Hand-blown glass, brass", ar: "زجاج منفوخ يدويًا، نحاس" },
    dimensions: "Ø 32 × H 46 cm",
    edition: { en: "Made to order", ar: "يُصنع حسب الطلب" },
    finishes: ["beige", "mist", "stone"],
    description: {
      en: "A contemporary lantern that diffuses light softly through ribbed glass, made for majlis and dining rooms.",
      ar: "فانوس معاصر ينشر الضوء بنعومة عبر زجاج مضلّع، صُمم للمجالس وغرف الطعام.",
    },
    images: [cutout("fanous-pendant-1"), cutout("fanous-pendant-2")],
    // Cut out from Unsplash photos
    source: ["photo-1513506003901-1e6a229e2d15", "photo-1524758631624-e2822e304c36"],
  },
  {
    slug: "qamar-floor-lamp",
    type: "lighting",
    collection: "gallery",
    name: { en: "Qamar floor lamp", ar: "مصباح قمر الأرضي" },
    material: { en: "Patinated brass, linen shade", ar: "نحاس معتّق، غطاء كتان" },
    dimensions: "Ø 40 × H 160 cm",
    edition: { en: "Edition of 30", ar: "إصدار من ٣٠ قطعة" },
    finishes: ["walnut", "beige"],
    description: {
      en: "A slender lamp whose round shade glows like a low moon at the edge of a room.",
      ar: "مصباح نحيل يتوهج غطاؤه المستدير كقمر منخفض عند طرف الغرفة.",
    },
    images: [cutout("qamar-floor-lamp-1"), cutout("qamar-floor-lamp-2")],
    // Cut out from Unsplash photos
    source: ["photo-1507473885765-e6ed057f782c", "photo-1616486338812-3dadae4b4ace"],
  },
  {
    slug: "raml-vessels",
    type: "objects",
    collection: "objects",
    name: { en: "Raml vessels", ar: "أوانٍ رمل" },
    material: { en: "Stoneware, sand glaze", ar: "خزف حجري، طلاء رملي" },
    dimensions: "H 18 to 42 cm",
    edition: { en: "Set of three", ar: "مجموعة من ثلاث قطع" },
    finishes: ["beige", "stone", "walnut"],
    description: {
      en: "Three thrown vessels finished in a glaze mixed with desert sand, so no two surfaces are the same.",
      ar: "ثلاث أوانٍ مصنوعة على الدولاب بطلاء ممزوج برمل الصحراء، فلا يتشابه سطحان.",
    },
    // Objects are the studio's own designs: each has the story behind it and a
    // film of its making (placeholder copy and Mixkit stock until the studio's own)
    story: {
      en: [
        "Raml began with a handful of sand carried back from the dunes south of Doha, and the question of whether the desert itself could become a glaze.",
        "Each vessel is thrown by hand, then dipped in a glaze mixed with that sand. In the kiln the grains melt unevenly, leaving a surface that is never quite the same twice, like the dunes after wind.",
        "The three heights are set to stand together on a low table or a niche, catching light along their shoulders.",
      ],
      ar: [
        "بدأت «رمل» بحفنة من الرمل حُملت من الكثبان جنوب الدوحة، وبسؤال: هل يمكن للصحراء نفسها أن تصبح طلاءً؟",
        "تُشكَّل كل آنية يدوياً على الدولاب، ثم تُغمس في طلاء ممزوج بذلك الرمل. وفي الفرن تذوب الحبيبات بتفاوت، فتترك سطحاً لا يتكرر أبداً، كالكثبان بعد الريح.",
        "اختيرت الارتفاعات الثلاثة لتقف معاً على طاولة منخفضة أو في كوّة، يلتقط الضوء أكتافها.",
      ],
    },
    making: { video: "/videos/making/raml.mp4", poster: "/videos/making/raml.jpg" },
    images: [cutout("raml-vessels-1"), cutout("raml-vessels-2")],
    // Cut out from Unsplash photos
    source: ["photo-1565193566173-7a0ee3dbe261", "photo-1578500494198-246f612d3b3d"],
  },
  {
    slug: "fakhar-bowl",
    type: "objects",
    collection: "objects",
    name: { en: "Fakhar bowl", ar: "وعاء فخار" },
    material: { en: "Terracotta, unglazed", ar: "طين محروق، غير مطلي" },
    dimensions: "Ø 38 × H 14 cm",
    edition: { en: "Edition of 50", ar: "إصدار من ٥٠ قطعة" },
    finishes: ["walnut", "burgundy"],
    description: {
      en: "A wide serving bowl in raw terracotta, made with potters in Al-Ahsa using local clay.",
      ar: "وعاء تقديم واسع من الفخار الخام، صُنع مع خزّافين في الأحساء من الطين المحلي.",
    },
    story: {
      en: [
        "Fakhar is named for the oldest material in the region's kitchens: earth, shaped and fired.",
        "The bowl is made with a family of potters in Al-Ahsa who still dig their clay from the oasis. It is thrown wide and shallow for sharing, and left unglazed so the warmth of the terracotta stays visible.",
        "Over years of use the surface darkens and softens, keeping a record of every meal served from it.",
      ],
      ar: [
        "سُمّي «فخار» بأقدم مادة في مطابخ المنطقة: طين يُشكَّل ويُحرق.",
        "يُصنع الوعاء مع عائلة من الخزّافين في الأحساء ما زالوا يستخرجون طينهم من الواحة. يُشكَّل واسعاً وقليل العمق للمشاركة، ويُترك دون طلاء ليبقى دفء الفخار ظاهراً.",
        "ومع سنوات الاستعمال يغمق سطحه ويلين، حافظاً أثر كل وجبة قُدّمت فيه.",
      ],
    },
    making: { video: "/videos/making/fakhar.mp4", poster: "/videos/making/fakhar.jpg" },
    images: [cutout("fakhar-bowl-1"), cutout("fakhar-bowl-2")],
    // Cut out from Unsplash photos
    source: ["photo-1610701596007-11502861dcfa", "photo-1616627547584-bf28cee262db"],
  },
  {
    slug: "sahra-stool",
    type: "objects",
    collection: "objects",
    name: { en: "Sahra stool", ar: "مقعد صحراء" },
    material: { en: "Solid oak, oiled", ar: "بلوط صلب، مزيّت" },
    dimensions: "Ø 36 × H 45 cm",
    edition: { en: "Made to order", ar: "يُصنع حسب الطلب" },
    finishes: ["walnut", "beige", "navy"],
    description: {
      en: "A small turned stool that doubles as a side table, inspired by the low wooden seats of desert camps.",
      ar: "مقعد صغير مخروط يصلح طاولة جانبية، مستوحى من المقاعد الخشبية المنخفضة في مخيمات الصحراء.",
    },
    story: {
      en: [
        "Sahra takes its shape from the low wooden seats found around the fire in desert camps, light enough to carry and steady on uneven ground.",
        "It is turned from a single block of oak, then carved by hand so the grain runs unbroken from seat to foot. A final coat of oil brings the wood to a soft, low sheen.",
        "Used as a stool or as a small table beside a sofa, it is meant to move around a home the way it once moved around a camp.",
      ],
      ar: [
        "يستمد «صحراء» شكله من المقاعد الخشبية المنخفضة حول النار في مخيمات الصحراء، خفيف يسهل حمله وثابت على الأرض غير المستوية.",
        "يُخرط من كتلة واحدة من البلوط، ثم يُنحت يدوياً لتمتد العروق دون انقطاع من المقعد إلى القاعدة. وتمنحه طبقة أخيرة من الزيت لمعة هادئة.",
        "يُستعمل مقعداً أو طاولة صغيرة بجانب الأريكة، ليتنقل في البيت كما كان يتنقل في المخيم.",
      ],
    },
    making: { video: "/videos/making/sahra.mp4", poster: "/videos/making/sahra.jpg" },
    images: [cutout("sahra-stool-1"), cutout("sahra-stool-2")],
    // Cut out from Unsplash photos
    source: ["photo-1519947486511-46149fa0a254", "photo-1538688525198-9b88f6f53126"],
  },
];

export const findProduct = (slug) => products.find((p) => p.slug === slug);

export const productsIn = (collection) => products.filter((p) => p.collection === collection);

// Up to `count` other pieces from the same collection, same type first
export const relatedProducts = (product, count = 3) => {
  const others = productsIn(product.collection).filter((p) => p !== product);
  return [
    ...others.filter((p) => p.type === product.type),
    ...others.filter((p) => p.type !== product.type),
  ].slice(0, count);
};
