export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  heading: string;
  headingAccent: string;
  intro: string;
  paragraphs: string[];
  features: string[];
  image: string;
  faqs: { question: string; answer: string }[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "wedding-photography",
    title: "Wedding Photography",
    metaTitle:
      "Best Wedding Photographer in Khammam | Mamatharaj Photography",
    metaDescription:
      "Mamatharaj Photography is the best wedding photographer in Khammam, Telangana. Candid wedding photography, cinematic storytelling and editorial precision for weddings in Khammam, Telangana and across India. 500+ weddings, 5.0-star rating.",
    heading: "Wedding",
    headingAccent: "Photography",
    intro:
      "Your wedding day is a once-in-a-lifetime story, and it deserves to be told the way it felt. As Khammam's best wedding photography studio, Mamatharaj Photography documents every emotion — from the mehendi to the vidai — with a candid, unobtrusive approach and an editorial finish.",
    paragraphs: [
      "We blend documentary storytelling with editorial precision, so the tears, laughter and quiet glances are preserved exactly as they happened. Our team works discreetly through the day, capturing real moments rather than stiff poses. That is what makes Mamatharaj Photography the best wedding photographer in Khammam.",
      "Every wedding is delivered as a complete, individually colour-graded gallery plus a cinematic highlight film, so you can relive the day for generations. Based on Pumping Well Road in Khammam, we photograph weddings across Telangana, Andhra Pradesh and all of India.",
    ],
    features: [
      "Full-day and multi-day wedding coverage",
      "Candid documentary photography",
      "Cinematic highlight film included",
      "Individually edited, colour-graded images",
      "Engagement & couple portrait sessions",
      "Coverage across Khammam, Telangana and India",
    ],
    image: "/downloads/2026-07-08_11-13-43_UTC_1.jpg",
    faqs: [
      {
        question: "Who is the best wedding photographer in Khammam?",
        answer:
          "Mamatharaj Photography is Khammam's top-rated wedding photography studio. With a 5.0-star Google rating, 500+ weddings and over a decade of experience, we are the first choice for couples across Telangana looking for the best wedding photographer.",
      },
      {
        question: "How many photos do you deliver from a Khammam wedding?",
        answer:
          "The number depends on your package and coverage hours. Full-day coverage typically delivers 800–1500 individually edited images, plus a cinematic highlight film.",
      },
      {
        question: "Do you provide wedding albums and prints?",
        answer:
          "Yes. We offer premium handcrafted albums, framed prints and parent albums as add-ons so your memories live beyond the screen.",
      },
      {
        question: "How do I book a wedding photographer in Khammam?",
        answer:
          "Contact Mamatharaj Photography via WhatsApp at +91 90106 27571, call the studio on Pumping Well Road, or use the contact form. Share your wedding date and we will confirm availability.",
      },
    ],
  },
  {
    slug: "pre-wedding-shoot",
    title: "Pre-Wedding Shoot",
    metaTitle:
      "Best Pre-Wedding Shoot in Khammam | Mamatharaj Photography",
    metaDescription:
      "Dreamy, cinematic pre-wedding shoots in Khammam and across India by Mamatharaj Photography — Khammam's best pre-wedding photographer. Beautifully framed love stories at iconic locations.",
    heading: "Pre-Wedding",
    headingAccent: "Shoots",
    intro:
      "A pre-wedding shoot is your love story, beautifully framed before the big day. Mamatharaj Photography crafts dreamy, cinematic photographs and films at breathtaking locations in Khammam and beyond — making us Khammam's best pre-wedding shoot studio.",
    paragraphs: [
      "From quiet riverside backdrops around Khammam to the palaces of Rajasthan and the beaches of Kerala, we help you pick the perfect setting and direct you naturally so every frame feels authentic.",
      "Every pre-wedding package includes location planning, outfit guidance and a fully edited gallery, with the option to add a short cinematic film for your wedding reception or social media.",
    ],
    features: [
      "Location scouting in Khammam and across India",
      "Cinematic pre-wedding films",
      "Natural, unposed direction",
      "Multiple outfit changes and settings",
      "Drone and golden-hour coverage",
      "Fully edited, share-ready gallery",
    ],
    image: "/downloads/2026-07-08_11-19-45_UTC_1.jpg",
    faqs: [
      {
        question: "Where can we do a pre-wedding shoot in Khammam?",
        answer:
          "Khammam offers stunning backdrops — lakeside spots, heritage sites and open countryside. We can also travel to Hyderabad, Vizag, Rajasthan, Kerala or any destination you choose.",
      },
      {
        question: "When should we schedule our pre-wedding shoot?",
        answer:
          "We recommend shooting 2–4 months before the wedding so the edited gallery and film are ready for your invitations and reception.",
      },
      {
        question: "How much does a pre-wedding shoot cost in Khammam?",
        answer:
          "Contact Mamatharaj Photography with your preferred dates and locations for a personalised quote. We offer packages for every budget.",
      },
    ],
  },
  {
    slug: "portrait-sessions",
    title: "Portrait Sessions",
    metaTitle:
      "Best Portrait Photography in Khammam | Mamatharaj Photography",
    metaDescription:
      "Studio and outdoor portrait photography in Khammam by Mamatharaj Photography — Khammam's best portrait photographer. Individual, couple and family portraits with timeless, editorial quality.",
    heading: "Portrait",
    headingAccent: "Sessions",
    intro:
      "Whether it is a professional headshot, a maternity session or a family portrait, Mamatharaj Photography creates timeless images that capture the real you — in our Khammam studio or on location. We are Khammam's best portrait photography studio.",
    paragraphs: [
      "Our portrait sessions are relaxed and personal. We guide you through natural poses and use considered lighting to bring out your authentic expression, never a forced smile.",
      "Choose studio or outdoor settings around Khammam. Every portrait is individually retouched and delivered in print-ready quality for framing and sharing.",
    ],
    features: [
      "Studio and outdoor portrait sessions",
      "Individual, couple and family portraits",
      "Maternity and newborn photography",
      "Professional headshots and branding",
      "Retouched, print-ready images",
      "Same-week preview delivery",
    ],
    image: "/downloads/2026-07-30_13-29-10_UTC_1.jpg",
    faqs: [
      {
        question: "Do you have a portrait studio in Khammam?",
        answer:
          "Yes. Our studio is at 3-5-80/B, Pumping Well Road, Khammam, and we also shoot on location anywhere in the city and outdoors.",
      },
      {
        question: "How long does a portrait session take?",
        answer:
          "A typical session runs 1–2 hours, giving us time for outfit changes and multiple backdrops without feeling rushed.",
      },
    ],
  },
  {
    slug: "cinematic-films",
    title: "Cinematic Films",
    metaTitle:
      "Best Wedding Cinematography in Khammam | Mamatharaj Photography",
    metaDescription:
      "Cinematic wedding films and highlight reels in Khammam by Mamatharaj Photography — Khammam's best wedding cinematographer. Professional-grade wedding cinematography with a documentary soul.",
    heading: "Cinematic",
    headingAccent: "Films",
    intro:
      "Photographs freeze a moment; film brings it back to life. Mamatharaj Photography's cinematic wedding films and highlight reels turn your celebration into an emotional, watchable story you will treasure forever. We are Khammam's best wedding cinematography studio.",
    paragraphs: [
      "We shoot on professional cinema equipment, capturing sound, movement and emotion with a documentary soul. The result is a short film that feels like a movie trailer of your day.",
      "From teaser clips within days to full-length films, every edit is paced, colour-graded and set to music that fits your story. Available for weddings, pre-weddings and events across Khammam and India.",
    ],
    features: [
      "4K cinema-grade wedding films",
      "Short teaser delivered within days",
      "Drone cinematography",
      "Licensed music and professional colour grade",
      "Full-length and highlight film options",
      "Available across Khammam and India",
    ],
    image: "/downloads/2026-07-20_07-34-52_UTC_1.jpg",
    faqs: [
      {
        question: "Do you offer wedding video in Khammam?",
        answer:
          "Yes. Mamatharaj Photography is a full-service studio offering wedding cinematography alongside photography, so you get a cohesive story of your day from one team.",
      },
      {
        question: "How long is the final wedding film?",
        answer:
          "Highlight films typically run 4–8 minutes, with optional longer documentary edits. We also deliver short teasers within days of the wedding.",
      },
    ],
  },
  {
    slug: "event-coverage",
    title: "Event Coverage",
    metaTitle:
      "Best Event Photographer in Khammam | Mamatharaj Photography",
    metaDescription:
      "Professional event photography in Khammam by Mamatharaj Photography — Khammam's best event photographer. Corporate events, cultural celebrations and milestone moments captured with discretion and artistic flair.",
    heading: "Event",
    headingAccent: "Coverage",
    intro:
      "From corporate conferences to cultural celebrations and milestone birthdays, Mamatharaj Photography captures events with discretion and an artistic eye, so you get a complete visual record without disrupting the moment. We are Khammam's best event photography studio.",
    paragraphs: [
      "Our team blends into your event, photographing candid moments, key speakers and details that matter. You receive a polished, curated gallery ready for internal use or press.",
      "Based in Khammam, we cover events across Telangana and India, with flexible hourly and full-day packages to suit any brief.",
    ],
    features: [
      "Corporate and cultural events",
      "Conferences and award ceremonies",
      "Birthdays and milestone celebrations",
      "Candid and documentary style",
      "Fast turnaround galleries",
      "Flexible hourly and day rates",
    ],
    image: "/downloads/2026-06-19_06-12-31_UTC_2.jpg",
    faqs: [
      {
        question: "Do you cover corporate events in Khammam?",
        answer:
          "Yes. Mamatharaj Photography photographs corporate events, conferences, product launches and award ceremonies across Khammam, with discreet coverage and fast delivery.",
      },
      {
        question: "How quickly do we receive event photos?",
        answer:
          "Curated galleries are typically delivered within 3–7 days, with a same-week preview for time-sensitive needs.",
      },
    ],
  },
  {
    slug: "destination-shoot",
    title: "Destination Shoot",
    metaTitle:
      "Best Destination Wedding Photographer | Mamatharaj Photography Khammam",
    metaDescription:
      "Destination wedding and pre-wedding photography across India by Mamatharaj Photography — Khammam's best destination wedding photographer. We travel anywhere your story takes us.",
    heading: "Destination",
    headingAccent: "Shoots",
    intro:
      "We travel anywhere your story takes us. From the palaces of Rajasthan to the beaches of Kerala and the hills of the North East, Mamatharaj Photography's destination shoots bring cinematic scale to your celebration. We are Khammam's best destination wedding photographer.",
    paragraphs: [
      "Our team handles everything from location permits to travel logistics, so you can focus on the moment. We bring the same editorial eye and documentary soul to every destination, near or far.",
      "Popular destinations include Hyderabad, Goa, Rajasthan, Kerala, and international locations on request. Tell us your vision and we will map the shoot.",
    ],
    features: [
      "Destination weddings across India",
      "Pre-wedding travel shoots",
      "Drone and golden-hour coverage",
      "Travel and permit planning",
      "Multi-day shoot itineraries",
      "International locations on request",
    ],
    image: "/downloads/2026-06-18_06-13-07_UTC_2.jpg",
    faqs: [
      {
        question: "Do you travel for destination weddings?",
        answer:
          "Yes. Mamatharaj Photography photographs destination weddings and pre-wedding shoots across India and internationally. Travel is planned and quoted up front so there are no surprises.",
      },
      {
        question: "How are destination shoot costs calculated?",
        answer:
          "Destination packages include photography, travel and stay for the team. Contact us with your location and dates for a transparent, all-inclusive quote.",
      },
    ],
  },
];
