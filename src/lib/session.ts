import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "mr_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "mamatharaj";
}

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    `${getPassword()}::mamatharaj-admin-session-v1`
  );
}

function sign(body: string): string {
  return createHmac("sha256", getSecret()).update(body).digest("base64url");
}

export function verifyPassword(input: string): boolean {
  const expected = Buffer.from(getPassword());
  const given = Buffer.from(input);
  if (given.length !== expected.length) return false;
  return timingSafeEqual(given, expected);
}

export async function createSession(): Promise<void> {
  const payload = JSON.stringify({ exp: Date.now() + MAX_AGE_SECONDS * 1000 });
  const body = Buffer.from(payload).toString("base64url");
  const token = `${body}.${sign(body)}`;
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function isAuthenticated(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;

  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expectedSig = sign(body);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString()) as {
      exp?: number;
    };
    return typeof parsed.exp === "number" && Date.now() < parsed.exp;
  } catch {
    return false;
  }
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}
