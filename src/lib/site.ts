export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mamatharajphotography.in";

export const SITE_NAME = "Mamatharaj Photography";
export const PHOTOGRAPHER_NAME = "Mamatha Raj";

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

export const MAPS_URL = "https://maps.app.goo.gl/Ni1ogCMpSQ1qbjw9A";
export const INSTAGRAM_URL = "https://instagram.com/mamatharaj.studio";

export const SAME_AS = [INSTAGRAM_URL, MAPS_URL];

export const SERVICES = [
  "Wedding Photography",
  "Pre-Wedding Shoots",
  "Portrait Sessions",
  "Cinematic Films",
  "Event Coverage",
  "Destination Shoots",
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
];

export function buildLocalBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    legalName: SITE_NAME,
    founder: {
      "@type": "Person",
      name: PHOTOGRAPHER_NAME,
    },
    description:
      "Mamatharaj Photography is the best wedding, pre-wedding and portrait photographer in Khammam, Telangana. Cinematic films, candid storytelling and editorial precision.",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image`,
    logo: `${SITE_URL}/logo.png`,
    telephone: PHONE_TEL,
    email: EMAIL,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
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
    areaServed: [
      { "@type": "City", name: "Khammam" },
      { "@type": "State", name: "Telangana" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: SAME_AS,
    makesOffer: SERVICES.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        areaServed: "Khammam",
      },
    })),
  };
}

export function buildPersonSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#photographer`,
    name: PHOTOGRAPHER_NAME,
    jobTitle: "Wedding & Portrait Photographer",
    description:
      "Mamatha Raj is a professional wedding and portrait photographer based in Khammam, Telangana, with over a decade of experience.",
    url: `${SITE_URL}/`,
    email: EMAIL,
    telephone: PHONE_TEL,
    image: `${SITE_URL}/og-image`,
    sameAs: SAME_AS,
    address: {
      "@type": "PostalAddress",
      ...ADDRESS,
    },
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
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
