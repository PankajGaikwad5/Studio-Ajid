// Placeholder portfolio: names and copy are illustrative, photography is
// Unsplash stock until the studio's own project images are available.
const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=2000`;

export const projects = [
  // ---------------------------------------------------------------- residential
  {
    slug: "dar-al-nakheel",
    category: "residential",
    year: 2025,
    area: "1,250 m²",
    title: { en: "Dar Al Nakheel", ar: "دار النخيل" },
    location: { en: "Riyadh", ar: "الرياض" },
    status: { en: "Completed", ar: "مكتمل" },
    scope: { en: "Architecture, interiors, landscape", ar: "العمارة، التصميم الداخلي، تنسيق المواقع" },
    summary: {
      en: "A family villa arranged around a shaded palm court.",
      ar: "فيلا عائلية تتمحور حول فناء نخيل مظلل.",
    },
    body: {
      en: [
        "The house turns inward. Thick rammed-earth walls face the street, and every room opens onto a central court planted with date palms that cool the air before it reaches the living spaces.",
        "Deep openings, a stepped roof terrace and a narrow water channel give the family places to gather from early morning to late evening, in summer and winter alike.",
      ],
      ar: [
        "ينفتح البيت إلى الداخل. جدران سميكة من الطين المدكوك تواجه الشارع، وتطل كل غرفة على فناء مركزي مزروع بالنخيل يلطّف الهواء قبل وصوله إلى مساحات المعيشة.",
        "تمنح الفتحات العميقة والسطح المتدرج وقناة الماء الضيقة العائلة أماكن للتجمع من الصباح الباكر حتى المساء، صيفًا وشتاءً.",
      ],
    },
    cover: img("photo-1613490493576-7fde63acd811"),
    images: [
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1600566753190-17f0baa2a6c3"),
    ],
  },
  {
    slug: "sadeem-house",
    category: "residential",
    year: 2024,
    area: "980 m²",
    title: { en: "Sadeem House", ar: "بيت سديم" },
    location: { en: "Diriyah", ar: "الدرعية" },
    status: { en: "Completed", ar: "مكتمل" },
    scope: { en: "Architecture, interiors", ar: "العمارة، التصميم الداخلي" },
    summary: {
      en: "Najdi proportions reworked in pale limestone and timber.",
      ar: "نسب نجدية بلغة جديدة من الحجر الجيري الفاتح والخشب.",
    },
    body: {
      en: [
        "Sadeem borrows the massing of the old Diriyah houses: solid at ground level, lighter as it rises, with small triangular openings that throw patterns of light across the stair.",
        "Inside, oak ceilings and limestone floors keep the palette quiet so the changing desert light becomes the main material.",
      ],
      ar: [
        "يستعير بيت سديم كتلة بيوت الدرعية القديمة: صلب عند الأرض وأخف كلما ارتفع، مع فتحات مثلثة صغيرة ترسم أنماطًا من الضوء على الدرج.",
        "في الداخل، تحافظ أسقف البلوط وأرضيات الحجر الجيري على هدوء الألوان ليصبح ضوء الصحراء المتغير هو المادة الأساسية.",
      ],
    },
    cover: img("photo-1613977257363-707ba9348227"),
    images: [
      img("photo-1600210492486-724fe5c67fb0"),
      img("photo-1618221195710-dd6b41faaea6"),
      img("photo-1505693416388-ac5ce068fe85"),
    ],
  },
  {
    slug: "wadi-residence",
    category: "residential",
    year: 2026,
    area: "640 m²",
    title: { en: "Wadi Residence", ar: "منزل الوادي" },
    location: { en: "AlUla", ar: "العُلا" },
    status: { en: "In construction", ar: "قيد الإنشاء" },
    scope: { en: "Architecture, interiors", ar: "العمارة، التصميم الداخلي" },
    summary: {
      en: "A low house set into the sandstone edge of a valley.",
      ar: "بيت منخفض مغروس في حافة وادٍ من الحجر الرملي.",
    },
    body: {
      en: [
        "The plan follows the line of the rock. Bedrooms sit half below ground for thermal mass, while the living room cantilevers toward the valley floor.",
        "Local sandstone, lime plaster and palm-frond screens tie the house to the landscape it looks out on.",
      ],
      ar: [
        "يتبع المخطط خط الصخر. تقع غرف النوم نصفها تحت الأرض للاستفادة من الكتلة الحرارية، بينما تمتد غرفة المعيشة نحو قاع الوادي.",
        "يربط الحجر الرملي المحلي والجص الجيري وستائر سعف النخيل البيت بالمشهد الذي يطل عليه.",
      ],
    },
    cover: img("photo-1600596542815-ffad4c1539a9"),
    images: [
      img("photo-1586023492125-27b2c045efd7"),
      img("photo-1616486338812-3dadae4b4ace"),
      img("photo-1615874959474-d609969a20ed"),
    ],
  },
  {
    slug: "courtyard-house",
    category: "residential",
    year: 2023,
    area: "1,100 m²",
    title: { en: "Courtyard House", ar: "بيت الفناء" },
    location: { en: "Dubai", ar: "دبي" },
    status: { en: "Completed", ar: "مكتمل" },
    scope: { en: "Architecture, interiors, furniture", ar: "العمارة، التصميم الداخلي، الأثاث" },
    summary: {
      en: "Three pavilions linked by shaded courtyards and water.",
      ar: "ثلاثة أجنحة تربطها أفنية مظللة والماء.",
    },
    body: {
      en: [
        "Instead of one large volume, the house is split into three pavilions for living, sleeping and guests, each with its own courtyard and view.",
        "Bespoke furniture by the studio carries the same materials from outside to inside, so the boundary between room and garden almost disappears.",
      ],
      ar: [
        "بدلًا من كتلة واحدة كبيرة، ينقسم البيت إلى ثلاثة أجنحة للمعيشة والنوم والضيوف، لكل منها فناؤه وإطلالته.",
        "يحمل الأثاث المصمم خصيصًا من الاستوديو المواد نفسها من الخارج إلى الداخل، فتكاد الحدود بين الغرفة والحديقة تختفي.",
      ],
    },
    cover: img("photo-1564013799919-ab600027ffc6"),
    images: [
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1618221195710-dd6b41faaea6"),
      img("photo-1600566753190-17f0baa2a6c3"),
    ],
  },
  {
    slug: "hampstead-townhouse",
    category: "residential",
    year: 2022,
    area: "420 m²",
    title: { en: "Hampstead Townhouse", ar: "منزل هامبستيد" },
    location: { en: "London", ar: "لندن" },
    status: { en: "Completed", ar: "مكتمل" },
    scope: { en: "Refurbishment, interiors", ar: "تجديد، تصميم داخلي" },
    summary: {
      en: "A Victorian terrace opened up around a new light well.",
      ar: "منزل فيكتوري متلاصق انفتح حول بئر ضوء جديد.",
    },
    body: {
      en: [
        "A new light well cuts through all four floors, bringing daylight into the centre of a deep, dark plan.",
        "Original cornices and fireplaces were restored and set against plain plaster walls and a single oak stair.",
      ],
      ar: [
        "يخترق بئر ضوء جديد الطوابق الأربعة، ليجلب ضوء النهار إلى قلب مخطط عميق ومعتم.",
        "رُممت الأفاريز والمدافئ الأصلية ووُضعت أمام جدران جصية بسيطة ودرج واحد من خشب البلوط.",
      ],
    },
    cover: img("photo-1512917774080-9991f1c4c750"),
    images: [
      img("photo-1580587771525-78b9dba3b914"),
      img("photo-1586023492125-27b2c045efd7"),
      img("photo-1505693416388-ac5ce068fe85"),
    ],
  },

  // ---------------------------------------------------------------- hospitality
  {
    slug: "nakhla-desert-retreat",
    category: "hospitality",
    year: 2025,
    area: "32 keys",
    title: { en: "Nakhla Desert Retreat", ar: "منتجع نخلة الصحراوي" },
    location: { en: "AlUla", ar: "العُلا" },
    status: { en: "Completed", ar: "مكتمل" },
    scope: { en: "Masterplan, architecture, interiors", ar: "المخطط العام، العمارة، التصميم الداخلي" },
    summary: {
      en: "Thirty-two villas scattered through a palm oasis.",
      ar: "اثنتان وثلاثون فيلا موزعة في واحة نخيل.",
    },
    body: {
      en: [
        "Each villa is placed to save existing palms, so no two plans are quite the same. Paths of compacted earth link them to a shared pool and dining pavilion.",
        "Rooms open fully to private terraces at night, when the desert air is cool and the sky is at its clearest.",
      ],
      ar: [
        "وُضعت كل فيلا بحيث تحافظ على النخيل القائم، فلا يتطابق مخططان تمامًا. وتربطها ممرات من التراب المدكوك بمسبح وجناح طعام مشتركين.",
        "تنفتح الغرف بالكامل على شرفات خاصة ليلًا، حين يبرد هواء الصحراء وتصفو السماء.",
      ],
    },
    cover: img("photo-1520250497591-112f2f40a3f4"),
    images: [
      img("photo-1566073771259-6a8506099945"),
      img("photo-1582719478250-c89cae4dc85b"),
      img("photo-1611892440504-42a792e24d32"),
    ],
  },
  {
    slug: "majlis-hotel",
    category: "hospitality",
    year: 2024,
    area: "120 keys",
    title: { en: "Majlis Hotel", ar: "فندق المجلس" },
    location: { en: "Riyadh", ar: "الرياض" },
    status: { en: "Completed", ar: "مكتمل" },
    scope: { en: "Interiors, furniture, lighting", ar: "التصميم الداخلي، الأثاث، الإضاءة" },
    summary: {
      en: "A city hotel built around the ritual of welcome.",
      ar: "فندق في المدينة مبني حول طقس الترحيب.",
    },
    body: {
      en: [
        "The lobby is planned as a sequence of majlis rooms rather than one hall, so guests arrive into something closer to a home than a terminal.",
        "Guest rooms continue the idea with low seating, woven textiles and lighting designed by the studio.",
      ],
      ar: [
        "صُممت الردهة كسلسلة من غرف المجالس بدلًا من قاعة واحدة، ليصل الضيوف إلى مكان أقرب إلى البيت منه إلى صالة انتظار.",
        "تكمل غرف الضيوف الفكرة بجلسات منخفضة ومنسوجات يدوية وإضاءة من تصميم الاستوديو.",
      ],
    },
    cover: img("photo-1542314831-068cd1dbfeeb"),
    images: [
      img("photo-1584132967334-10e028bd69f7"),
      img("photo-1590490360182-c33d57733427"),
      img("photo-1571896349842-33c89424de2d"),
    ],
  },
  {
    slug: "sufra",
    category: "hospitality",
    year: 2024,
    area: "380 m²",
    title: { en: "Sufra", ar: "سُفرة" },
    location: { en: "Dubai", ar: "دبي" },
    status: { en: "Completed", ar: "مكتمل" },
    scope: { en: "Interiors, furniture", ar: "التصميم الداخلي، الأثاث" },
    summary: {
      en: "A restaurant around one long communal table.",
      ar: "مطعم يدور حول مائدة جماعية طويلة.",
    },
    body: {
      en: [
        "Named after the cloth spread for a shared meal, Sufra is organised around a single fourteen-metre table in solid walnut.",
        "Smaller booths line the edges in deep burgundy leather, giving quieter corners for two.",
      ],
      ar: [
        "سُمّي المطعم على اسم السفرة التي تُفرش للوجبة المشتركة، ويتمحور حول مائدة واحدة بطول أربعة عشر مترًا من خشب الجوز الصلب.",
        "تصطف على الأطراف مقصورات أصغر من الجلد العنابي الداكن، توفر زوايا أهدأ لشخصين.",
      ],
    },
    cover: img("photo-1517248135467-4c7edcad34c4"),
    images: [
      img("photo-1414235077428-338989a2e8c0"),
      img("photo-1559339352-11d035aa65de"),
      img("photo-1544148103-0773bf10d330"),
    ],
  },
  {
    slug: "marsa-beach-club",
    category: "hospitality",
    year: 2026,
    area: "2,400 m²",
    title: { en: "Marsa Beach Club", ar: "نادي مرسى الشاطئي" },
    location: { en: "Red Sea", ar: "البحر الأحمر" },
    status: { en: "In design", ar: "قيد التصميم" },
    scope: { en: "Architecture, interiors, landscape", ar: "العمارة، التصميم الداخلي، تنسيق المواقع" },
    summary: {
      en: "Shaded decks stepping down to the reef.",
      ar: "منصات مظللة تتدرج نزولًا نحو الشعاب.",
    },
    body: {
      en: [
        "A series of timber decks steps down from the dunes to the water, each with its own shade structure woven from palm fibre.",
        "The buildings are raised on piles to leave the shoreline and its plants untouched.",
      ],
      ar: [
        "تتدرج سلسلة من المنصات الخشبية من الكثبان نحو الماء، لكل منها مظلة منسوجة من ألياف النخيل.",
        "رُفعت المباني على ركائز لتبقى الشواطئ ونباتاتها على حالها.",
      ],
    },
    cover: img("photo-1566073771259-6a8506099945"),
    images: [
      img("photo-1551882547-ff40c63fe5fa"),
      img("photo-1520250497591-112f2f40a3f4"),
      img("photo-1571896349842-33c89424de2d"),
    ],
  },
  {
    slug: "qahwa-house",
    category: "hospitality",
    year: 2023,
    area: "210 m²",
    title: { en: "Qahwa House", ar: "بيت القهوة" },
    location: { en: "London", ar: "لندن" },
    status: { en: "Completed", ar: "مكتمل" },
    scope: { en: "Interiors, branding environment", ar: "التصميم الداخلي، البيئة البصرية" },
    summary: {
      en: "A Saudi coffee house on a Mayfair corner.",
      ar: "مقهى سعودي على زاوية في مايفير.",
    },
    body: {
      en: [
        "A brass coffee bar sits at the centre like a hearth, with the roasting process visible from the street.",
        "Floor seating on raised platforms sits alongside conventional tables, letting guests choose how formal their visit feels.",
      ],
      ar: [
        "تتوسط المكان طاولة قهوة نحاسية كأنها موقد، وتظهر عملية التحميص للمارة من الشارع.",
        "تجاور الجلسات الأرضية على المنصات المرتفعة الطاولات التقليدية، ليختار الضيف مدى رسمية زيارته.",
      ],
    },
    cover: img("photo-1559339352-11d035aa65de"),
    images: [
      img("photo-1544148103-0773bf10d330"),
      img("photo-1517248135467-4c7edcad34c4"),
      img("photo-1414235077428-338989a2e8c0"),
    ],
  },
];

export const projectsIn = (category) => projects.filter((p) => p.category === category);

export const findProject = (category, slug) =>
  projects.find((p) => p.category === category && p.slug === slug);

// The project after this one in its category, wrapping to the first
export const nextProject = (project) => {
  const list = projectsIn(project.category);
  return list[(list.indexOf(project) + 1) % list.length];
};
