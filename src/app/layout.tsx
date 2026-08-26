import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import Footer from "@/components/Footer";
import {
  SITE_URL,
  SITE_NAME,
  buildLocalBusinessSchema,
  buildPersonSchema,
  buildFaqSchema,
  buildWebSiteSchema,
} from "@/lib/site";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const ogImageUrl = new URL("/og-image", SITE_URL).toString();

const defaultTitle =
  "Mamatharaj Photography — Best Photographer in Khammam | Wedding & Portrait";
const defaultDescription =
  "Mamatharaj Photography is Khammam's #1 rated wedding, pre-wedding and portrait photographer. 500+ weddings, 5.0-star Google rating, candid storytelling and cinematic films across Telangana. Book the best photographer in Khammam today.";
const ogDescription =
  "Khammam's #1 rated wedding & portrait photographer. 500+ weddings, 5.0-star Google rating. Candid storytelling & cinematic films. Book now.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME} — Best Photographer in Khammam`,
  },
  description: defaultDescription,
  keywords: [
    "best photographer in Khammam",
    "photographer in Khammam",
    "Khammam wedding photographer",
    "wedding photography Khammam",
    "pre-wedding shoot Khammam",
    "portrait photography Khammam",
    "cinematic wedding film Telangana",
    "best photography studio in Khammam",
    "photography studio Khammam",
    "top photographer Telangana",
    "book photographer in Khammam",
    "wedding photographer near me Khammam",
    "Mamatharaj Photography",
    "Mamatha Raj photographer",
    "Telangana wedding photographer",
    "event photographer Khammam",
    "destination wedding photographer India",
    "Khammam portrait studio",
    "best pre-wedding photographer Khammam",
    "cinematography Khammam",
  ],
  authors: [{ name: "Mamatha Raj" }],
  creator: "Mamatha Raj",
  publisher: "Mamatharaj Photography",
  applicationName: SITE_NAME,
  category: "photography",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: defaultTitle,
    description: ogDescription,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Mamatharaj Photography — Best Photographer in Khammam, Telangana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: ogDescription,
    images: [ogImageUrl],
    creator: "@mamatharaj.studio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
    },
  },
  other: {
    "geo.region": "IN-TS",
    "geo.placename": "Khammam",
    "geo.position": "17.2419046;80.1315073",
    ICBM: "17.2419046, 80.1315073",
  },
};

const jsonLd = [
  buildWebSiteSchema(),
  buildLocalBusinessSchema(),
  buildPersonSchema(),
  buildFaqSchema(),
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.png" sizes="any" />
        <link rel="preconnect" href="https://mamatharajphotography.in" />
        <meta name="theme-color" content="#1A1714" />
        <meta name="msapplication-TileColor" content="#1A1714" />
      </head>
      <body className="min-h-full flex flex-col">
        {jsonLd.map((schema) => (
          <script
            key={JSON.stringify(schema)}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <Loader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
