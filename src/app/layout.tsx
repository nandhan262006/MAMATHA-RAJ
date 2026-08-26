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

const defaultTitle = "Mamatharaj Photography — Best Photographer in Khammam";
const defaultDescription =
  "Mamatharaj Photography is Khammam's top-rated wedding, pre-wedding and portrait photographer. Candid storytelling, cinematic films and editorial precision across Telangana.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
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
    "Mamatharaj Photography",
    "Mamatha Raj photographer",
    "Telangana wedding photographer",
  ],
  authors: [{ name: "Mamatha Raj" }],
  creator: "Mamatha Raj",
  applicationName: SITE_NAME,
  category: "photography",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Mamatharaj Photography — Best Photographer in Khammam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
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
  other: {
    "geo.region": "IN-TS",
    "geo.placename": "Khammam",
    "geo.position": "17.2473;80.1514",
    ICBM: "17.2473, 80.1514",
  },
};

const jsonLd = [
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
