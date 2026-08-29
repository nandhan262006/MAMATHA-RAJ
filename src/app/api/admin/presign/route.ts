import { NextRequest } from "next/server";
import { presignUpload } from "@/lib/r2";
import { isAuthenticated } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  let contentType = "";
  try {
    const body = await req.json();
    contentType = String(body?.contentType ?? "");
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const result = await presignUpload(contentType);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: 400 });
  }

  return Response.json({
    key: result.key,
    uploadUrl: result.uploadUrl,
    contentType: result.contentType,
  });
}
