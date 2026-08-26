export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mamatharajphotography.in";

export const SITE_NAME = "Mamatharaj Photography";
export const PHOTOGRAPHER_NAME = "Mamatha Raj";
export const TAGLINE =
  "Best Wedding, Pre-Wedding & Portrait Photographer in Khammam";

export const PHONE_DISPLAY = "+91 90106 27571";
export const PHONE_TEL = "+919010627571";
export const EMAIL = "hello@mamatharaj.in";

export const ADDRESS = {
  streetAddress: "3-5-80/B, Pumping Well Road",
  addressLocality: "Khammam",
  addressRegion: "Telangana",
  postalCode: "507001",
  addressCountry: "IN",
} as const;

export const GEO = { latitude: 17.2473, longitude: 80.1514 } as const;

export const MAPS_URL = "https://maps.app.goo.gl/CBEw1QkvkM37HUgt8";
export const GOOGLE_REVIEWS_URL =
  "https://maps.app.goo.gl/CBEw1QkvkM37HUgt8";
export const INSTAGRAM_URL = "https://instagram.com/mamatharaj.studio";

export const SAME_AS = [
  INSTAGRAM_URL,
  MAPS_URL,
  GOOGLE_REVIEWS_URL,
];

export const SERVICES = [
  "Wedding Photography",
  "Pre-Wedding Shoots",
  "Portrait Sessions",
  "Cinematic Films",
  "Event Coverage",
  "Destination Shoots",
] as const;

export const SERVICE_KEYWORDS = [
  "best photographer in Khammam",
  "photographer in Khammam",
  "Khammam wedding photographer",
  "wedding photography Khammam",
  "pre-wedding shoot Khammam",
  "portrait photography Khammam",
  "cinematic wedding film Khammam",
  "event photographer Khammam",
  "destination wedding photographer India",
  "top photographer Telangana",
  "best photography studio in Khammam",
  "photography studio Khammam",
  "Mamatharaj Photography",
  "Mamatha Raj photographer",
  "Telangana wedding photographer",
  "Khammam photographer phone number",
  "book photographer in Khammam",
  "wedding photographer near me Khammam",
  "best pre-wedding photographer Khammam",
  "cinematography Khammam",
] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Who is the best photographer in Khammam?",
    answer:
      "Mamatharaj Photography is Khammam's leading wedding and portrait studio. Led by Mamatha Raj, we specialise in candid wedding photography, cinematic pre-wedding shoots and editorial portraits across Khammam, Telangana and beyond. Our 5.0-star Google rating and 500+ weddings make us the top choice for couples looking for the best photographer in Khammam.",
  },
  {
    question: "What photography services do you offer in Khammam?",
    answer:
      "We offer wedding photography, pre-wedding shoots, portrait sessions, cinematic wedding films, event coverage and destination shoots. Every package is tailored to your celebration, whether it is a grand wedding in Khammam or an intimate ceremony anywhere in India.",
  },
  {
    question: "How do I book a photographer in Khammam?",
    answer:
      "Booking is simple. Reach us on WhatsApp at +91 90106 27571, call the studio, or use the contact form on this page. Share your wedding date and location, and we will confirm availability and share a customised quote for your Khammam celebration.",
  },
  {
    question: "Do you travel outside Khammam for shoots?",
    answer:
      "Yes. While our studio is on Pumping Well Road in Khammam, we regularly shoot across Telangana, Andhra Pradesh and the rest of India, including destination weddings and pre-wedding shoots in locations of your choice.",
  },
  {
    question: "How much does wedding photography cost in Khammam?",
    answer:
      "Pricing depends on the coverage hours, team size, number of photos and whether you add a cinematic film. Contact us with your wedding date and requirements for a personalised quote — we offer packages for every budget without compromising on quality.",
  },
  {
    question: "How soon will we receive our wedding photos?",
    answer:
      "Teaser highlights are delivered within a week of your wedding, with the complete edited gallery and cinematic film ready within a few weeks, depending on the package. Every image is individually colour-graded and retouched to our editorial standard.",
  },
  {
    question: "What makes Mamatharaj Photography the best in Khammam?",
    answer:
      "We combine candid documentary storytelling with an editorial finish, delivering 500+ weddings with a consistent 5.0-star Google rating. Our team handles photography and cinematography together, so your wedding story is captured cohesively — one team, one vision, one seamless deliverable.",
  },
  {
    question: "Where is Mamatharaj Photography located?",
    answer:
      "Our studio is at 3-5-80/B, Pumping Well Road, Khammam, Telangana 507001, India. We are open Monday to Sunday, 10:00 AM to 7:00 PM. Call us at +91 90106 27571 or visit our Google Maps listing for directions.",
  },
  {
    question: "Do you offer pre-wedding shoots in Khammam?",
    answer:
      "Yes. We offer cinematic pre-wedding shoots at stunning locations in Khammam and across India. Every package includes location planning, outfit guidance and a fully edited gallery, with the option to add a cinematic film.",
  },
  {
    question: "How many photos do you deliver from a Khammam wedding?",
    answer:
      "The number depends on your package and coverage hours. Full-day coverage typically delivers 800–1500 individually edited images, plus a cinematic highlight film.",
  },
];

export function buildLocalBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "Photographer"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    legalName: SITE_NAME,
    alternateName: [
      "Mamatha Raj Photography",
      "Mamatharaj Photography Khammam",
      "Mamatharaj Studio",
    ],
    founder: {
      "@type": "Person",
      name: PHOTOGRAPHER_NAME,
      jobTitle: "Wedding & Portrait Photographer",
      url: `${SITE_URL}/about`,
    },
    description:
      "Mamatharaj Photography is the best wedding, pre-wedding and portrait photographer in Khammam, Telangana. 500+ weddings, 5.0-star Google rating, candid storytelling and editorial precision.",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/logo.png`,
    telephone: PHONE_TEL,
    email: EMAIL,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer, Credit Card",
    address: {
      "@type": "PostalAddress",
      ...ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...GEO,
    },
    hasMap: MAPS_URL,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "21",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Priya S." },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Best wedding photographer in Khammam. Mamatha Raj captured our wedding beautifully with candid, emotional shots.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Ravi K." },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody:
          "Incredible pre-wedding shoot experience. The team made us feel so comfortable and the photos turned out amazing.",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Khammam", sameAs: "https://en.wikipedia.org/wiki/Khammam" },
      { "@type": "State", name: "Telangana", sameAs: "https://en.wikipedia.org/wiki/Telangana" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: SAME_AS,
    makesOffer: SERVICES.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        areaServed: "Khammam",
        description: `Professional ${name.toLowerCase()} in Khammam, Telangana`,
      },
    })),
    knowsAbout: [
      "Wedding Photography",
      "Pre-Wedding Photography",
      "Portrait Photography",
      "Cinematic Wedding Films",
      "Event Photography",
      "Destination Wedding Photography",
      "Khammam Photography",
      "Telangana Wedding Photography",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Services in Khammam",
      itemListElement: SERVICES.map((name) => ({
        "@type": "OfferCatalog",
        name,
        itemListElement: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        },
      })),
    },
  };
}

export function buildPersonSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#photographer`,
    name: PHOTOGRAPHER_NAME,
    alternateName: "Mamatharaj",
    jobTitle: "Wedding & Portrait Photographer",
    description:
      "Mamatha Raj is a professional wedding and portrait photographer based in Khammam, Telangana, with over a decade of experience and 500+ weddings captured.",
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/og-image.jpg`,
    email: EMAIL,
    telephone: PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      ...ADDRESS,
    },
    sameAs: SAME_AS,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    knowsAbout: [
      "Wedding Photography",
      "Portrait Photography",
      "Cinematic Films",
      "Khammam",
    ],
    areaServed: [
      { "@type": "City", name: "Khammam" },
      { "@type": "State", name: "Telangana" },
    ],
  };
}

export function buildFaqSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function buildWebSiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      "Best wedding, pre-wedding and portrait photographer in Khammam, Telangana. Book Mamatharaj Photography for candid storytelling and editorial precision.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.png`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-IN",
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function buildImageSchema(
  url: string,
  alt: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    url: url.startsWith("http") ? url : `${SITE_URL}${url}`,
    description: alt,
    license: `${SITE_URL}/`,
    acquireLicensePage: `${SITE_URL}/contact`,
    copyrightNotice: `© ${new Date().getFullYear()} ${SITE_NAME}`,
    creator: {
      "@type": "Person",
      name: PHOTOGRAPHER_NAME,
    },
    creditText: PHOTOGRAPHER_NAME,
  };
}
