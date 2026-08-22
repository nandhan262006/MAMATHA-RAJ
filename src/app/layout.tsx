import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mamatharaj.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mamatha Raj — Photography & Visual Storytelling",
    template: "%s | Mamatha Raj",
  },
  description:
    "Wedding, pre-wedding and portrait photography by Mamatha Raj. Capturing light, emotion, and every fleeting moment across India — cinematic films, candid storytelling and editorial precision.",
  keywords: [
    "wedding photographer",
    "wedding photography",
    "pre-wedding shoot",
    "portrait photography",
    "cinematic wedding film",
    "Khammam photographer",
    "India wedding photographer",
    "Mamatha Raj",
  ],
  authors: [{ name: "Mamatha Raj" }],
  creator: "Mamatha Raj",
  applicationName: "Mamatha Raj",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Mamatha Raj",
    title: "Mamatha Raj — Photography & Visual Storytelling",
    description:
      "Wedding, pre-wedding and portrait photography. Capturing light, emotion, and every fleeting moment across India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mamatha Raj — Photography & Visual Storytelling",
    description:
      "Wedding, pre-wedding and portrait photography. Capturing light, emotion, and every fleeting moment across India.",
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Loader />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
