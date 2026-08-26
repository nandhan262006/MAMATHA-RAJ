import { getOgImage, OG_IMAGE_DEFAULT } from "@/lib/og-image";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

const siteUrl = SITE_URL;

export async function GET() {
  const { url, isCustom } = await getOgImage();

  const target = isCustom
    ? url
    : new URL(OG_IMAGE_DEFAULT, siteUrl).toString();

  return NextResponse.redirect(target, 302);
}
